import {
  CART_STORAGE_KEY,
  type CartLine,
  type CartSnapshot,
  type Product,
  calculateCartSnapshot,
  createEmptyCartSnapshot,
  dispatchCartUpdated,
  subscribeCartAdd,
  subscribeCartClear,
  subscribeCartRemove
} from "@mfe-practice/contracts";

export type CartAction =
  | { type: "add"; product: Product; quantity: number }
  | { type: "remove"; productId: string }
  | { type: "setQuantity"; productId: string; quantity: number }
  | { type: "clear" };

type CartListener = (snapshot: CartSnapshot) => void;

const listeners = new Set<CartListener>();
let initialized = false;
let cartSnapshot: CartSnapshot = readCartFromStorage();

export function cartReducer(
  snapshot: CartSnapshot,
  action: CartAction
): CartSnapshot {
  if (action.type === "clear") {
    return calculateCartSnapshot([]);
  }

  if (action.type === "remove") {
    return calculateCartSnapshot(
      snapshot.lines.filter((line) => line.product.id !== action.productId)
    );
  }

  if (action.type === "setQuantity") {
    if (action.quantity <= 0) {
      return cartReducer(snapshot, {
        type: "remove",
        productId: action.productId
      });
    }

    return calculateCartSnapshot(
      snapshot.lines.map((line) =>
        line.product.id === action.productId
          ? { ...line, quantity: action.quantity }
          : line
      )
    );
  }

  const existing = snapshot.lines.find(
    (line) => line.product.id === action.product.id
  );
  const nextLines: CartLine[] = existing
    ? snapshot.lines.map((line) =>
        line.product.id === action.product.id
          ? { ...line, quantity: line.quantity + action.quantity }
          : line
      )
    : [...snapshot.lines, { product: action.product, quantity: action.quantity }];

  return calculateCartSnapshot(nextLines);
}

export function getCartSnapshot() {
  return cartSnapshot;
}

export function dispatchCartAction(action: CartAction) {
  cartSnapshot = cartReducer(cartSnapshot, action);
  writeCartToStorage(cartSnapshot);
  notify();
}

export function subscribeCartStore(listener: CartListener) {
  initializeCartStore();
  listeners.add(listener);
  listener(cartSnapshot);

  return () => {
    listeners.delete(listener);
  };
}

export function initializeCartStore() {
  if (initialized) {
    return;
  }

  initialized = true;
  subscribeCartAdd(({ product, quantity }) => {
    dispatchCartAction({ type: "add", product, quantity });
  });
  subscribeCartRemove(({ productId }) => {
    dispatchCartAction({ type: "remove", productId });
  });
  subscribeCartClear(() => {
    dispatchCartAction({ type: "clear" });
  });
  dispatchCartUpdated(cartSnapshot);
}

export function resetCartForTesting(snapshot = createEmptyCartSnapshot()) {
  cartSnapshot = snapshot;
  writeCartToStorage(cartSnapshot);
  notify();
}

function notify() {
  listeners.forEach((listener) => listener(cartSnapshot));
  dispatchCartUpdated(cartSnapshot);
}

function readCartFromStorage(): CartSnapshot {
  if (typeof localStorage === "undefined") {
    return createEmptyCartSnapshot();
  }

  const rawCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!rawCart) {
    return createEmptyCartSnapshot();
  }

  try {
    const parsed = JSON.parse(rawCart) as CartSnapshot;
    if (!Array.isArray(parsed.lines)) {
      return createEmptyCartSnapshot();
    }

    return calculateCartSnapshot(parsed.lines);
  } catch {
    return createEmptyCartSnapshot();
  }
}

function writeCartToStorage(snapshot: CartSnapshot) {
  if (typeof localStorage === "undefined") {
    return;
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(snapshot));
}

initializeCartStore();

