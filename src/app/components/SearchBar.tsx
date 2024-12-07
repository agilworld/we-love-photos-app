'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useDebounce from "@/lib/useDebounce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from 'lucide-react';
import { ChangeEvent, useCallback, useEffect, useState, memo } from "react";
import { searchQueryPhotos } from "@/apis";
import { photosKeys, SearchPhotosParams } from "@/_types/photos";
import PhotoGrid from "./PhotoGrid";
import { debounce } from "lodash"

// import { useRecoilState } from "recoil";
// import { searchQueryState } from "@/states";
export default function SearchBar() {
    const [search, setSearch] = useState<string>("")
   
    const handleSearch = useCallback(( arr:ChangeEvent<HTMLInputElement>)=>{
        setSearch(arr.target.value)
    },[setSearch, search])

    console.log("search", search)
    return (
        <div>
            <div className="flex w-full items-center space-x-2">
                <Input onChange={handleSearch} type="text" placeholder="type anything" 
                    className="w-5/6 md:text-xl text-xl shadow-md h-16 px-8 py-4" />
                <Button type="button" variant={"default"} 
                    className="w-1/6 text-3xl shadow-md h-16 px-8"> 
                        <Search size={64} />
                </Button>
            
            </div>
            <PhotoGrid keyword={search} />
        </div>
    )
}