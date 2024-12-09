import { Skeleton } from "./ui/skeleton"

export default function PhotoGridLoader() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="grid gap-3">
                <div>
                    <Skeleton className="w-[300px] h-[300px] rounded-lg" />
                </div>
                
            </div>

            <div className="grid gap-3">
                <div>
                    <Skeleton className="w-[300px] h-[300px] rounded-lg" />
                </div>
            </div>

            <div className="grid gap-3">
                <div>
                    <Skeleton className="w-[300px] h-[300px] rounded-lg" />
                </div>
            </div>
        </div>
    )
}