export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "coffee" | "bakery" | "pantry";
  price: number;
  image: string;
  description: string;
};

export type CartLine = {
  product: Product;
  quantity: number;
};

export type CartSnapshot = {
  lines: CartLine[];
  totalItems: number;
  subtotal: number;
  updatedAt: string;
};

export type CartAddPayload = {
  product: Product;
  quantity: number;
};

export type CartRemovePayload = {
  productId: string;
};

export const CART_STORAGE_KEY = "mfe-practice.cart.v1";
export const CART_ADD_EVENT = "mfe:cart:add";
export const CART_REMOVE_EVENT = "mfe:cart:remove";
export const CART_CLEAR_EVENT = "mfe:cart:clear";
export const CART_UPDATED_EVENT = "mfe:cart:updated";

const getTarget = (target?: EventTarget) => {
  if (target) {
    return target;
  }

  if (typeof window === "undefined") {
    throw new Error("A browser EventTarget is required outside the browser.");
  }

  return window;
};

const emit = <T>(eventName: string, detail: T, target?: EventTarget) => {
  getTarget(target).dispatchEvent(new CustomEvent<T>(eventName, { detail }));
};

const listen = <T>(
  eventName: string,
  handler: (payload: T) => void,
  target?: EventTarget
) => {
  const eventTarget = getTarget(target);
  const listener = (event: Event) => {
    handler((event as CustomEvent<T>).detail);
  };

  eventTarget.addEventListener(eventName, listener);

  return () => {
    eventTarget.removeEventListener(eventName, listener);
  };
};

export const createEmptyCartSnapshot = (): CartSnapshot => ({
  lines: [],
  totalItems: 0,
  subtotal: 0,
  updatedAt: new Date(0).toISOString()
});

export const calculateCartSnapshot = (lines: CartLine[]): CartSnapshot => {
  const totalItems = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0
  );

  return {
    lines,
    totalItems,
    subtotal,
    updatedAt: new Date().toISOString()
  };
};

export const dispatchCartAdd = (
  product: Product,
  quantity = 1,
  target?: EventTarget
) => {
  emit<CartAddPayload>(CART_ADD_EVENT, { product, quantity }, target);
};

export const dispatchCartRemove = (productId: string, target?: EventTarget) => {
  emit<CartRemovePayload>(CART_REMOVE_EVENT, { productId }, target);
};

export const dispatchCartClear = (target?: EventTarget) => {
  emit(CART_CLEAR_EVENT, undefined, target);
};

export const dispatchCartUpdated = (
  snapshot: CartSnapshot,
  target?: EventTarget
) => {
  emit<CartSnapshot>(CART_UPDATED_EVENT, snapshot, target);
};

export const subscribeCartAdd = (
  handler: (payload: CartAddPayload) => void,
  target?: EventTarget
) => listen<CartAddPayload>(CART_ADD_EVENT, handler, target);

export const subscribeCartRemove = (
  handler: (payload: CartRemovePayload) => void,
  target?: EventTarget
) => listen<CartRemovePayload>(CART_REMOVE_EVENT, handler, target);

export const subscribeCartClear = (
  handler: () => void,
  target?: EventTarget
) => listen<void>(CART_CLEAR_EVENT, handler, target);

export const subscribeCartUpdated = (
  handler: (snapshot: CartSnapshot) => void,
  target?: EventTarget
) => listen<CartSnapshot>(CART_UPDATED_EVENT, handler, target);

