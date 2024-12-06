export const ApiHeader = ():HeadersInit => {
    const headers = new Headers
    headers.set('authorization', process.env.UNSPLASH_CLIENT_KEY as string)
    return headers
}