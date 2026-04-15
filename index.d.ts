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
		post(opts: Jahannam.Util.PostOptions): Jahannam.APIReturnType
		createURL(
			baseURL: URL,
			paramPair?: Record<string, string | Record<string, string>>
		): URL
	}

	DWDimensionApi: {
		getWikis(opts: Jahannam.DWDimensionApi.GetWikis.Parameters): Jahannam.DWDimensionApi.GetWikis.ReturnType
		getAllArticles(opts: Jahannam.DWDimensionApi.GetAllArticles.Parameters): Jahannam.DWDimensionApi.GetAllArticles.ReturnType
		getUsers(opts: Jahannam.DWDimensionApi.GetUsers.Parameters): Jahannam.DWDimensionApi.GetUsers.ReturnType
	}

	DiscussionPost: {
		// TODO: inspect return type
		getPost(opts: Jahannam.DiscussionPost.GetPost.Parameters): Jahannam.DiscussionPost.GetPost.ReturnType
		getPostHistory(opts: Jahannam.DiscussionPost.GetPostHistory.Parameters): Jahannam.DiscussionPost.GetPostHistory.ReturnType
	}

	CommunityPage: {
		getAllAdminsData(opts: Jahannam.CommunityPage.GetAllAdminsData.Parameters): Jahannam.CommunityPage.GetAllAdminsData.ReturnType
		getAllMembersData(opts: Jahannam.CommunityPage.GetAllMembersData.Parameters): Jahannam.CommunityPage.GetAllMembersData.ReturnType
		getTopContributorsData(opts: Jahannam.CommunityPage.GetTopContributorsData.Parameters): Jahannam.CommunityPage.GetTopContributorsData.ReturnType
	}

	UserProfile: {
		getUserData(opts: Jahannam.UserProfile.GetUserData.Parameters): Jahannam.UserProfile.GetUserData.ReturnType
		getDefaultAvatars(opts: Jahannam.UserProfile.GetDefaultAvatars.Parameters): Jahannam.UserProfile.GetDefaultAvatars.ReturnType
	}

	ArticleComments: {
		getCommentCount(opts: Jahannam.ArticleComments.GetCommentCount.Parameters): Jahannam.ArticleComments.GetCommentCount.ReturnType
		getThread(opts: Jahannam.ArticleComments.GetThread.Parameters): Jahannam.ArticleComments.GetThread.ReturnType
		getComments(opts: Jahannam.ArticleComments.GetComments.Parameters): Jahannam.ArticleComments.GetComments.ReturnType
	}

	ArticleComments: {
		getCommentCount(opts: Jahannam.ArticleComments.GetCommentCountParameters): Jahannam.ArticleComments.GetCommentCountReturnType
		getThread(opts: Jahannam.ArticleComments.GetThreadParameters): Jahannam.ArticleComments.GetThreadReturnType
		getComments(opts: Jahannam.ArticleComments.GetCommentsParameters): Jahannam.ArticleComments.GetCommentsReturnType
	}
}

export declare namespace Jahannam {
	type APIReturnType<T = any> = Promise<false | T>

	/** what the heck */
	type APIBoolString = '0' | '1'

	type APIMemberObject = {
		avatar: string
		contributions: number
		contributionsText: string
		isAdmin: boolean
		isCurrent: boolean
		latestRevision: string
		profileUrl: string
		timeAgo: string
		userContactPage: string
		userId: string
		userName: string
	}

	type APIThreadCreationDateObject = {
		epochSecond: number
		nano: number | 0
	}

	type APIThreadUserPermissions = {
		canDelete: boolean
		canEdit: boolean
	}

	type APIThreadObject = {
		containerId: string
		creationDate: APIThreadCreationDateObject
		firstPost: {
			attachments: {
				atMentions: []
				contentImages: []
				openGraphs: []
				polls: []
				quizzes: []
			}
			createdBy: {
				avatarUrl: string
				badgePermission: string
				id: string
				name: string
			}
			creationDate: APIThreadCreationDateObject
			id: string
			jsonModel: string
			upvoteCount: number
			userData: {
				hasUpvoted: boolean
				isReported: boolean
				permissions: APIThreadUserPermissions
			}
		}
		followed: boolean
		id: string
		postId: string
		posts: []
	}

	interface Config {
		cityId: number
		endpoints: {
			wikia: URL
			service: URL
		}
		version: Version
	}

	namespace Util {
		interface RequestOptions {
			/** defaults to `cfg.endpoints.wikia` */
			url?: URL
			controller: string
			method: string
			format?: string
			parameters?: Record<string, string>
		}

		interface GetOptions extends RequestOptions {
		}

		interface PostOptions extends RequestOptions {

		}
	}

	namespace DiscussionPost {
		namespace GetPost {
			interface Parameters {
				postId: number
			}

			// TODO: fill this
			interface ReturnType {

			}
		}

		namespace GetPostHistory {
			interface Parameters {
				postId: number
			}

			// TODO: fill this
			interface ReturnType {

			}
		}
	}

	namespace UserProfile {
		namespace GetUserData {
			interface Parameters {
				userId: number
			}

			type ReturnType = APIReturnType<{
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

		namespace GetDefaultAvatars {
			interface Parameters { }

			type ReturnType = APIReturnType<{
				avatars: string[]
				status: boolean
			}>
		}
	}

	namespace CommunityPage {
		namespace GetAllAdminsData {
			interface Parameters {
				uselang: string
			}

			type ReturnType = APIReturnType<{
				allAdminsCount: string
				allAdminsLegend: string
				allAdminsList: APIMemberObject[]
				noAdminContactText: string
				noAdminHref: string
				noAdminText: string
				topAdminsHeaderText: string
			}>
		}

		namespace GetAllMembersData {
			interface Parameters {
				uselang: string
			}

			type ReturnType = APIReturnType<{
				admin: string
				allContributorsLegend: string
				allMembersHeaderText: string
				haveMoreMembers: string
				joinedText: string
				members: APIMemberObject[]
				membersCount: string
				moreMembersLink: string
				moreMembersText: string
				noMembersText: string
			}>
		}

		namespace GetTopContributorsData {
			interface Parameters {
				uselang: string
			}

			type ReturnType = APIReturnType<{
				admin: string
				anonText: string
				contributors: APIMemberObject[]
				currentUser: APIMemberObject
				noContribsText: string
			}>
		}
	}

	namespace DWDimensionApi {
		namespace GetWikis {
			interface Parameters {
				limit?: number
				after_wiki_id?: number
			}

			type ReturnType = APIReturnType<{
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
		}

		namespace GetAllArticles {
			interface Parameters {
				limit?: number
				starting_wiki_id?: number
			}

			type ReturnType = APIReturnType<{
				article_id: string
				created_at: string
				is_redirect: APIBoolString
				namespace_id: string
				title: string
				wiki_id: string
			}[]>
		}

		namespace GetUsers {
			interface Parameters {
				limit?: number
				after_user_id?: number
			}

			type Type = APIReturnType<{
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
	}

	namespace ArticleComments {
		namespace GetCommentCount {
			interface Parameters {
				namespace: number
				title: string
				hideDeleted: boolean
			}

			// TODO
			type ReturnType = APIReturnType
		}

		namespace GetThread {
			interface Parameters {
				threadId: number
				namespace: number
				title: string
			}

			// TODO
			type ReturnType = APIReturnType
		}

		namespace GetComments {
			interface Parameters {
				namespace: number
				title: string
				hideDeleted: boolean
			}

			type ReturnType = APIReturnType<{
				links: []
				readOnlyMode: boolean
				reportedData: {
					posts: []
				}
				threads: APIThreadObject[]
				totalCount: number
			}>
		}
	}

	namespace ArticleComments {
		interface GetCommentCountParameters {
			namespace: number
			title: string
			hideDeleted: boolean
		}

		interface GetThreadParameters {
			threadId: number
			namespace: number
			title: string
		}

		interface GetCommentsParameters {
			namespace: number
			title: string
			hideDeleted: boolean
		}

		type GetCommentsReturnType = APIReturnType<{
			links: []
			readOnlyMode: boolean
			reportedData: {
				posts: []
			}
			threads: APIThreadObject[]
			totalCount: number
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
