#!/usr/bin/env node
/**
 * Optimizes character images and generates src/data/characterImages.generated.ts.
 *
 * Folder layout (one folder per character id, e.g. "Reid"):
 *   assets/characters/<Id>/avatar.(jpg|jpeg|png|webp)   → profile picture (cropped to 320×320)
 *   assets/characters/<Id>/<anything>.(jpg|jpeg|png|webp) → feed backgrounds (cropped to 1080×1920)
 *
 * Output files are named `<name>@3x.jpg` and required as `<name>.jpg`. As plain @1x assets Metro puts
 * them in drawable-mdpi, and Android upscales them by the screen density (~2.6×) when decoding. That
 * wastes memory, and it pushes large images past the GPU texture limit, so they render zoomed in.
 *
 * Usage:
 *   npm run images                 optimize new/oversized images, then write the manifest
 *   npm run images -- --migrate-legacy   move the old flat layout into per-character folders first
 *   npm run images:check           exit 1 if any image is unoptimized or the manifest is stale
 *
 * Originals that get replaced are moved to .image-originals/ (gitignored).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHARACTERS_DIR = path.join(ROOT, "assets/characters");
const ORIGINALS_DIR = path.join(ROOT, ".image-originals");
const MANIFEST = path.join(ROOT, "src/data/characterImages.generated.ts");

const BG = { width: 1080, height: 1920, quality: 78, maxBytes: 500 * 1024 };
const AVATAR = { size: 320, quality: 82, maxBytes: 80 * 1024 };
const MIN_SHARP_BG_WIDTH = 900;
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const SCALE_SUFFIX = "@3x";

const args = new Set(process.argv.slice(2));
const CHECK = args.has("--check");
const MIGRATE = args.has("--migrate-legacy");

const problems = [];
const warnings = [];

const slugify = (s) =>
	s
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "") || "image";

const naturalSort = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

const rel = (p) => path.relative(ROOT, p);

/** File name without extension or Metro scale suffix: "reid-1@3x.jpg" → "reid-1". */
const baseName = (file) => path.basename(file, path.extname(file)).replace(/@\d+(\.\d+)?x$/, "");
const outputName = (base) => `${base}${SCALE_SUFFIX}.jpg`;

function listImages(dir) {
	return fs
		.readdirSync(dir)
		.filter((f) => !f.startsWith(".") && IMAGE_EXT.has(path.extname(f).toLowerCase()))
		.sort(naturalSort);
}

function moveToOriginals(file) {
	const dest = path.join(ORIGINALS_DIR, path.relative(CHARACTERS_DIR, file));
	fs.mkdirSync(path.dirname(dest), { recursive: true });
	fs.renameSync(file, fs.existsSync(dest) ? dest.replace(/(\.\w+)$/, `-${Date.now()}$1`) : dest);
}

function uniquePath(dir, base, ext, taken) {
	let candidate = `${base}${ext}`;
	for (let n = 2; taken.has(candidate) || fs.existsSync(path.join(dir, candidate)); n++) candidate = `${base}-${n}${ext}`;
	taken.add(candidate);
	return path.join(dir, candidate);
}

/** Moves the pre-folder layout (characters/<Id>.jpeg + characters/pofile_pics/<Id>.jpeg) into folders. */
function migrateLegacy() {
	const legacyAvatars = path.join(CHARACTERS_DIR, "pofile_pics");
	for (const file of listImages(CHARACTERS_DIR)) {
		const id = path.basename(file, path.extname(file));
		const dir = path.join(CHARACTERS_DIR, id);
		fs.mkdirSync(dir, { recursive: true });
		fs.renameSync(path.join(CHARACTERS_DIR, file), path.join(dir, `${slugify(id)}-1${path.extname(file).toLowerCase()}`));
		const avatar = path.join(legacyAvatars, file);
		if (fs.existsSync(avatar)) fs.renameSync(avatar, path.join(dir, `avatar${path.extname(file).toLowerCase()}`));
		console.log(`migrated ${id}`);
	}
	if (fs.existsSync(legacyAvatars) && listImages(legacyAvatars).length === 0) fs.rmSync(legacyAvatars, { recursive: true });
}

/** Largest 9:16 frame (capped at 1080×1920) the source can fill without upscaling. */
function backgroundTarget({ width, height }) {
	const h = Math.min(BG.height, height, Math.floor((width * BG.height) / BG.width));
	return { width: Math.round((h * BG.width) / BG.height), height: h };
}

async function processBackground(id, file, taken) {
	const meta = await sharp(file).metadata();
	const ext = path.extname(file).toLowerCase();
	const bytes = fs.statSync(file).size;
	const sized =
		ext === ".jpg" &&
		meta.width <= BG.width &&
		meta.height <= BG.height &&
		Math.abs(meta.width / meta.height - BG.width / BG.height) < 0.01 &&
		bytes <= BG.maxBytes;
	const optimized = sized && path.basename(file) === outputName(baseName(file));

	if (meta.width < MIN_SHARP_BG_WIDTH) {
		warnings.push(`${rel(file)} is only ${meta.width}px wide — it will look soft full-screen; use a larger source if you can.`);
	}
	if (optimized) return file;
	if (CHECK) {
		problems.push(`${rel(file)} is not optimized (${meta.width}×${meta.height}, ${Math.round(bytes / 1024)} KB).`);
		return file;
	}
	if (sized) return renameToScaled(file, taken);

	const target = backgroundTarget(meta);
	const buffer = await sharp(file)
		.rotate()
		.resize({ ...target, fit: "cover", position: sharp.strategy.attention })
		.jpeg({ quality: BG.quality, mozjpeg: true })
		.toBuffer();
	moveToOriginals(file);
	taken.delete(path.basename(file).toLowerCase());
	const out = uniquePath(path.dirname(file), slugify(baseName(file)), `${SCALE_SUFFIX}.jpg`, taken);
	fs.writeFileSync(out, buffer);
	console.log(`  ${rel(out)}  ${target.width}×${target.height}  ${Math.round(buffer.length / 1024)} KB`);
	return out;
}

/** Already the right size; just give it the @3x name. */
function renameToScaled(file, taken) {
	taken.delete(path.basename(file).toLowerCase());
	const out = uniquePath(path.dirname(file), slugify(baseName(file)), `${SCALE_SUFFIX}.jpg`, taken);
	fs.renameSync(file, out);
	console.log(`  ${rel(file)} → ${path.basename(out)}`);
	return out;
}

async function processAvatar(file) {
	const meta = await sharp(file).metadata();
	const bytes = fs.statSync(file).size;
	const sized = path.extname(file).toLowerCase() === ".jpg" && meta.width === meta.height && meta.width <= AVATAR.size && bytes <= AVATAR.maxBytes;
	const out = path.join(path.dirname(file), outputName("avatar"));
	if (sized && file === out) return file;
	if (CHECK) {
		problems.push(`${rel(file)} is not optimized (${meta.width}×${meta.height}, ${Math.round(bytes / 1024)} KB).`);
		return file;
	}

	if (sized) {
		fs.renameSync(file, out);
		console.log(`  ${rel(file)} → ${path.basename(out)}`);
		return out;
	}

	const size = Math.min(AVATAR.size, meta.width, meta.height);
	const buffer = await sharp(file)
		.rotate()
		.resize({ width: size, height: size, fit: "cover", position: sharp.strategy.attention })
		.jpeg({ quality: AVATAR.quality, mozjpeg: true })
		.toBuffer();
	moveToOriginals(file);
	fs.writeFileSync(out, buffer);
	console.log(`  ${rel(out)}  ${size}×${size}  ${Math.round(buffer.length / 1024)} KB`);
	return out;
}

function renderManifest(entries) {
	const requirePath = (file) => {
		const unscaled = path.join(path.dirname(file), `${baseName(file)}${path.extname(file)}`);
		return JSON.stringify(path.relative(path.dirname(MANIFEST), unscaled).split(path.sep).join("/"));
	};
	const body = entries
		.map(
			({ id, avatar, backgrounds }) =>
				`\t${JSON.stringify(id)}: {\n` +
				`\t\tavatar: require(${requirePath(avatar)}),\n` +
				`\t\tbackgrounds: [\n${backgrounds.map((b) => `\t\t\trequire(${requirePath(b)}),\n`).join("")}\t\t],\n` +
				`\t},\n`
		)
		.join("");
	return (
		"// AUTO-GENERATED by scripts/generate-character-images.mjs — do not edit by hand.\n" +
		"// Add images to assets/characters/<Character>/ and run `npm run images`.\n" +
		'import type { ImageSourcePropType } from "react-native";\n\n' +
		"export interface CharacterImageSet {\n\tavatar: ImageSourcePropType;\n\tbackgrounds: readonly ImageSourcePropType[];\n}\n\n" +
		`export const characterImages = {\n${body}} as const satisfies Record<string, CharacterImageSet>;\n`
	);
}

async function main() {
	if (MIGRATE && !CHECK) migrateLegacy();

	const ids = fs
		.readdirSync(CHARACTERS_DIR, { withFileTypes: true })
		.filter((d) => d.isDirectory() && d.name !== "pofile_pics" && !d.name.startsWith("."))
		.map((d) => d.name)
		.sort(naturalSort);
	if (ids.length === 0) {
		console.error("No character folders found in assets/characters. Run with --migrate-legacy first?");
		process.exit(1);
	}

	const entries = [];
	for (const id of ids) {
		const dir = path.join(CHARACTERS_DIR, id);
		const files = listImages(dir);
		const avatarFile = files.find((f) => baseName(f).toLowerCase() === "avatar");
		const bgFiles = files.filter((f) => f !== avatarFile);
		if (!CHECK) console.log(id);

		if (!avatarFile) problems.push(`${id}: missing avatar.jpg (the profile picture).`);
		const scaled = files.filter((f) => /@\d+(\.\d+)?x\./.test(f) && !f.includes(SCALE_SUFFIX));
		if (scaled.length) problems.push(`${id}: ${scaled.join(", ")} — remove the @Nx suffix; the script adds ${SCALE_SUFFIX} itself.`);
		if (bgFiles.length === 0) problems.push(`${id}: no background images.`);
		else if (bgFiles.length < 2) warnings.push(`${id} has only 1 background — add more so the feed can rotate.`);

		const taken = new Set(bgFiles.map((f) => f.toLowerCase()));
		const backgrounds = [];
		for (const f of bgFiles) backgrounds.push(await processBackground(id, path.join(dir, f), taken));
		const avatar = avatarFile ? await processAvatar(path.join(dir, avatarFile)) : null;
		if (avatar && backgrounds.length) entries.push({ id, avatar, backgrounds: backgrounds.sort(naturalSort) });
	}

	const manifest = renderManifest(entries);
	const current = fs.existsSync(MANIFEST) ? fs.readFileSync(MANIFEST, "utf8") : "";
	if (CHECK) {
		if (manifest !== current) problems.push(`${rel(MANIFEST)} is stale — run \`npm run images\`.`);
	} else if (manifest !== current) {
		fs.writeFileSync(MANIFEST, manifest);
		console.log(`wrote ${rel(MANIFEST)}`);
	}

	for (const w of warnings) console.warn(`warning: ${w}`);
	if (problems.length) {
		for (const p of problems) console.error(`error: ${p}`);
		process.exit(1);
	}
	const total = entries.reduce((n, e) => n + e.backgrounds.length, 0);
	console.log(`${entries.length} characters, ${total} backgrounds${CHECK ? " — all up to date" : ""}.`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
