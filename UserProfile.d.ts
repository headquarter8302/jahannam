export {}

declare global {
    namespace Jahannam {
        interface UserProfile {
            getUserData(opts: Jahannam.UserProfile.GetUserData.Parameters): Jahannam.UserProfile.GetUserData.ReturnType
            getDefaultAvatars(opts: Jahannam.UserProfile.GetDefaultAvatars.Parameters): Jahannam.UserProfile.GetDefaultAvatars.ReturnType
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
                        edits: string
                        fbPage: string
                        hideEditsWikis: any | null
                        id: number
                        isBlocked: boolean
                        isMessageWallBlocked: boolean
                        isUserPageOwner: boolean
                        localEdits: number
                        messageWallNewMessageUrl: string
                        messageWallUrl: string
                        name: string
                        posts: number
                        registration: string
                        showZeroStates: number
                        tags: string[]
                        twitter: string
                        userBlogUrl: string
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
    }
}
