import { useContext } from "react";
import { CategoryContext } from "../context/CategoryContext";

export function useCategoryContext () {
  const context = useContext(CategoryContext);

  if(!context) {
    throw new Error("useCategoryContext must be used inside CategoryContextProvider");
  }

  return context;
}