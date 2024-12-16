import { PhotoResult } from "@/_types/photos";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function chunks2Arr(arr: any[], size: number) {
  if (size < 0) throw new Error("size must be positive integer");

  const res = arr.reduce((acc: any, _: any, i: number) => {
    if (i % size === 0) acc.push(arr.slice(i, i + size));
    return acc;
  }, []);

  return res;
}

export const uniqueBy = (x: any, f: any) =>
  Object.values(x.reduce((a: any, b: any) => ((a[f(b)] = b), a), {}));

export const chunk3dAdvanceByHeight = (arr: PhotoResult[]) => {
  const temp: any = [];
  let totalH = 0;
  const newArr: (typeof arr)[] = [];
  arr.map((item) => {
    let heightScaleRatio = 0;
    if (item.width < item.height) {
      heightScaleRatio = (item.height / item.width) * item.height;
    } else {
      heightScaleRatio = item.height;
    }

    totalH += Math.floor(heightScaleRatio / 10);
    temp.push({ id: item.id, value: totalH });
  });

  const splitterIdx = [0];
  const divideBy13cols = totalH * (1 / 3);
  const divideBy23cols = totalH * (2 / 3);

  temp.find((item: any, index: number) => {
    if (divideBy13cols > item.value && divideBy13cols < temp[index + 1].value) {
      const deviationBottom = Math.ceil(divideBy13cols) - item.value;
      const deviationUp = temp[index + 1].value - Math.ceil(divideBy13cols);
      if (deviationUp >= deviationBottom) splitterIdx.push(index + 1);
      else splitterIdx.push(index + 1);
    }

    if (divideBy23cols > item.value && divideBy23cols < temp[index + 1].value) {
      const deviationBottom = Math.ceil(divideBy23cols) - item.value;
      const deviationUp = temp[index + 1].value - Math.ceil(divideBy23cols);
      if (deviationUp >= deviationBottom) splitterIdx.push(index + 1);
      else splitterIdx.push(index + 1);
    }
  });
  splitterIdx.map((maxIndex, i) => {
    const startIndex = maxIndex > 0 ? maxIndex + 1 : 0;
    const endIndex = splitterIdx[i + 1] ? splitterIdx[i + 1] + 1 : undefined;
    newArr.push(arr.slice(startIndex, endIndex));
  });

  return newArr;
};
