export {}

declare global {
    namespace Jahannam {
        interface DiscussionPost {
            getPosts(opts: Jahannam.DiscussionPost.GetPosts.Parameters): Jahannam.DiscussionPost.GetPosts.ReturnType
            getPostHistory(opts: Jahannam.DiscussionPost.GetPostHistory.Parameters): Jahannam.DiscussionPost.GetPostHistory.ReturnType
        }

        namespace DiscussionPost {
            namespace GetPosts {
                interface Parameters {
                    postId: number
                }

                // return type left intentionally open (TODO in original)
                type ReturnType = APIReturnType<unknown>
            }

            namespace GetPostHistory {
                interface Parameters {
                    postId: number
                }

                // return type left intentionally open (TODO in original)
                type ReturnType = APIReturnType<unknown>
            }
        }
    }
}
