import { PhotoResult } from "@/_types/photos";
import { create } from 'zustand'
import { EColorProps, EOrientationProps } from "@/_types/photos"

type SettingOptionProps = {
    color?:keyof typeof EColorProps
    orientation?: keyof typeof EOrientationProps
    setColor:(val:string)=>void
    setOrientation:(val:string)=>void
}
export const useSearchOptionStore = create<SettingOptionProps>((set) => ({
    color: undefined,
    orientation: undefined,
    setColor:(value:string)=>set((state) => ({color:value as keyof typeof EColorProps})),
    setOrientation:(value:string)=>set((state) => ({orientation:value as keyof typeof EOrientationProps})),
}))


type PhotoStoreProps = {
    photos:PhotoResult[]
    appendPhotos:(data:PhotoResult[])=>void
}

export const usePhotoStore = create<PhotoStoreProps>((set) => ({
    photos:[],
    appendPhotos:(data)=>set((state)=>({
        photos:[...state.photos,...data]
    }))
}))