'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useDebounce from "@/lib/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { Search } from 'lucide-react';
import { ChangeEvent, ChangeEventHandler, EventHandler, useCallback, useEffect, useState } from "react";
import { searchQueryPhotos } from "@/apis";
// import { useRecoilState } from "recoil";
// import { searchQueryState } from "@/states";
export default function SearchBar() {
    const [query, setQuery] = useState<string>()
    //const [saveQuery, setSaveQuery] = useRecoilState(searchQueryState)

    const resultQuery = useDebounce(query, 1500)

    useQuery({
        queryKey:['search', {q:resultQuery, page:20}],
        queryFn:searchQueryPhotos
    })

    const handleSearch = useCallback(( arr:ChangeEvent<HTMLInputElement>)=>{
        console.log("call function", arr.target.value)
        setQuery(arr.target.value)
    },[query, resultQuery])

  

    console.log("deboubce", resultQuery)
    return (
        <div className="flex w-full items-center space-x-2">
            <Input onChange={handleSearch} type="text" placeholder="type anything" 
                className="w-5/6 md:text-xl text-xl shadow-md h-16 px-8 py-4" />
            <Button type="button" variant={"default"} 
                className="w-1/6 text-3xl shadow-md h-16 px-8"> 
                    <Search size={64} />
            </Button>
        </div>
    )
}