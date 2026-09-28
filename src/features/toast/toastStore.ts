import { create } from "zustand";

export type ToastKind = "success" | "error" | "info";

export interface Toast {
	id: number;
	message: string;
	kind: ToastKind;
	action?: { label: string; onPress: () => void };
}

interface ToastState {
	toast: Toast | null;
	show: (message: string, options?: { kind?: ToastKind; action?: Toast["action"]; duration?: number }) => void;
	hide: () => void;
}

let nextId = 1;
let timer: ReturnType<typeof setTimeout> | undefined;

export const useToastStore = create<ToastState>((set) => ({
	toast: null,
	show: (message, { kind = "info", action, duration = action ? 4000 : 2200 } = {}) => {
		clearTimeout(timer);
		set({ toast: { id: nextId++, message, kind, action } });
		timer = setTimeout(() => set({ toast: null }), duration);
	},
	hide: () => {
		clearTimeout(timer);
		set({ toast: null });
	},
}));

export const showToast = (...args: Parameters<ToastState["show"]>) => useToastStore.getState().show(...args);
