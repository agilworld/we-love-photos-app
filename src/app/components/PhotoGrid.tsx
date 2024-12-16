"use client";

import { useQuery } from "@tanstack/react-query";
import {
  EColorProps,
  EOrientationProps,
  photosKeys,
  SearchPhotosProps,
} from "@/_types/photos";
import { useEffect, useState, memo, useMemo, useRef, useCallback } from "react";
import { searchQueryPhotos } from "@/apis";
import { SearchPhotosParams } from "@/_types/photos";
import useDebounce from "@/lib/useDebounce";
import PhotoGridLoader from "@/components/PhotoGridLoader";
import { PhotoResult } from "@/_types/photos";
import PhotoGridItem, { PhotoDetailDrawer } from "./PhotoGridItem";
import { usePhotoStore, useSearchOptionStore } from "@/states";
import { useShallow } from "zustand/shallow";
import { Badge } from "@/components/ui/badge";
import { useFormatter } from "next-intl";
import { chunk3dAdvanceByHeight, uniqueBy } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import MoveTopButton from "@/components/MoveTop";

type PhotoGridProps = {
  keyword: string;
};

type PhotoGridMemoizedProps = {
  isFetching: boolean;
  isFetched: boolean;
  isSuccess: boolean;
  isMoredata: boolean;
  rows: PhotoResult[][];
};

export default function PhotoGrid({ keyword }: PhotoGridProps) {
  const format = useFormatter();
  const photoStore = useRef(usePhotoStore.getState().photos);
  const { appendPhotos, clearPhotos, refreshPhotos } = usePhotoStore(
    (state) => state,
  );
  const [pagenumber, setPagenumber] = useState<number>(1);
  const [moreData, setMoreData] = useState<boolean>(false);
  const resultQuery = useDebounce(keyword, 500);
  const { color, orientation } = useSearchOptionStore(
    useShallow((state) => ({
      color: state.color,
      orientation: state.orientation,
    })),
  );
  //const pagenumber = useScrollEndEvent()
  const params: SearchPhotosParams = {
    query: resultQuery,
    page: pagenumber,
    per_page: 18,
    color,
    orientation,
  };
  const { query, page, per_page } = params;
  const { data, isFetching, refetch, isSuccess, isFetched } =
    useQuery<SearchPhotosProps>({
      queryKey: photosKeys.search(query, page, per_page, color, orientation),
      queryFn: searchQueryPhotos,
      enabled: false,
      staleTime: 2000,
    });

  useEffect(() => {
    return () => {
      clearPhotos();
    };
  }, []);

  useEffect(() => {
    usePhotoStore.subscribe((state) => (photoStore.current = state.photos));
    if (pagenumber > 1 && data?.results && data.results.length > 0) {
      appendPhotos(data?.results as PhotoResult[]);
    } else if (data?.results) {
      refreshPhotos(data?.results as PhotoResult[]);
    }
  }, [data, isFetched]);

  useEffect(() => {
    if (color || orientation) {
      setPagenumber(1);
    }
    const timer = setTimeout(() => {
      refetch();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [resultQuery, color, orientation]);

  useEffect(() => {
    if (moreData && !isFetching && pagenumber > 1) {
      refetch();
    }
  }, [pagenumber, moreData]);

  useEffect(() => {
    if (moreData && isFetched) {
      setMoreData(false);
    }
  }, [moreData, isFetched]);

  const hasNextPage = pagenumber < (data?.total_pages as number) ? true : false;

  const newFormData = useMemo(() => {
    let newPhotos = photoStore.current;
    if (newPhotos.length === 0) return [];
    newPhotos = uniqueBy(newPhotos, (v: any) => v.id) as PhotoResult[];
    return chunk3dAdvanceByHeight(newPhotos);
  }, [photoStore.current, resultQuery]);

  const handleNextPage = useCallback(() => {
    setMoreData(true);
    setPagenumber((prev) => prev + 1);
  }, [moreData, setMoreData, setPagenumber]);

  console.log("newFormData", newFormData);
  console.log("data", data);

  return (
    <>
      {keyword && (
        <div
          className="flex items-center justify-between 
        my-4 text-gray-500 text-sm"
        >
          <div className="flex items-center">
            <div>
              Found:
              {isFetched && data?.total ? (
                <Badge variant={"secondary"}>
                  {photoStore.current?.length} of{" "}
                  {format.number(data?.total ?? 0)}
                </Badge>
              ) : data?.total === 0 ? null : (
                <Skeleton className="w-12 inline-flex h-[10px] rounded-lg" />
              )}
            </div>
            {color && (
              <div className="ml-2">
                <Badge variant={"default"}>{EColorProps[color]}</Badge>
              </div>
            )}
            {orientation && (
              <div className="ml-2">
                <Badge variant={"default"}>
                  {EOrientationProps[orientation]}
                </Badge>
              </div>
            )}
          </div>
          <div className="">
            {isFetched && data?.total && data?.total > 0 ? (
              <Badge variant={"secondary"}>
                Page : {pagenumber} of {format.number(data?.total_pages ?? 0)}
              </Badge>
            ) : data?.total === 0 ? null : (
              <Skeleton className="w-12 h-[10px] rounded-lg" />
            )}
          </div>
        </div>
      )}

      <PhotoGridMemoized
        isFetching={isFetching}
        isFetched={isFetched}
        isSuccess={isSuccess}
        isMoredata={moreData}
        rows={newFormData as PhotoResult[][]}
      />

      {isFetched && hasNextPage && (
        <div
          className="flex 
            items-center justify-center my-6 mt-12"
        >
          <Button
            size={"lg"}
            variant={"default"}
            onClick={() => handleNextPage()}
          >
            Load more
          </Button>
        </div>
      )}

      {photoStore.current?.length > 6 && <MoveTopButton />}
    </>
  );
}

function arePropsEqual(
  oldProps: PhotoGridMemoizedProps,
  newProps: PhotoGridMemoizedProps,
) {
  return (
    newProps.isFetched &&
    oldProps.isFetched === newProps.isFetched &&
    newProps.isSuccess &&
    oldProps.isSuccess === newProps.isSuccess &&
    oldProps.rows.length === newProps.rows.length &&
    oldProps.rows.every((items, cdx) => {
      const newChunkItem = newProps.rows[cdx];
      return items.every((item, idx) => item.id === newChunkItem[idx]?.id);
    })
  );
}

const PhotoGridMemoized = memo(function PhotoGridResult({
  isFetching,
  isFetched,
  isMoredata,
  rows,
}: PhotoGridMemoizedProps) {
  const [drawerState, setDrawerState] = useState<PhotoResult | null>(null);
  const onCloseDrawer = () => {
    setDrawerState(null);
  };

  const onOpenDrawer = (item: PhotoResult) => {
    setDrawerState(item);
  };

  return (
    <div className="mt-10">
      {!isFetched && !isMoredata ? (
        <PhotoGridLoader />
      ) : rows.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {rows.map((items, chunkIdx) => (
            <div key={chunkIdx} className="flex flex-col gap-5">
              {items.map((item, idx) => (
                <PhotoGridItem
                  key={item.id}
                  onClick={() => onOpenDrawer(item)}
                  isFetching={isFetching}
                  isLast={idx === items.length - 1 && isMoredata}
                  item={item}
                />
              ))}
            </div>
          ))}
        </div>
      ) : isFetched && rows.length === 0 ? (
        <p
          className="text-center text-slate-700 
                my-10 border radius-lg 
                border-gray-200 py-10"
        >
          Not found data
        </p>
      ) : null}
      {drawerState && drawerState?.id && (
        <PhotoDetailDrawer item={drawerState} onCloseDrawer={onCloseDrawer} />
      )}
    </div>
  );
}, arePropsEqual);
