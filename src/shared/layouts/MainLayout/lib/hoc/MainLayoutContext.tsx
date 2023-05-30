import { MutableRefObject, createContext } from "react";

export const MainLayoutContext = createContext<MutableRefObject<HTMLDivElement | null> | null>(null);
