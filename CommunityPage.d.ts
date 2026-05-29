export {}

declare global {
    namespace Jahannam {
        interface CommunityPage {
            getAllAdminsData(opts: Jahannam.CommunityPage.GetAllAdminsData.Parameters): Jahannam.CommunityPage.GetAllAdminsData.ReturnType
            getAllMembersData(opts: Jahannam.CommunityPage.GetAllMembersData.Parameters): Jahannam.CommunityPage.GetAllMembersData.ReturnType
            getTopContributorsData(opts: Jahannam.CommunityPage.GetTopContributorsData.Parameters): Jahannam.CommunityPage.GetTopContributorsData.ReturnType
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
    }
}
