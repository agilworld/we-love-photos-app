export enum EOrderByProps {
  relevant = "Relevance",
  latest = "Latest",
  oldest = "Oldest"
}

export enum EContentFilterProps {
  low = "Low",
  high = "High",
}

export enum EColorProps {
  black_and_white = "Black & White",
  black = "Black",
  white = "White",
  yellow = "Yellow",
  red = "Red",
  blue = "Blue",
  magenta = "Magenta",
  green = "Green",
  teal = "Teal",
  orange = "Orange"
}

export enum EOrientationProps {
  landscape = "Landscape",
  portrait = "Portrait",
  squarish = "Squarish"
}


export type OrderByObject = Record<keyof typeof EOrderByProps, string> 
// const d = Object.entries(OrderByProps).map((e,v)=> console.log(e))

export type SearchPhotosBaseParams = {
  query:string
  page:number 
  per_page:number
  order_by: keyof typeof EOrderByProps
  content_filter: keyof typeof EContentFilterProps
  color?: keyof typeof EColorProps
  orientation: keyof typeof EOrientationProps
} 

export type SearchPhotosParams = Partial<SearchPhotosBaseParams>

export const photosKeys = {
  all: ['photos'] as const,
  search: (
    query?:string, 
    page?:number, 
    per_page?:number, 
    order_by?:keyof typeof EOrderByProps,
    content_filter?: keyof typeof EContentFilterProps,
    color?: keyof typeof EColorProps,
    orientation?: keyof typeof EOrientationProps
  ) => [...photosKeys.all, query, page, per_page, order_by, content_filter, color, orientation] as const,
}