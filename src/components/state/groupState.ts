import { atom } from "recoil";

export const groupState = atom({
    key: 'groupstate', 
    default: {id:"", name:"", description:"", userCount: 0}, 
});