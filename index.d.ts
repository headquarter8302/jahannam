export { }

declare global {
	interface Window {
		dev: {
			jahannam: Jahannam.Runtime
		}
	}

	const mediaWiki: {
		loader: {
			using(modules: string | string[]): Promise<void>
		}
		config: {
			get(key: string): any
		}
	}
}

declare namespace Jahannam {
	type APIReturnType<T = any> = Promise<false | T>

	namespace Util {
		interface GetOptions {
			/** defaults to `cfg.endpoints.wikia` */
			url?: URL
			controller: string
			method: string
			format?: string
			parameters?: Record<string, string>
		}
	}

	namespace DiscussionPost {
		interface GetPostParameters {
			postId: string
		}
	}

	namespace UserProfile {
		interface GetUserDataParameters {
			userId: string
		}
		type GetUserDataReturnType = {
			isReadOnly: boolean
			userData: {
				avatar: `https://static.wikia.nocookie.net/${string}`
				bio: string
				canEditProfile: boolean
				canRemoveAvatar: boolean
				contributionsUrl: string
				discordHandle: string
				discussionUserUrl: `/f/u/${string}`
				/** String representation. Refer to the `localEdits` prop for the integer value */
				edits: string
				/**
				 * TODO: template type this
				 */
				fbPage: string
				hideEditsWikis: any | null
				id: number
				isBlocked: boolean
				isMessageWallBlocked: boolean
				isUserPageOwner: boolean
				localEdits: number
				/** templated? */
				messageWallNewMessageUrl: string
				/** templated? */
				messageWallUrl: string
				name: string
				posts: number
				registration: string
				showZeroStates: number
				tags: string[]
				/**
				 * TODO: template type this
				 */
				twitter: string
				/** templated? */
				userBlogUrl: string
				/** templated? */
				userProfileActivityUrl: string
				username: string
				website: string
			}
		}
	}

	namespace DWDimensionApi {
		interface GetWikisParameters {
			limit: number
			after_wiki_id?: number
		}
	}

	interface Runtime {
		cfg: {
			cityId: string
			subdomain: string
			endpoints: {
				wikia: URL
				service: URL
			}
			/** `null` for anonymous users */
			username: string | null
		}

		util: {
			get(opts: Util.GetOptions): APIReturnType
			createURL(
				baseURL: URL,
				paramPair?: Record<string, string | Record<string, string>>
			): URL
		}

		DiscussionPost: {
			getPost(postId: number): APIReturnType
		}

		UserProfile: {
			getUserData(userId: number): APIReturnType
		}

		DWDimensionApi: {
			getWikis(limit: number, after_wiki_id?: number): APIReturnType
		}
	}
}
