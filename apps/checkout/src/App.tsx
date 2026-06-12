import { PageShell } from "@mfe-practice/ui";
import CheckoutPage from "./CheckoutPage";

export const App = () => (
  <PageShell className="standalone-checkout-shell">
    <div className="standalone-note">
      Checkout remote running standalone on port 5176
    </div>
    <CheckoutPage />
  </PageShell>
);

