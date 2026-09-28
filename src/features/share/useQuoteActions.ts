import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { useCallback, useRef, type RefObject } from "react";
import { Linking, type View } from "react-native";
import { captureRef } from "react-native-view-shot";
import { getCharacter, type Quote } from "@/data";
import { showToast } from "@/features/toast/toastStore";

export function formatQuoteForCopy(quote: Quote) {
	const { fullName } = getCharacter(quote.saidBy);
	return `“${quote.text}”\n— ${quote.author}\n\n${fullName}, Criminal Minds ${quote.episodeCode} “${quote.episodeTitle}”`;
}

/** Save / share / copy for a quote card. `cardRef` must point at the QuoteCard (the captured view). */
export function useQuoteActions(quote: Quote, cardRef: RefObject<View | null>) {
	const busy = useRef(false);

	const capture = useCallback(
		() =>
			captureRef(cardRef, {
				format: "jpg",
				quality: 0.92,
				result: "tmpfile",
				// Android only: becomes the file name in the gallery.
				fileName: `criminal-minds-${quote.id}`,
			}),
		[cardRef, quote.id]
	);

	const exclusive = useCallback(async (task: () => Promise<void>) => {
		if (busy.current) return;
		busy.current = true;
		try {
			await task();
		} finally {
			busy.current = false;
		}
	}, []);

	const save = useCallback(
		() =>
			exclusive(async () => {
				// Write-only access: the "add photos" prompt on iOS, and no READ_MEDIA_* permission on Android 13+.
				const permission = await MediaLibrary.requestPermissionsAsync(true, ["photo"]);
				if (!permission.granted) {
					showToast("Allow photo access to save quote cards.", {
						kind: "error",
						action: { label: "Settings", onPress: () => Linking.openSettings() },
					});
					return;
				}
				try {
					await MediaLibrary.Asset.create(await capture());
					Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
					showToast("Saved to your photos", { kind: "success" });
				} catch (error) {
					console.warn("[save] failed", error);
					showToast("Couldn't save the image. Please try again.", { kind: "error" });
				}
			}),
		[capture, exclusive]
	);

	const share = useCallback(
		() =>
			exclusive(async () => {
				if (!(await Sharing.isAvailableAsync())) {
					showToast("Sharing isn't available on this device.", { kind: "error" });
					return;
				}
				try {
					const uri = await capture();
					Haptics.selectionAsync();
					await Sharing.shareAsync(uri, { mimeType: "image/jpeg", UTI: "public.jpeg", dialogTitle: "Share quote" });
				} catch (error) {
					console.warn("[share] failed", error);
					showToast("Couldn't share the image. Please try again.", { kind: "error" });
				}
			}),
		[capture, exclusive]
	);

	const copy = useCallback(async () => {
		await Clipboard.setStringAsync(formatQuoteForCopy(quote));
		Haptics.selectionAsync();
		showToast("Quote copied", { kind: "success" });
	}, [quote]);

	return { save, share, copy };
}
