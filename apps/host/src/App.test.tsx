import { render, screen } from "@testing-library/react";
import { HostShell } from "./HostShell";

describe("Host app", () => {
  it("renders the shell and the default catalog remote", async () => {
    window.history.replaceState(null, "", "/");

    render(
      <HostShell
        remotes={{
          CatalogPage: () => <div>Catalog remote mock</div>,
          CartWidget: () => <div>Cart widget mock</div>,
          CartPage: () => <div>Cart page mock</div>,
          CheckoutPage: () => <div>Checkout remote mock</div>
        }}
      />
    );

    expect(screen.getByRole("button", { name: "Catalog" })).toHaveClass(
      "active"
    );
    expect(await screen.findByText("Catalog remote mock")).toBeInTheDocument();
    expect(await screen.findByText("Cart widget mock")).toBeInTheDocument();
  });
});
