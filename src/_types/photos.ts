export type SearchPhotosParamProps = {
  query:string
  page:number 
  per_page:number
  order_by: 'relevant' | 'latest'
  content_filter: 'low' | 'high'
  color?: 'black_and_white' | 'black' | 'white' | 'yellow'
  orientation: ''
} 

// export const photosKeys = {
//     all: ['photos'] as const,
//     search: (state: State, sorting: Sorting) =>
//       [...todoKeys.lists(), state, sorting] as const,
//   }