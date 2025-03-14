import { type Accessor, createEffect, createSignal, onCleanup } from "solid-js";
import { isServer } from "solid-js/web";

const MOBILE_BREAKPOINT = 768;

export const useIsMobile = () => {
	const [isMobile, setIsMobile] = createSignal<boolean>();

	if (isServer) {
		return isMobile as Accessor<boolean>
	}

	const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
	const onChange = () => {
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
	};

	createEffect(() => {
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
	});

	onCleanup(() => {
		mql.removeEventListener("change", onChange);
	});

	return isMobile as Accessor<boolean>;
};
