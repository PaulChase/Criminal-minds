import * as Updates from "expo-updates";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import { showToast } from "@/features/toast/toastStore";
import { colors } from "@/theme/colors";

// Native code already checks on every cold start, so only re-check after the app has sat in the background a while.
const FOREGROUND_CHECK_INTERVAL_MS = 30 * 60 * 1000;
const RESTART_TOAST_DURATION_MS = 10_000;

function restartIntoUpdate() {
	Updates.reloadAsync({
		reloadScreenOptions: { backgroundColor: colors.bg, spinner: { color: colors.primaryLight } },
	}).catch(() => showToast("Couldn't restart. The update will apply next launch.", { kind: "error" }));
}

/**
 * EAS Update (OTA). The native module checks on each cold start and downloads in the background
 * without delaying launch; a downloaded update runs on the next cold start. On top of that, this:
 * - re-checks when the app returns to the foreground, since it can stay in memory for days
 * - offers a "Restart" toast once an update has downloaded.
 * Does nothing in dev builds, where expo-updates is disabled.
 */
export function useOtaUpdates() {
	const { isUpdatePending, downloadedUpdate } = Updates.useUpdates();
	const lastCheckAt = useRef(Date.now());
	const promptedFor = useRef<string | null>(null);

	useEffect(() => {
		if (!Updates.isEnabled) return;
		const subscription = AppState.addEventListener("change", async (state) => {
			if (state !== "active" || Date.now() - lastCheckAt.current < FOREGROUND_CHECK_INTERVAL_MS) return;
			lastCheckAt.current = Date.now();
			try {
				const { isAvailable } = await Updates.checkForUpdateAsync();
				if (isAvailable) await Updates.fetchUpdateAsync();
			} catch {
				// Offline or the update server is unreachable; the next launch will try again.
			}
		});
		return () => subscription.remove();
	}, []);

	useEffect(() => {
		if (!isUpdatePending || !downloadedUpdate) return;
		// Rollback directives have no updateId; key them by creation time instead.
		const key = downloadedUpdate.updateId ?? downloadedUpdate.createdAt.toISOString();
		if (promptedFor.current === key) return;
		promptedFor.current = key;
		showToast("A new version is ready", {
			action: { label: "Restart", onPress: restartIntoUpdate },
			duration: RESTART_TOAST_DURATION_MS,
		});
	}, [isUpdatePending, downloadedUpdate]);
}
