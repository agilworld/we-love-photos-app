'use client'

import { useQuery } from "@tanstack/react-query"
import { photosKeys } from "@/_types/photos"
import { useEffect, useState, memo, useMemo } from "react"
import { searchQueryPhotos } from "@/apis"
import { SearchPhotosParams } from "@/_types/photos"
import useDebounce from "@/lib/useDebounce";
import { chunk } from "lodash"
import PhotoGridLoader from "@/components/PhotoGridLoader"
import { PhotoResult } from "@/_types/photos"
import PhotoGridItem, { PhotoDetailDrawer } from "./PhotoGridItem"


type PhotoGridProps = {
    keyword:string
}

type PhotoGridMemoizedProps =  { 
    isFetching:boolean, 
    isFetched:boolean, 
    isSuccess:boolean, 
    rows:PhotoResult[][]
}

export default function PhotoGrid({keyword}:PhotoGridProps) {
    const resultQuery = useDebounce(keyword, 500)
    const params:SearchPhotosParams = {
        query: resultQuery,
        page: 1,
        per_page:18
    }
    const { query, page, per_page } = params

    const { data, isFetching, refetch, isSuccess, isFetched} = useQuery({
      queryKey: photosKeys.search(query, page, per_page),
      queryFn: searchQueryPhotos,
      enabled: false,
    })

    useEffect(()=>{
        const timer = setTimeout(() => {
            refetch()
        }, 500);

        return () =>{
            clearTimeout(timer)
        }
    },[resultQuery])

    const newFormData = useMemo(()=>{
        return chunk(data?.results, 3)
    },[data, resultQuery, isFetching])

    return <PhotoGridMemoized 
        isFetching={isFetching} 
        isFetched={isFetched} 
        isSuccess={isSuccess} 
        rows={newFormData as PhotoResult[][]} />
    
}


function arePropsEqual(
    oldProps:PhotoGridMemoizedProps,
    newProps:PhotoGridMemoizedProps) {
    return (
        oldProps.rows.length === newProps.rows.length && 
        oldProps.rows.every((items,cdx)=>{
            let newChunkItem = newProps.rows[cdx]
            return items.every((item,idx) => item.id === newChunkItem[idx].id )
        })
    )
}

const PhotoGridMemoized = memo(function PhotoGridResult(
    { isFetching, isFetched, isSuccess, rows } : PhotoGridMemoizedProps
   ) {
    const [drawerState, setDrawerState] = useState<PhotoResult | null>(null)
    const onCloseDrawer = () => {
        console.log("item", false)
       setDrawerState(null)
    }

    const onOpenDrawer = (item:PhotoResult) => {
        console.log("item", item)
        setDrawerState(item)
     }

    return (
        <div className="mt-10">
            {!isFetched ? <PhotoGridLoader /> : rows.length > 0 && isSuccess ? 
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {rows.map((items, chunkIdx) => <div 
                        key={chunkIdx} 
                        className="grid gap-5">
                        {items.map(item=><PhotoGridItem 
                            key={item.id} 
                            onClick={()=>onOpenDrawer(item)} 
                            item={item}/>)}
                    </div>)}</div> : isFetched && rows.length === 0 ? 
            
            <p>No result data</p> : null}
            {drawerState && drawerState?.id && <PhotoDetailDrawer 
                item={drawerState} 
                onCloseDrawer={onCloseDrawer} />} 
        </div>
    )
}, arePropsEqual)
