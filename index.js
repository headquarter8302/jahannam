/// <reference path="./index.d.ts" />
/**
 * @name	Jahannam
 * @author	Headquarter8302
 * @description	Library for interacting with the Nirvana backend, a.k.a `wikia.php`
 * @license	MIT
 * @license	CC-BY-SA-3.0 Caburum for the Nirvana docs (https://caburum.fandom.com/wiki/Nirvana)
 * <nowiki>
 */

; ((window, mw) => {
	/** @type {Version} */
	const version = "v0"

	/** @param {any} msg */
	function debug(msg) {
		console.debug(`[Jahannam] ${msg}`)
	}

	/**
	 * @param {any} msg
	 * @param {any} data
	 * @returns {false}
	*/
	function error(msg, ...data) {
		console.error(`[Jahannam] ${msg}`, ...data)
		return false
	}

	// @ts-expect-error
	(window.dev = window.dev || {}).jahannam = {}
	window.dev.jahannam.cfg = window.dev.jahannam.cfg || {}

	debug(version)

	/**
	 * @class Jahannam
	 * @type {Jahannam}
	 */
	class Jahannam {
		/**
		 * @param {Jahannam.Config} cfgInput
		*/
		constructor(cfgInput) {
			/**
			 * Holds the configuration for the script. Will be overwritten by the class config input
			 * @type {Jahannam.Config}
			 * @namespace
			 */
			this.cfg = {
				cityId: mw.config.get('wgCityId'),
				endpoints: {
					wikia: new URL('https://'
						.concat(mw.config.get('wgWikiID'))
						.concat('.fandom.com/wikia.php')),
					service: new URL(mw.config.get('wgServicesExternalDomain')),
				},
				version: version
			}

			// what's optional chaining?
			if (cfgInput) {
				if (cfgInput.cityId) this.cfg.cityId = cfgInput.cityId
				if (cfgInput.endpoints) {
					if (cfgInput.endpoints.wikia) this.cfg.endpoints.wikia = cfgInput.endpoints.wikia
					if (cfgInput.endpoints.service) this.cfg.endpoints.service = cfgInput.endpoints.service
				}
			}

			/**
			 * @type {Jahannam.Util}
			 * @namespace
			 */
			this.util = {
				/**
				 * GETs a given URL. Note that as of February 2026, Fandom still has not allowed interwiki cross-origin requests, you will get a CORS error
				 * @async
				 * @method get
				 */
				get: ({
					url = this.cfg.endpoints.wikia,
					controller,
					method,
					format = 'json',
					parameters = {}
				}) => {
					if (
						!controller
						|| !method
					) return Promise.resolve(error("Invalid parameter on 'get()'"))

					const fullURL = this.util.createURL(url, {
						controller,
						method,
						format,
						parameters
					})

					const isCors = url.origin !== window.location.origin

					/** @type {RequestInit} */
					const fetchParams = {
						cache: 'no-cache',
						method: 'GET',
						mode: isCors ? 'cors' : 'same-origin'
					}

					return fetch(fullURL, fetchParams)
						.then(response => {
							if (!response.ok) return error("Request error:", response.statusText, response.status)
							return response.json()
						})
						.catch(reason => {
							return error("Request error", reason.message)
						})
						.finally(() => {
							debug(`Done GETing request to: ${controller} ${method}`)
						})
				},

				post: ({
					url = this.cfg.endpoints.wikia,
					controller,
					method,
					format = 'json',
					parameters = {},
					formData = {},
				}) => {
					if (
						!controller
						|| !method
					) return Promise.resolve(error("Invalid parameter on 'post()'"))

					const fullURL = this.util.createURL(url, {
						controller,
						method,
						format,
						parameters
					})

					const body = new URLSearchParams(
						Object.assign({ token: mediaWiki.user.tokens.get('csrfToken') }, formData)
					)

					const isCors = url.origin !== window.location.origin

					/** @type {RequestInit} */
					const fetchParams = {
						cache: 'no-cache',
						method: 'POST',
						credentials: 'same-origin',
						mode: isCors ? 'cors' : 'same-origin',
						body: body
					}

					return fetch(fullURL, fetchParams)
						.then(response => {
							if (!response.ok) return error("Request error:", response.statusText, response.status)
							return response.json()
						})
						.catch(reason => {
							return error("Request error", reason.message)
						})
						.finally(() => {
							debug(`Done POSTing request to: ${controller} ${method}`)
						})
				},

				/**
				 * Creates a URL with the given kv pair of URL parameters
				 * @method createURL
				 */
				createURL(baseURL, paramPair = {}) {
					const url = new URL(baseURL)

					for (const [ k, v ] of Object.entries(paramPair)) {
						if (v && typeof v === "object") {
							for (const [ param, paramV ] of Object.entries(v))
								url.searchParams.append(param, paramV)
							continue
						}
						if (typeof v === "string") url.searchParams.append(k, v)
					}

					return url
				},

				EMPTY_ATTACHMENTS: { "contentImages": [], "openGraphs": [], "atMentions": [] }
			}

			/**
			 * DWDimensionApi
			 * @type {Jahannam.DWDimensionApi}
			 * @namespace
			 */
			this.DWDimensionApi = {
				/**
				 * Returns wiki metadata
				 * @method getWikis
				 */
				getWikis: ({
					limit = 100,
					after_wiki_id
				}) => {
					/** @type {Record<string, string>} */
					const params = {
						'limit': limit.toString(),
					}
					if (after_wiki_id) params[ 'after_wiki_id' ] = after_wiki_id.toString()
					return this.util.get({
						controller: 'DWDimensionApi',
						method: 'getWikis',
						parameters: params
					})
				},

				/**
				 * Returns basic article metadata
				 * @method getAllArticles
				 */
				getAllArticles: ({
					limit = 100,
					starting_wiki_id
				}) => {
					/** @type {Record<string, string>} */
					const params = {
						'limit': limit.toString(),
					}
					if (starting_wiki_id) params[ 'starting_wiki_id' ] = starting_wiki_id.toString()
					return this.util.get({
						controller: 'DWDimensionApi',
						method: 'getAllArticles',
						parameters: params
					})
				},

				/**
				 * Returns user data
				 * @method getUsers
				 */
				getUsers: ({
					limit = 100,
					after_user_id
				}) => {
					/** @type {Record<string, string>} */
					const params = {
						'limit': limit.toString(),
					}
					if (after_user_id) params[ 'after_user_id' ] = after_user_id.toString()
					return this.util.get({
						controller: 'DWDimensionApi',
						method: 'getUsers',
						parameters: params
					})
				},
			}

			/**
			 * UserProfile
			 * @type {Jahannam.UserProfile}
			 * @namespace
			 */
			this.UserProfile = {
				/**
				 * A user's special pages on the wiki, their avatar, their edit and post count, whether they are blocked
				 * @method getUserData
				 */
				getUserData: ({
					userId
				}) => {
					return this.util.get({
						controller: 'UserProfile',
						method: 'getUserData',
						parameters: { 'userId': userId.toString() }
					})
				},

				getDefaultAvatars: () => {
					return this.util.get({
						controller: 'UserProfile',
						method: 'getDefaultAvatars'
					})
				},
			}

			/**
			 * Fandom\CommunityPage\CommunityPage
			 * @type {Jahannam.CommunityPage}
			 * @namespace
			 */
			this.CommunityPage = {
				/**
				 * 	Gets a list of the wiki admins
				 * @method getAllAdminsData
				 */
				getAllAdminsData: ({ uselang }) => {
					return this.util.get({
						controller: 'CommunityPage',
						method: 'getAllAdminsData',
						parameters: { 'uselang': uselang }
					})
				},
				getAllMembersData: ({ uselang }) => {
					return this.util.get({
						controller: 'CommunityPage',
						method: 'getAllMembersData',
						parameters: { 'uselang': uselang }
					})
				},
				getTopContributorsData: ({ uselang }) => {
					return this.util.get({
						controller: 'CommunityPage',
						method: 'getTopContributorsData',
						parameters: { 'uselang': uselang }
					})
				}
			}

			/**
			 * Fandom\FeedsAndPosts\Discussion\DiscussionPost
			 * @type {Jahannam.DiscussionPost}
			 * @namespace
			 */
			this.DiscussionPost = {
				/**
				 * Gets information of a specific post by its ID
				 * @method getPosts
				 */
				getPosts: ({
					postId
				}) => {
					return this.util.get({
						controller: 'DiscussionPost',
						method: 'getPosts',
						parameters: { 'postId': postId.toString() }
					})
				},

				/**
				 * Gets post history
				 * @method getPostHistory
				 */
				getPostHistory: ({
					postId
				}) => {
					return this.util.get({
						controller: 'DiscussionPost',
						method: 'getPostHistory',
						parameters: { 'postId': postId.toString() }
					})
				},
			}

			/**
			 * Fandom\ArticleComments\Api\ArticleComments
			 * @type {Jahannam.ArticleComments}
			 * @namespace
			 */
			this.ArticleComments = {
				postNewCommentThread: ({
					title,
					namespace,
					jsonModel,
					attachments
				}) => {
					return this.util.post({
						controller: 'ArticleCommentsController',
						method: 'postNewCommentThread',
						formData: {
							title: title,
							namespace: namespace.toString(),
							jsonModel: JSON.stringify(jsonModel),
							attachments: JSON.stringify(attachments)
						}
					})
				},

				postNewCommentReply: ({
					threadId,
					title,
					namespace,
					jsonModel,
					attachments = this.util.EMPTY_ATTACHMENTS
				}) => {
					return this.util.post({
						controller: 'ArticleCommentsController',
						method: 'postNewCommentReply',
						formData: {
							'threadId': threadId.toString(),
							'title': title,
							'namespace': namespace.toString(),
							'jsonModel': JSON.stringify(jsonModel),
							attachments: JSON.stringify(attachments)
						}
					})
				},

				getCommentCount: ({
					namespace,
					title,
					hideDeleted
				}) => {
					return this.util.get({
						controller: 'ArticleCommentsController',
						method: 'getCommentCount',
						parameters: {
							'namespace': namespace.toString(),
							'title': title,
							'hideDeleted': hideDeleted.toString()
						}
					})
				},

				getThread: ({
					threadId,
					namespace,
					title
				}) => {
					return this.util.get({
						controller: 'ArticleCommentsController',
						method: 'getThread',
						parameters: {
							'threadId': threadId.toString(),
							'namespace': namespace.toString(),
							'title': title
						}
					})
				},

				getComments: ({
					namespace,
					title,
					hideDeleted
				}) => {
					return this.util.get({
						controller: 'ArticleCommentsController',
						method: 'getComments',
						parameters: {
							'namespace': namespace.toString(),
							'title': title,
							'hideDeleted': hideDeleted.toString()
						}
					})
				},

				deletePost: ({
					postId,
					suppressContent,
					title,
					namespace
				}) => {
					return this.util.post({
						controller: 'ArticleCommentsController',
						method: 'deletePost',
						formData: {
							'postId': postId.toString(),
							'suppressContent': suppressContent.toString(),
							'title': title,
							'namespace': namespace.toString()
						}
					})
				},

				// ! Tentative
				getArticleTitle: ({
					stablePageId
				}) => {
					return this.util.get({
						controller: 'ArticleCommentsController',
						method: 'getArticleTitle',
						parameters: {
							// @ts-expect-error
							'stablePage': stablePageId
						}
					})
				}
			}

			debug("Instanced")
		}
	}

	mw.hook('dev.jahannam').fire(window.dev.jahannam.class = Jahannam)
	return
})(window, mediaWiki)
