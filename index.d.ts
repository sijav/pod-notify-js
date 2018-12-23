declare module 'pod-notify.js' {

	const defaultNotify: Notify;
	export default defaultNotify;

	class Notify {
		Permission: NotifyPermission;

		create(title: string, params?: NotifyNotificationParams): Promise<NotifyNotification>

		close(tag: string): void;

		clear(): void;

		config(params: NotifyParams): void;
	}

	export interface NotifyNotificationParams {
		body?: string;
		icon?: string;
		link?: string;
		timeout?: number;
		tag?: string;
		requireInteraction?: boolean;
		vibrate?: boolean;
		silent?: boolean;
		onClick?: Function;
		onError?: Function;
	}

	export interface NotifyParams {
		serviceWorker?: string;
		fallback?: Function;
	}

	export interface NotifyPermission {
		DEFAULT: string;
		GRANTED: string;
		DENIED: string;

		request(onGranted?: Function, onDenied?: Function): void;

		has(): boolean;

		get(): string;
	}

	export interface NotifyNotification {
		close(): void;
	}
}
