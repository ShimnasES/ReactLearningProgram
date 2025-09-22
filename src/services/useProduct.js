import { useEffect } from "react";
import { FETCH_PRODUCTS } from "../constants/actionConstants";
import { fetchRequest } from "../utility/commonSlice";
import { useDispatch } from "react-redux";

export default function useProducts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRequest());
    dispatch({ type: FETCH_PRODUCTS, payload: null });
  }, [dispatch]);
}
