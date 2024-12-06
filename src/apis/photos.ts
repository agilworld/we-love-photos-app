import { 
    QueryFunction, QueryFunctionContext, QueryKey 
} from "@tanstack/react-query"
import { ApiHeader } from "@/lib/apiHeader"
import fakeData from "@/data/search_query.json"


type QueryProps = {
    queryKey: QueryKey
}

export const searchQueryPhotos = async ({ queryKey }: QueryProps) => {
    const [_key, exts ] = queryKey
    const query = exts as any
    // const response = await fetch(
    //     process.env.UNSPLASH_BASE_API + `search/photos?query=${query.q}`, {
    //         headers:ApiHeader()
    //     })

    // if (!response.ok) {
    //     throw new Error('Network response was not ok')
    // }

    return fakeData
   // return response.json()
}