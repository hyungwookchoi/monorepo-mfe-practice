import { useEffect, useMemo, useState, type ComponentType } from "react";
import { PageShell } from "@mfe-practice/ui";

type Route = "/" | "/cart" | "/checkout";

type RemoteComponents = {
  CatalogPage: ComponentType;
  CartWidget: ComponentType;
  CartPage: ComponentType;
  CheckoutPage: ComponentType;
};

const isRoute = (path: string): path is Route =>
  path === "/" || path === "/cart" || path === "/checkout";

const getRoute = (): Route => {
  const path = window.location.pathname;
  return isRoute(path) ? path : "/";
};

export const HostShell = ({ remotes }: { remotes: RemoteComponents }) => {
  const [route, setRoute] = useState<Route>(() => getRoute());
  const { CatalogPage, CartWidget, CartPage, CheckoutPage } = remotes;

  useEffect(() => {
    const handlePopState = () => setRoute(getRoute());
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigate = (nextRoute: Route) => {
    window.history.pushState(null, "", nextRoute);
    setRoute(nextRoute);
  };

  const activeLabel = useMemo(() => {
    if (route === "/cart") return "Cart";
    if (route === "/checkout") return "Checkout";
    return "Catalog";
  }, [route]);

  return (
    <div className="host-app">
      <header className="host-header">
        <PageShell className="host-header-inner">
          <button
            className="brand-link"
            type="button"
            onClick={() => navigate("/")}
            aria-label="Go to catalog"
          >
            Market MFE
          </button>
          <nav aria-label="Primary navigation" className="host-nav">
            <button
              className={route === "/" ? "active" : ""}
              type="button"
              onClick={() => navigate("/")}
            >
              Catalog
            </button>
            <button
              className={route === "/cart" ? "active" : ""}
              type="button"
              onClick={() => navigate("/cart")}
            >
              Cart
            </button>
            <button
              className={route === "/checkout" ? "active" : ""}
              type="button"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>
          </nav>
          <div className="header-cart-slot">
            <CartWidget />
          </div>
        </PageShell>
      </header>

      <PageShell className="host-status">
        <span>Host shell</span>
        <strong>{activeLabel} remote</strong>
        <span>Events connect independent apps</span>
      </PageShell>

      <main className="host-main">
        <PageShell>
          {route === "/" ? <CatalogPage /> : null}
          {route === "/cart" ? <CartPage /> : null}
          {route === "/checkout" ? <CheckoutPage /> : null}
        </PageShell>
      </main>
    </div>
  );
};

