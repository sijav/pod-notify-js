import AbstractAgent from './AbstractAgent';
import { NotifyOptions } from '../types';

/**
 * Notification agent for modern desktop browsers:
 * Safari 6+, Firefox 22+, Chrome 22+, Opera 25+
 */
export default class MobileFirefoxAgent extends AbstractAgent {

	/**
	 * Returns a boolean denoting support
	 * @returns {Boolean} boolean denoting whether webkit notifications are supported
	 */
	public isSupported() {
		return this._win.navigator && this._win.navigator.mozNotification !== undefined;
	}

	/**
	 * Creates a new notification
	 * @param title - notification title
	 * @param options - notification options array
	 * @returns {Notification}
	 */
	public create(title: string, options: NotifyOptions) {
		const notification = this._win.navigator && this._win.navigator.mozNotification.createNotification(
			title,
			options.body,
			options.icon
		);

		notification.show();

		return notification;
	}
}