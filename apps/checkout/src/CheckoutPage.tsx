import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  CART_STORAGE_KEY,
  type CartSnapshot,
  createEmptyCartSnapshot,
  dispatchCartClear,
  subscribeCartUpdated
} from "@mfe-practice/contracts";
import { Button, Card, formatCurrency } from "@mfe-practice/ui";
import "./styles.css";

type CheckoutStatus = "editing" | "complete";

function readPersistedCart(): CartSnapshot {
  if (typeof localStorage === "undefined") {
    return createEmptyCartSnapshot();
  }

  const rawCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!rawCart) {
    return createEmptyCartSnapshot();
  }

  try {
    const snapshot = JSON.parse(rawCart) as CartSnapshot;
    return Array.isArray(snapshot.lines) ? snapshot : createEmptyCartSnapshot();
  } catch {
    return createEmptyCartSnapshot();
  }
}

export default function CheckoutPage() {
  const [snapshot, setSnapshot] = useState<CartSnapshot>(() => readPersistedCart());
  const [status, setStatus] = useState<CheckoutStatus>("editing");

  useEffect(() => subscribeCartUpdated(setSnapshot), []);

  const hasItems = snapshot.lines.length > 0;
  const shipping = hasItems ? 3000 : 0;
  const orderTotal = useMemo(
    () => snapshot.subtotal + shipping,
    [shipping, snapshot.subtotal]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("complete");
    dispatchCartClear();
  };

  if (status === "complete") {
    return (
      <Card className="checkout-complete" as="section" aria-live="polite">
        <span className="pill">Checkout remote</span>
        <h1>Order received</h1>
        <p>
          The checkout remote dispatched a clear-cart event. The cart remote
          handles the state update and broadcasts the next snapshot.
        </p>
        <a href="/">Back to catalog</a>
      </Card>
    );
  }

  return (
    <section className="checkout-page" aria-labelledby="checkout-title">
      <div className="checkout-heading">
        <span className="pill">Checkout remote</span>
        <h1 id="checkout-title" className="section-title">
          Complete a mock order.
        </h1>
        <p className="section-lede">
          Checkout reads the persisted cart snapshot and subscribes to cart
          update events. No backend is required for this practice flow.
        </p>
      </div>

      <div className="checkout-layout">
        <Card className="checkout-summary" as="section">
          <h2>Order summary</h2>
          {hasItems ? (
            <div className="summary-lines">
              {snapshot.lines.map((line) => (
                <div className="summary-line" key={line.product.id}>
                  <span>
                    {line.product.name} x {line.quantity}
                  </span>
                  <strong>
                    {formatCurrency(line.product.price * line.quantity)}
                  </strong>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div>
                <h3>No items yet</h3>
                <p>Add something from the catalog before checkout.</p>
              </div>
            </div>
          )}
          <div className="summary-totals">
            <span>Subtotal</span>
            <strong>{formatCurrency(snapshot.subtotal)}</strong>
            <span>Shipping</span>
            <strong>{formatCurrency(shipping)}</strong>
            <span>Total</span>
            <strong>{formatCurrency(orderTotal)}</strong>
          </div>
        </Card>

        <Card className="checkout-form-card" as="section">
          <h2>Payment mock</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input name="name" required placeholder="Kim Minjun" />
            </label>
            <label>
              Email
              <input
                name="email"
                required
                type="email"
                placeholder="minjun@example.com"
              />
            </label>
            <label>
              Delivery note
              <input name="note" placeholder="Leave at the door" />
            </label>
            <Button disabled={!hasItems} type="submit">
              Place mock order
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}

