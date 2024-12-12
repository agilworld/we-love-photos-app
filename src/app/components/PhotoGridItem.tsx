'use client'

import { PhotoResult } from "@/_types/photos"
import { useEffect, useState } from "react";
import type { ComponentPropsWithRef } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type PhotoGridItemProps = {
    item:Partial<PhotoResult>
} & ComponentPropsWithRef<"div">

export default function PhotoGridItem({item, ...rest} : PhotoGridItemProps) {
    return (
        <div key={item.id} className="shadow-lg cursor-pointer" {...rest} >
            <img 
                className="h-auto max-w-full rounded-lg shadow-lg hover:scale-105 duration-200 delay-75	ease-in-out" 
                src={item.urls?.regular} />  
                     
        </div>
    )
}


type PhotoDrawerProps = {
    item:PhotoResult 
    onCloseDrawer:()=>void
}
export const PhotoDetailDrawer = ({item, onCloseDrawer}:PhotoDrawerProps) => {
    const [open, setOpen] = useState<boolean>(true)
    const handleClose = () => {
        console.log("handleClose", false)
        onCloseDrawer()
        setOpen(false)
    }

    const downloadPhoto = () => {
        window.open(item.urls.full, "_blank")
    }

    return (
        <Drawer open={open} onClose={handleClose} onOpenChange={handleClose}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-4xl py-6">
                    <div className="flex">
                        <div className="w-4/6">
                            <img src={item.urls.regular} className="rounded-lg" />
                        </div>
                        <div className="w-2/6">
                            <DrawerHeader className="text-left pt-0 pl-10">
                                <DrawerTitle className="leading-tight">
                                    {item.description}</DrawerTitle>
                                <DrawerDescription className="leading-none text-md">
                                    {item.alt_description}                  
                                </DrawerDescription>
                                <div className="flex items-center my-6">
                                    <Avatar className="mr-3">
                                        <AvatarImage src={item.user.profile_image.medium} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="text-xs">
                                        <h4 className="font-regular">
                                            {item.user.name} </h4>
                                        <div>
                                            <a className="text-blue-600 visited:text-purple-600" href={item.user.portfolio_url} target="_blank">View Profile</a>
                                        </div>
                                    </div>
                                </div>
                            </DrawerHeader>
                            <DrawerFooter className="pt-2">
                                <Button onClick={downloadPhoto}>Download</Button>
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </div>
                   
                </div>
            </DrawerContent>
        </Drawer>
    )
}


