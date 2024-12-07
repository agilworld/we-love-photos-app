'use client'

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { QueryKey } from "@tanstack/react-query"
import { QueryPhotosProps } from "@/apis"
import { photosKeys } from "@/_types/photos"
import { useEffect, useState } from "react"
import { searchQueryPhotos } from "@/apis"
import { SearchPhotosParams } from "@/_types/photos"
import useDebounce from "@/lib/useDebounce";
import { Skeleton } from "@/components/ui/skeleton"

type PhotoGridProps = {
    keyword:string
}

export default function PhotoGrid({keyword}:PhotoGridProps) {
    const resultQuery = useDebounce(keyword, 1000)
    const params:SearchPhotosParams = {
        query: resultQuery,
        page: 1,
        per_page:10
    }
    const { query, page, per_page } = params

    const { data, isFetching, refetch, isSuccess} = useQuery({
      queryKey: photosKeys.search(query, page, per_page),
      queryFn: searchQueryPhotos,
      enabled: false,
    })

    const isKeywordChange = keyword !== "" && keyword.length > 2

    useEffect(()=>{
        const timer = setTimeout(() => {
            refetch()
        }, 1000);

        return () =>{
            clearTimeout(timer)
        }
    },[isKeywordChange])

   
    console.log("isFetching",isFetching )
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {isFetching ? <div className="grid gap-4">
                <div>
                    <Skeleton className="w-[100px] h-[100px] rounded-lg" />
                </div>

                <div>
                    <Skeleton className="w-[100px] h-[100px] rounded-lg" />
                </div>

                <div>
                    <Skeleton className="w-[100px] h-[100px] rounded-lg" />
                </div>

                <div>
                    <Skeleton className="w-[100px] h-[100px] rounded-lg" />
                </div>
            </div> : <div className="grid gap-4">
                {data?.results.map(item=><div>
                    <img className="h-auto max-w-full rounded-lg" src={item.urls.regular} />
                </div>)}
            </div>}
        </div>
    )
}