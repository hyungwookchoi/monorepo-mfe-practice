import { useSyncExternalStore } from "react";
import { getCartSnapshot, subscribeCartStore } from "./cartStore";

export const useCartSnapshot = () =>
  useSyncExternalStore(subscribeCartStore, getCartSnapshot, getCartSnapshot);

