import { QueryFunctionContext } from "@tanstack/react-query";
import { ApiHeader } from "@/lib/apiHeader";
import { photosKeys, SearchPhotosProps } from "@/_types/photos";

export type QueryPhotosProps = QueryFunctionContext<
  ReturnType<(typeof photosKeys)["search"]>
>;

export const searchQueryPhotos: any = async ({
  queryKey,
}: QueryPhotosProps): Promise<SearchPhotosProps> => {
  const [, query, page, per_page, color, orientation] = queryKey;
  let urlApi =
    process.env.NEXT_PUBLIC_UNSPLASH_BASE_API +
    `search/photos?query=${query}&page=${page}&per_page=${per_page}`;
  if (color) {
    urlApi += `&color=${color}`;
  }
  if (orientation) {
    urlApi += `&orientation=${orientation}`;
  }
  const response = await fetch(urlApi, {
    headers: ApiHeader(),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
