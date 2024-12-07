import { 
    QueryFunction, QueryFunctionContext, QueryKey 
} from "@tanstack/react-query"
import { ApiHeader } from "@/lib/apiHeader"
import fakeData from "@/data/search_query.json"
import { photosKeys } from "@/_types/photos"


export type QueryPhotosProps = QueryFunctionContext<ReturnType<typeof photosKeys["search"]>>

export const searchQueryPhotos = async ({ queryKey }:QueryPhotosProps) => {
    const [_key, query] = queryKey
    //onsole.log("query",  query)

    const response = await fetch('https://a6538fe10a824d75a98a5889e00d9288.api.mockbin.io/')
    // const response = await fetch(
    //     process.env.UNSPLASH_BASE_API + `search/photos?query=${query}`, {
    //         headers:ApiHeader()
    //     })

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    return fakeData
    // return response.json()
}