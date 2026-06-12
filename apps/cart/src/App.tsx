import { PageShell } from "@mfe-practice/ui";
import CartPage from "./CartPage";
import CartWidget from "./CartWidget";

export const App = () => (
  <PageShell className="standalone-cart-shell">
    <div className="standalone-note">
      Cart remote running standalone on port 5175
    </div>
    <CartWidget />
    <CartPage />
  </PageShell>
);

