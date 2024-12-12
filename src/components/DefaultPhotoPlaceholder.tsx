
import PhotoGridItem from "@/app/components/PhotoGridItem"
import { Rows } from "@/const/placeholder"

export default function DefaultPhotoPlaceholder() {
    return (
        <div />
    )
}

/**
 * 
 *  <div className="opacity-50 grayscale overflow-x-visible w-full ">
            <div className="animate-pingpong my-10 ">
                <div className="flex bg-gradient-to-r from-white to-transparent">
                        {Rows.map((item, idx) => <PhotoGridItem 
                                key={item.id} 
                                className="mr-2 w-96"
                                item={item}/>)}
            
                            </div>
                
            </div>
        </div>
 */