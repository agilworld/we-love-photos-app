import { 
    QueryFunction, QueryFunctionContext, QueryKey 
} from "@tanstack/react-query"
import { ApiHeader } from "@/lib/apiHeader"
import fakeData from "@/data/result_query_2.json"
import { photosKeys, SearchPhotosProps } from "@/_types/photos"
import fakeData2 from "@/data/search_query.json"

export type QueryPhotosProps = QueryFunctionContext<ReturnType<typeof photosKeys["search"]>>

export const searchQueryPhotos = async ({ queryKey }:QueryPhotosProps):Promise<SearchPhotosProps> => {
    const [_key, query, page, per_page, color, orientation] = queryKey
    let delay = 1000
    let urlApi = process.env.NEXT_PUBLIC_UNSPLASH_BASE_API + `search/photos?query=${query}&page=${page}&per_page=${per_page}`
    if( color ) {
        urlApi +=`&color=${color}`
    }
    if( orientation ){
        urlApi +=`&orientation=${orientation}`
    }
    // const res = new Promise(resolve => setTimeout(resolve, delay))
    //     .then(async() => {
    //         // const response = await fetch('https://a6538fe10a824d75a98a5889e00d9288.api.mockbin.io/')
            
    //     return response.json()
    //   })

    const response = await fetch(urlApi, {
        headers:ApiHeader()
    })

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    
    return response.json()
    // return response.json()
}