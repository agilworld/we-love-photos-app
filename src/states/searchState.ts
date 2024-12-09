import { PhotoResult } from "@/_types/photos";
import { atom } from "recoil";

export const searchQueryState = atom({
    key: 'searchquery', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});

export const photoDrawerState = atom<PhotoResult | null>({
    key: 'photodrawer',
    default:null // unique ID (with respect to other atoms/selectors)
});