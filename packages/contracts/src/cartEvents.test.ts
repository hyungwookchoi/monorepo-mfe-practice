import {
  CART_ADD_EVENT,
  CART_CLEAR_EVENT,
  CART_REMOVE_EVENT,
  CART_UPDATED_EVENT,
  type CartSnapshot,
  type Product,
  calculateCartSnapshot,
  dispatchCartAdd,
  dispatchCartClear,
  dispatchCartRemove,
  dispatchCartUpdated,
  subscribeCartAdd,
  subscribeCartClear,
  subscribeCartRemove,
  subscribeCartUpdated
} from ".";
import { describe, expect, it } from "vitest";

const product: Product = {
  id: "coffee-1",
  name: "Trail Coffee",
  brand: "North Market",
  category: "coffee",
  price: 12900,
  image: "/products/trail-coffee.svg",
  description: "A bright blend for the morning shelf."
};

describe("cart event helpers", () => {
  it("dispatches and subscribes to cart add payloads", () => {
    const target = new EventTarget();
    const received: unknown[] = [];
    const unsubscribe = subscribeCartAdd((payload) => received.push(payload), target);

    dispatchCartAdd(product, 2, target);
    unsubscribe();
    dispatchCartAdd(product, 1, target);

    expect(received).toEqual([{ product, quantity: 2 }]);
  });

  it("dispatches remove, clear, and updated events with stable names", () => {
    const target = new EventTarget();
    const seen: string[] = [];
    const snapshot: CartSnapshot = calculateCartSnapshot([
      { product, quantity: 3 }
    ]);

    const offRemove = subscribeCartRemove(
      ({ productId }) => seen.push(`${CART_REMOVE_EVENT}:${productId}`),
      target
    );
    const offClear = subscribeCartClear(
      () => seen.push(CART_CLEAR_EVENT),
      target
    );
    const offUpdated = subscribeCartUpdated(
      (payload) => seen.push(`${CART_UPDATED_EVENT}:${payload.totalItems}`),
      target
    );

    dispatchCartRemove(product.id, target);
    dispatchCartClear(target);
    dispatchCartUpdated(snapshot, target);
    offRemove();
    offClear();
    offUpdated();

    expect(CART_ADD_EVENT).toBe("mfe:cart:add");
    expect(seen).toEqual([
      "mfe:cart:remove:coffee-1",
      "mfe:cart:clear",
      "mfe:cart:updated:3"
    ]);
  });
});
