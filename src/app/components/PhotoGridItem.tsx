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

type PhotoGridItemProps = {
    item:PhotoResult
} & ComponentPropsWithRef<"div">

export default function PhotoGridItem({item, ...rest} : PhotoGridItemProps) {
    return (
        <div key={item.id} className="shadow-lg cursor-pointer" {...rest} >
            <img 
                className="h-auto max-w-full rounded-lg shadow-lg hover:scale-110 duration-200 delay-75	ease-in-out" 
                src={item.urls.regular} />  
                     
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

    return (
        <Drawer open={open} onClose={handleClose} onOpenChange={handleClose}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-4xl">
                    <div className="flex">
                        <div className="w-4/6">
                            <img src={item.urls.regular} className="rounded-lg" />
                        </div>
                        <div className="w-2/6">
                            <DrawerHeader className="text-left pl-10">
                                <DrawerTitle>{item.description}</DrawerTitle>
                                <DrawerDescription>
                                    {item.alt_description}                  
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter className="pt-2">
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


