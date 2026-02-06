/**
 * @name	Jahannam
 * @author	Headquarter8302
 * @description	Library for interacting with the Nirvana backend, a.k.a `wikia.php`
 * @license	MIT - CC-BY-SA 3.0 Caburum for the Nirvana docs (https://caburum.fandom.com/wiki/Nirvana)
 * <nowiki>
 */

; (function (window, mw) {
	console.log("[Jahannam] v0");

	/** @param {any} msg */
	function debug(msg) {
		console.debug(`[Jahannam] ${msg}`);
	}

	/**
	 * @param {any} msg
	 * @returns {false}
	 */
	function error(msg) {
		console.error(`[Jahannam] ${msg}`);
		return false;
	}

	// @ts-ignore
	window.dev = window.dev || {};
	// @ts-ignore
	window.dev.jahannam = window.dev.jahannam || {};
	// @ts-ignore
	window.dev.jahannam.cfg = window.dev.jahannam.cfg || {};

	debug("Initializing...");

	Object.assign(window.dev.jahannam, {
		/**
		 * Holds the configuration for the script. Will be overwritten by an existing object
		 * @namespace
		 */
		cfg: {
			cityId: mw.config.get('wgCityId'),
			subdomain: mw.config.get('wgWikiID'),
			endpoints: Object.assign({
				wikia: new URL('https://'
					.concat(window.dev.jahannam.cfg.subdomain)
					.concat('.fandom.com/wikia.php')),
				service: new URL('https://services.fandom.com'),
			}, window.dev.jahannam.cfg.endpoints || {}),
			username:
				typeof window.dev.jahannam.cfg.username !== 'undefined'
					? window.dev.jahannam.cfg.username
					: mw.config.get('wgUserName')
		},
		/** @namespace */
		util: {
			/**
			 * GETs a given URL
			 *
			 * @async
			 * @param {Object} opts
			 * @param {URL} [opts.url=window.dev.jahannam.cfg.endpoints.wikia]
			 * @param {string} opts.controller
			 * @param {string} opts.method
			 * @param {string} [opts.format='json']
			 * @param {Record<string, string>} opts.parameters
			 * @returns {Promise<false | any> | false}
			 */
			get: function (opts) {
				if (
					!opts
					|| !opts.controller
					|| !opts.method
				) return error("[Jahannam] Invalid parameter on 'get()'");

				const url = opts.url || window.dev.jahannam.cfg.endpoints.wikia;
				const controller = opts.controller;
				const method = opts.method;
				const format = opts.format || 'json';
				const parameters = opts.parameters;

				const fullURL = this.createURL(url, {
					controller,
					method,
					format,
					parameters
				});

				return fetch(fullURL)
					.then(function (response) {
						if (!response.ok) {
							return error(`Request error: ${response.status} ${response.statusText}`);
						};
						return response.json();
					})
					.catch(reason => {
						return error('[Jahannam] Request error: ' + reason);
					});
			},
			/**
			 * Creates a URL with the given kv pair of URL parameters
			 *
			 * @param {URL} baseURL
			 * @param {Record<string, string | Record<string, string>>} [paramPair={}]
			 * @returns {URL}
			 */
			createURL(baseURL, paramPair = {}) {
				const url = new URL(baseURL);
				for (const [k, v] of Object.entries(paramPair)) {
					if (v && typeof v === "object") {
						for (const [param, paramV] of Object.entries(v))
							url.searchParams.append(param, paramV);
						continue;
					}
					if (typeof v === "string") url.searchParams.append(k, v);
				}
				return url;
			}
		},
		/**
		 * Fandom\FeedsAndPosts\Discussion\DiscussionPost
		 *
		 * @namespace
		 */
		DiscussionPost: {
			/**
			 * Gets information of a specific post by its ID
			 *
			 * @method getPost
			 * @param {number} postId
			 */
			getPost: function (postId) {
				return window.dev.jahannam.util.get({
					controller: 'DiscussionPost',
					method: 'getPost',
					parameters: { 'postId': postId.toString() }
				});
			},
		},
		/**
		 * UserProfile
		 *
		 * @namespace
		 */
		UserProfile: {
			/**
			 * A user's special pages on the wiki, their avatar, their edit and post count, whether they are blocked
			 *
			 * @method getUserData
			 * @param {number} userId
			 */
			getUserData: function (userId) {
				return window.dev.jahannam.util.get({
					controller: 'UserProfile',
					method: 'getUserData',
					parameters: { 'userId': userId.toString() }
				});
			}
		}
	});

	debug("Initialization done!");
	console.debug(window.dev.jahannam);
	return;
})(window, mediaWiki);
