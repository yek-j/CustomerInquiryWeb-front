import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const nameState = atom({
    key: 'nameState', 
    default: '', 
    effects_UNSTABLE: [persistAtom]
});