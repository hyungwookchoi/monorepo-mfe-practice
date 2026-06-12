import { PageShell } from "@mfe-practice/ui";
import CatalogPage from "./CatalogPage";

export const App = () => (
  <PageShell className="standalone-shell">
    <div className="standalone-note">
      Catalog remote running standalone on port 5174
    </div>
    <CatalogPage />
  </PageShell>
);

