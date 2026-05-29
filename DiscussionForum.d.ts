export {}

declare global {
    namespace Jahannam {
        namespace DiscussionForum {
            namespace GetForums {
                interface Parameters { }

                type ReturnType = {
                    _links: {
                        first: { href: string }[]
                    }
                    allowThreads: boolean
                    creationDate: APIThreadCreationDateObject
                    creatorId: string
                    description: string
                    displayOrder: number
                    id: string
                    imageUrl: unknown
                    isDeleted: boolean
                    isEditable: boolean
                    isLocked: boolean
                    latestContribution: {
                        siteId: unknown
                        forumId: unknown
                        item: unknown
                        itemId: unknown
                        author: unknown
                        date: unknown
                    }
                    name: "Root Forum"
                    parentId: string
                    postCount: number
                    recentContributors: []
                    requesterId: string
                    siteId: string
                    threadCount: number
                }
            }
        }
    }
}
