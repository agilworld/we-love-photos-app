'use client'

import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { EColorProps, EOrientationProps, photosKeys } from "@/_types/photos"
import { useEffect, useState, memo, useMemo } from "react"
import { searchQueryPhotos } from "@/apis"
import { SearchPhotosParams } from "@/_types/photos"
import useDebounce from "@/lib/useDebounce";
import { useScrollEndEvent } from "@/lib/useScrollEvent";
import { chunk } from "lodash"
import PhotoGridLoader from "@/components/PhotoGridLoader"
import { PhotoResult } from "@/_types/photos"
import PhotoGridItem, { PhotoDetailDrawer } from "./PhotoGridItem"
import { useSearchOptionStore } from "@/states"
import { useShallow } from "zustand/shallow"
import { Badge } from "@/components/ui/badge"
import {useTranslations, useFormatter} from 'next-intl';

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
    const t = useTranslations("Home")
    const format = useFormatter();
    const [moreData, setMoreData] = useState<boolean>(false)
    const resultQuery = useDebounce(keyword, 500)
    const pagenumber = useScrollEndEvent()
    const params:SearchPhotosParams = {
        query: resultQuery,
        page: pagenumber,
        per_page:18
    }
    const { query, page, per_page } = params
    const { data, isFetching, refetch, isSuccess, isFetched} = useQuery({
      queryKey: photosKeys.search(query, page, per_page),
      queryFn: searchQueryPhotos,
      enabled: false,
      placeholderData: keepPreviousData,
    })
    
    const {color, orientation} = useSearchOptionStore(
        useShallow((state) => ({ color: state.color, orientation: state.orientation }))
    )

    useEffect(()=>{
        const timer = setTimeout(() => {
            refetch()
        }, 500);

        return () =>{
            clearTimeout(timer)
        }
    },[resultQuery])

    useEffect(()=>{
        async function loadmoredata(){
            setMoreData(true)
            refetch()
        }
        if( !moreData && !isFetching ) {
            loadmoredata()
        }
    },[page])

    useEffect(()=>{
        if( moreData && isFetched ) {
            setMoreData(false)
        }
    },[moreData, isFetched])

    const newFormData = useMemo(()=>{
        return chunk(data?.results, 3)
    },[data, resultQuery, isFetching])

    console.log("pagenumber", pagenumber)

    return <>
        {keyword && <div className="flex items-center my-4 text-gray-500 text-sm">
            <div>Result: <Badge variant={"secondary"}>
                {format.number(data?.total??0)}</Badge></div>
            {color && <div className="ml-2">
                <Badge variant={"default"}>{EColorProps[color]}</Badge></div>}
            {orientation && <div className="ml-2">
                <Badge variant={"default"}>{EOrientationProps[orientation]}</Badge>      
            </div>}
        </div>}
        <PhotoGridMemoized 
            isFetching={isFetching} 
            isFetched={isFetched} 
            isSuccess={isSuccess} 
            rows={newFormData as PhotoResult[][]} />
    </>
    
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
       setDrawerState(null)
    }

    const onOpenDrawer = (item:PhotoResult) => {
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
