import {
  type CartSnapshot,
  type Product,
  calculateCartSnapshot,
  createEmptyCartSnapshot
} from "@mfe-practice/contracts";
import { cartReducer } from "./cartStore";

const product: Product = {
  id: "coffee-1",
  name: "Trail Coffee",
  brand: "North Market",
  category: "coffee",
  price: 12900,
  image: "TC",
  description: "A bright house blend."
};

const otherProduct: Product = {
  ...product,
  id: "bakery-1",
  name: "Salted Rye Loaf",
  category: "bakery",
  price: 7800,
  image: "RY"
};

describe("cartReducer", () => {
  it("adds new lines and increments existing products", () => {
    const afterAdd = cartReducer(createEmptyCartSnapshot(), {
      type: "add",
      product,
      quantity: 1
    });
    const afterIncrement = cartReducer(afterAdd, {
      type: "add",
      product,
      quantity: 2
    });

    expect(afterIncrement.totalItems).toBe(3);
    expect(afterIncrement.lines).toEqual([{ product, quantity: 3 }]);
    expect(afterIncrement.subtotal).toBe(38700);
  });

  it("removes lines, clears the cart, and updates quantities", () => {
    const seeded: CartSnapshot = calculateCartSnapshot([
      { product, quantity: 2 },
      { product: otherProduct, quantity: 1 }
    ]);
    const afterQuantity = cartReducer(seeded, {
      type: "setQuantity",
      productId: product.id,
      quantity: 4
    });
    const afterRemove = cartReducer(afterQuantity, {
      type: "remove",
      productId: otherProduct.id
    });
    const afterClear = cartReducer(afterRemove, { type: "clear" });

    expect(afterQuantity.totalItems).toBe(5);
    expect(afterRemove.lines).toEqual([{ product, quantity: 4 }]);
    expect(afterClear.lines).toEqual([]);
    expect(afterClear.totalItems).toBe(0);
  });
});

