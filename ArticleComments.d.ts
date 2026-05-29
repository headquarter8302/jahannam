export {}

declare global {
    namespace Jahannam {
        interface ArticleComments {
            postNewCommentThread(opts: Jahannam.ArticleComments.PostNewCommentThread.Parameters): Jahannam.ArticleComments.PostNewCommentThread.ReturnType
            postNewCommentReply(opts: Jahannam.ArticleComments.PostNewCommentReply.Parameters): Jahannam.ArticleComments.PostNewCommentReply.ReturnType
            getCommentCount(opts: Jahannam.ArticleComments.GetCommentCount.Parameters): Jahannam.ArticleComments.GetCommentCount.ReturnType
            getThread(opts: Jahannam.ArticleComments.GetThread.Parameters): Jahannam.ArticleComments.GetThread.ReturnType
            getComments(opts: Jahannam.ArticleComments.GetComments.Parameters): Jahannam.ArticleComments.GetComments.ReturnType
            deletePost(opts: Jahannam.ArticleComments.DeletePost.Parameters): Jahannam.ArticleComments.DeletePost.ReturnType
        }

        namespace ArticleComments {
            namespace PostNewCommentThread {
                interface Parameters {
                    title: string
                    namespace: number
                    jsonModel: APIPostObject
                    attachments: APIPostAttachmentsObject
                }

                type ReturnType = APIReturnType<unknown>
            }

            namespace PostNewCommentReply {
                interface Parameters {
                    threadId: number
                    title: string
                    namespace: number
                    jsonModel: APIPostObject
                    attachments: APIPostAttachmentsObject
                }

                type ReturnType = APIReturnType<unknown>
            }

            namespace GetCommentCount {
                interface Parameters {
                    namespace: number
                    title: string
                    hideDeleted: boolean
                }

                type ReturnType = APIReturnType<number>
            }

            namespace GetThread {
                interface Parameters {
                    threadId: number
                    namespace: number
                    title: string
                }

                type ReturnType = APIReturnType<unknown>
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
                    reportedData: { posts: [] }
                    threads: APIThreadObject[]
                    totalCount: number
                }>
            }

            namespace DeletePost {
                interface Parameters {
                    postId: number
                    suppressContent: boolean
                    title: string
                    namespace: number
                }

                type ReturnType = APIReturnType<[]>
            }
        }
    }
}
