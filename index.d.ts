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
	}
}
