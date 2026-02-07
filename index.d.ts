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
		hook: (hook: string) => {
			fire: (payload: any) => void
		}
	}

	type Version = `v${number}`
}

export declare class Jahannam {
	constructor(cfg?: Partial<Jahannam.Config>)

	readonly cfg: Jahannam.Config

	util: {
		get(opts: Jahannam.Util.GetOptions): Jahannam.APIReturnType
		createURL(
			baseURL: URL,
			paramPair?: Record<string, string | Record<string, string>>
		): URL
	}

	DiscussionPost: {
		getPost(postId: number): Jahannam.APIReturnType
	}

	UserProfile: {
		getUserData(userId: number): Jahannam.UserProfile.GetUserDataReturnType
	}

	DWDimensionApi: {
		getWikis(
			limit?: number,
			after_wiki_id?: number
		): Jahannam.DWDimensionApi.GetWikisReturnType
		getUsers(
			limit?: number,
			after_user_id?: number
		): Jahannam.DWDimensionApi.GetUsersReturnType
	}
}

export declare namespace Jahannam {
	type APIReturnType<T = any> = Promise<false | T>
	/** what the heck */
	type APIBoolString = '0' | '1'

	interface Config {
		cityId: number
		endpoints: {
			wikia: URL
			service: URL
		}
		version: Version
	}

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
		type GetUserDataReturnType = APIReturnType<{
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
		}>
	}

	namespace DWDimensionApi {
		interface GetWikisParameters {
			limit: number
			after_wiki_id?: number
		}

		interface GetUsersParameters {
			limit: number
			after_wiki_id?: number
		}

		type GetWikisReturnType = APIReturnType<{
			cluster: string
			created_at: string
			dbname: string
			deleted: string
			domain: string
			/** TODO */
			fc_community_id: unknown
			founding_user_id: string
			is_kid_wiki: APIBoolString
			is_kid_wiki_by_founder: APIBoolString
			is_kid_wiki_by_staff: APIBoolString
			is_monetized: APIBoolString
			is_test_wiki: APIBoolString
			lang: string
			lang_id: string
			public: APIBoolString
			sitename: string
			title: string
			/** Warning: Might or might not be `http` instead of `https` */
			url: string
			vertical_id: string
			vertical_name: string
			wiki_id: string
			wiki_manager: string
		}[]>

		type GetUsersReturnType = APIReturnType<{
			is_bot: boolean
			is_bot_global: boolean
			user_editcount: string
			user_email_authenticated: string
			user_id: string
			user_marketingallowed: boolean
			user_name: string
			user_real_name: string
			user_registration: string
		}>
	}

	interface Runtime extends Jahannam {
		cfg: {
			cityId: string
			subdomain: string
			endpoints: {
				wikia: URL
				service: URL
			}
		}
		class: typeof Jahannam
		version: Version
	}
}
