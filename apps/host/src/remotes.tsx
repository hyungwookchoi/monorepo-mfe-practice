import { Suspense, lazy, type ReactNode } from "react";
import { Card } from "@mfe-practice/ui";
import { ErrorBoundary } from "./ErrorBoundary";

const CatalogPage = lazy(() => import("catalog/CatalogPage"));
const CartWidget = lazy(() => import("cart/CartWidget"));
const CartPage = lazy(() => import("cart/CartPage"));
const CheckoutPage = lazy(() => import("checkout/CheckoutPage"));

const RemoteFallback = ({ label }: { label: string }) => (
  <Card as="section" className="remote-loading" aria-live="polite">
    Loading {label} remote...
  </Card>
);

export const RemoteBoundary = ({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) => (
  <ErrorBoundary label={label}>
    <Suspense fallback={<RemoteFallback label={label} />}>{children}</Suspense>
  </ErrorBoundary>
);

export const RemoteCatalogPage = () => (
  <RemoteBoundary label="Catalog">
    <CatalogPage />
  </RemoteBoundary>
);

export const RemoteCartWidget = () => (
  <RemoteBoundary label="Cart widget">
    <CartWidget />
  </RemoteBoundary>
);

export const RemoteCartPage = () => (
  <RemoteBoundary label="Cart">
    <CartPage />
  </RemoteBoundary>
);

export const RemoteCheckoutPage = () => (
  <RemoteBoundary label="Checkout">
    <CheckoutPage />
  </RemoteBoundary>
);

