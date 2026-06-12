import {
  dispatchCartAction,
  resetCartForTesting as _resetCartForTesting
} from "./cartStore";
import { Button, Card, formatCurrency } from "@mfe-practice/ui";
import { useCartSnapshot } from "./useCartSnapshot";
import "./styles.css";

void _resetCartForTesting;

export default function CartPage() {
  const snapshot = useCartSnapshot();

  return (
    <section className="cart-page" aria-labelledby="cart-title">
      <div className="cart-heading">
        <div>
          <span className="pill">Cart remote</span>
          <h1 id="cart-title" className="section-title">
            Cart state lives here.
          </h1>
          <p className="section-lede">
            The cart remote owns local state, persists it, and broadcasts
            snapshots after every update.
          </p>
        </div>
        <Card className="cart-total-card" as="section">
          <span>Subtotal</span>
          <strong>{formatCurrency(snapshot.subtotal)}</strong>
          <p>{snapshot.totalItems} total items</p>
        </Card>
      </div>

      {snapshot.lines.length === 0 ? (
        <Card className="empty-state" as="section">
          <div>
            <h2>Your cart is empty</h2>
            <p>Add products from the catalog remote to see events arrive here.</p>
          </div>
        </Card>
      ) : (
        <div className="cart-layout">
          <Card className="cart-lines" as="section">
            {snapshot.lines.map((line) => (
              <article className="cart-line" key={line.product.id}>
                <div className={`cart-line-token token-${line.product.category}`}>
                  {line.product.image}
                </div>
                <div className="cart-line-copy">
                  <span>{line.product.brand}</span>
                  <h3>{line.product.name}</h3>
                  <p>{formatCurrency(line.product.price)} each</p>
                </div>
                <div className="quantity-controls" aria-label={`${line.product.name} quantity`}>
                  <Button
                    aria-label={`Decrease ${line.product.name}`}
                    variant="ghost"
                    onClick={() =>
                      dispatchCartAction({
                        type: "setQuantity",
                        productId: line.product.id,
                        quantity: line.quantity - 1
                      })
                    }
                  >
                    -
                  </Button>
                  <strong>{line.quantity}</strong>
                  <Button
                    aria-label={`Increase ${line.product.name}`}
                    variant="ghost"
                    onClick={() =>
                      dispatchCartAction({
                        type: "setQuantity",
                        productId: line.product.id,
                        quantity: line.quantity + 1
                      })
                    }
                  >
                    +
                  </Button>
                </div>
                <strong className="line-total">
                  {formatCurrency(line.product.price * line.quantity)}
                </strong>
                <Button
                  aria-label={`Remove ${line.product.name}`}
                  variant="danger"
                  onClick={() =>
                    dispatchCartAction({
                      type: "remove",
                      productId: line.product.id
                    })
                  }
                >
                  Remove
                </Button>
              </article>
            ))}
          </Card>

          <Card className="cart-actions" as="aside">
            <h2>Order path</h2>
            <p>
              Checkout is another remote. It reads the persisted snapshot and
              listens for cart update events.
            </p>
            <a className="checkout-link" href="/checkout">
              Continue to checkout
            </a>
            <Button
              variant="ghost"
              onClick={() => dispatchCartAction({ type: "clear" })}
            >
              Clear cart
            </Button>
          </Card>
        </div>
      )}
    </section>
  );
}

