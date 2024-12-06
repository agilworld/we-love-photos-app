import { atom } from "recoil";

export const searchQueryState = atom({
    key: 'searchquery', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});