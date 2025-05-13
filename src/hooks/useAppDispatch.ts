import { useDispatch } from "react-redux";
import type { AppDispatch } from "../slices/store.ts"; // Path to your store file

export const useAppDispatch: () => AppDispatch = useDispatch;
