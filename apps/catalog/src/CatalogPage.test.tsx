import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { subscribeCartAdd, type CartAddPayload } from "@mfe-practice/contracts";
import CatalogPage from "./CatalogPage";

describe("CatalogPage", () => {
  it("dispatches an add-to-cart event when a product is added", async () => {
    const user = userEvent.setup();
    const payloads: CartAddPayload[] = [];
    const unsubscribe = subscribeCartAdd((payload) => payloads.push(payload));

    render(<CatalogPage />);

    await user.click(screen.getByRole("button", { name: /Add Trail Coffee/i }));
    unsubscribe();

    expect(payloads).toHaveLength(1);
    expect(payloads[0]).toMatchObject({
      quantity: 1,
      product: {
        id: "coffee-1",
        name: "Trail Coffee"
      }
    });
  });

  it("filters products by category", async () => {
    const user = userEvent.setup();

    render(<CatalogPage />);

    await user.click(screen.getByRole("button", { name: "Bakery" }));

    expect(screen.getByText("Salted Rye Loaf")).toBeInTheDocument();
    expect(screen.queryByText("Garden Olive Oil")).not.toBeInTheDocument();
  });
});

