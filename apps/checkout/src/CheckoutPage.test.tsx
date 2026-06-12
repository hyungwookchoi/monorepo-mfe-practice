import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CART_STORAGE_KEY,
  type CartSnapshot,
  type Product,
  calculateCartSnapshot
} from "@mfe-practice/contracts";
import CheckoutPage from "./CheckoutPage";

const product: Product = {
  id: "coffee-1",
  name: "Trail Coffee",
  brand: "North Market",
  category: "coffee",
  price: 12900,
  image: "TC",
  description: "A bright house blend."
};

describe("CheckoutPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders a persisted cart summary and completes a mock order", async () => {
    const user = userEvent.setup();
    const snapshot: CartSnapshot = calculateCartSnapshot([
      { product, quantity: 2 }
    ]);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(snapshot));

    render(<CheckoutPage />);

    expect(screen.getByText("Trail Coffee x 2")).toBeInTheDocument();
    expect(screen.getAllByText("₩25,800")).toHaveLength(2);

    await user.type(screen.getByLabelText("Name"), "Kim Minjun");
    await user.type(screen.getByLabelText("Email"), "minjun@example.com");
    await user.click(screen.getByRole("button", { name: "Place mock order" }));

    expect(screen.getByText("Order received")).toBeInTheDocument();
  });
});
