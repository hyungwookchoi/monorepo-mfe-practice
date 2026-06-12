import { Card, formatCurrency } from "@mfe-practice/ui";
import { useCartSnapshot } from "./useCartSnapshot";
import "./styles.css";

export default function CartWidget() {
  const snapshot = useCartSnapshot();
  const itemLabel = snapshot.totalItems === 1 ? "1 item" : `${snapshot.totalItems} items`;

  return (
    <Card className="cart-widget" as="section" aria-label="Cart summary">
      <div>
        <span className="cart-widget-label">Cart remote</span>
        <strong>{itemLabel}</strong>
      </div>
      <div className="cart-widget-total">
        <span>{formatCurrency(snapshot.subtotal)}</span>
        <a href="/cart">View cart</a>
      </div>
    </Card>
  );
}

