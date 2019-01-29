import AbstractAgent from './AbstractAgent';
import Util from '../notify/Util';
import { NotifyOptions } from '../types';

/**
 * Notification agent for IE9
 */
export default class MSAgent extends AbstractAgent {

	/**
	 * Returns a boolean denoting support
	 * @returns {Boolean} boolean denoting whether webkit notifications are supported
	 */
	public isSupported() {
		return (
			this._win.external !== undefined &&
			this._win.external.msIsSiteMode !== undefined
		);
	}

	/**
	 * Creates a new notification
	 * @param title - notification title
	 * @param options - notification options array
	 * @returns {Notification}
	 */
	public create(title: string, options: NotifyOptions) {
		/* Clear any previous notifications */
		this._win.external.msSiteModeClearIconOverlay();

		this._win.external.msSiteModeSetIconOverlay(
			Util.isString(options.icon) || Util.isUndefined(options.icon)
				? options.icon
				: (options.icon as any).x16,
			title
		);

		this._win.external.msSiteModeActivate();

		return null;
	}

	/**
	 * Close a given notification
	 * @param notification - notification to close
	 */
	public close() {
		this._win.external.msSiteModeClearIconOverlay();
	}
}