import { ValueOf } from "next/dist/shared/lib/constants"

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
    color?: keyof typeof EColorProps,
    orientation?: keyof typeof EOrientationProps,
    order_by?:keyof typeof EOrderByProps,
    content_filter?: keyof typeof EContentFilterProps
  ) => [...photosKeys.all, query, page, per_page, color, orientation, order_by, content_filter] as const,
}

export type PhotoUrlTypes = {
  raw:string
  full:string
  regular:string 
  small:string
  small_s3:string
  thumb:string
}

export type PhotoLinksTypes = {
  self:string
  html:string 
  download:string 
  download_location:string
}

export type PhotoUserProps = {
  id:string
  name:string 
  first_name:string 
  last_name:string
  portfolio_url:string 
  bio:string 
  location:string
  profile_image: {
    small:string
    medium:string
  },
  links:{
    self:string,
    html:string,
    photos: string,
    likes:string,
    portfolio:string
  }
}

export type PhotoResult = {
  id:string
  slug:string
  created_at:string
  updated_at:string
  promoted_at:string 
  width: number
  height: number
  color: string 
  blur_hash: string 
  description: string 
  alt_description: string
  urls:Partial<PhotoUrlTypes>
  links:PhotoLinksTypes
  likes:number
  liked_by_user:boolean
  sponsorship:null | string
  asset_type:string
  topic_submissions: null | object
  user:PhotoUserProps
}

export type SearchPhotosProps = {
  total:number 
  total_pages: number
  results: PhotoResult[]
}