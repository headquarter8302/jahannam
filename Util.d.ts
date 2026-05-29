export {}

declare global {
    namespace Jahannam {
        interface Util {
            public get<T = unknown>(opts: Jahannam.UtilTypes.GetOptions): Jahannam.APIReturnType<T>
            public post<T = unknown>(opts: Jahannam.UtilTypes.PostOptions): Jahannam.APIReturnType<T>
            public createURL(
                baseURL: URL,
                paramPair?: Record<string, string | Record<string, string>>
            ): URL
            public readonly EMPTY_ATTACHMENTS: Jahannam.UtilTypes.EmptyAttachments
        }

        namespace UtilTypes {
            interface RequestOptions {
                url?: URL
                controller: string
                method: string
                format?: string
                parameters?: Record<string, string>
            }

            interface GetOptions extends RequestOptions { }

            interface PostOptions extends RequestOptions {
                formData: Record<string, string>
                csrf?: boolean
            }

            type EmptyAttachments = Readonly<APIPostAttachmentsObject>
        }
    }
}
