export {}

declare global {
    namespace Jahannam {
        interface DWDimensionApi {
            getWikis(opts: Jahannam.DWDimensionApi.GetWikis.Parameters): Jahannam.DWDimensionApi.GetWikis.ReturnType
            getAllArticles(opts: Jahannam.DWDimensionApi.GetAllArticles.Parameters): Jahannam.DWDimensionApi.GetAllArticles.ReturnType
            getUsers(opts: Jahannam.DWDimensionApi.GetUsers.Parameters): Jahannam.DWDimensionApi.GetUsers.ReturnType
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

                type ReturnType = APIReturnType<{
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
    }
}
