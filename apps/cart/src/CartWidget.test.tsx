import { act, render, screen, waitFor } from "@testing-library/react";
import { dispatchCartAdd, type Product } from "@mfe-practice/contracts";
import CartWidget from "./CartWidget";
import { resetCartForTesting } from "./cartStore";

const product: Product = {
  id: "coffee-1",
  name: "Trail Coffee",
  brand: "North Market",
  category: "coffee",
  price: 12900,
  image: "TC",
  description: "A bright house blend."
};

describe("CartWidget", () => {
  beforeEach(() => {
    localStorage.clear();
    resetCartForTesting();
  });

  it("updates when cart add events are received", async () => {
    render(<CartWidget />);

    act(() => {
      dispatchCartAdd(product, 1);
    });

    await waitFor(() => {
      expect(screen.getByText("1 item")).toBeInTheDocument();
    });
    expect(screen.getByText("₩12,900")).toBeInTheDocument();
  });
});
