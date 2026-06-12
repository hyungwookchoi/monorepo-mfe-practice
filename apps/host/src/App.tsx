import {
  RemoteCartPage,
  RemoteCartWidget,
  RemoteCatalogPage,
  RemoteCheckoutPage
} from "./remotes";
import { HostShell } from "./HostShell";

export const App = () => (
  <HostShell
    remotes={{
      CatalogPage: RemoteCatalogPage,
      CartWidget: RemoteCartWidget,
      CartPage: RemoteCartPage,
      CheckoutPage: RemoteCheckoutPage
    }}
  />
);
