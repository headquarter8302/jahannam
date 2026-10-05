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
			get(key: string): string
		}
		hook: (hook: string) => {
			fire: (payload: any) => void
		}
		user: {
			tokens: {
				get(key: string): string
			}
		}
	}

	type Version = `v${number}`

	class Jahannam {
		constructor(cfg?: Partial<Jahannam.Config>)

		public readonly cfg: Jahannam.Config
		public readonly util: Jahannam.Util

		public readonly DWDimensionApi: Jahannam.DWDimensionApi
		public readonly DiscussionPost: Jahannam.DiscussionPost
		public readonly CommunityPage: Jahannam.CommunityPage
		public readonly UserProfile: Jahannam.UserProfile
		public readonly ArticleComments: Jahannam.ArticleComments
	}

	namespace Jahannam {
		type APIReturnType<T = unknown> = Promise<false | T>

		/** what the fuck */
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

		type APIDocType = "doc" | "paragraph" | "bulletList" | "orderedList" | "code_block"

		type APIPostObject = {
			type: APIDocType
			content: APIPostObject[]
		}

		type APIPostAttachmentsObject<
			ContentImages = unknown,
			OpenGraphs = unknown,
			AtMentions = unknown
		> = {
			contentImages: ContentImages[]
			openGraphs: OpenGraphs[]
			atMentions: AtMentions[]
		}

		type APIPostBlockObject = {}

		interface Config {
			cityId: number
			endpoints: {
				wikia: URL
				service: URL
			}
			version: Version
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
}

import './DWDimensionApi.d.ts'
import './DiscussionPost.d.ts'
import './DiscussionForum.d.ts'
import './CommunityPage.d.ts'
import './UserProfile.d.ts'
import './ArticleComments.d.ts'
import './Util.d.ts'
