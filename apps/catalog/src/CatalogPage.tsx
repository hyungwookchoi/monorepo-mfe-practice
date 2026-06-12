import { useMemo, useState } from "react";
import { dispatchCartAdd, type Product } from "@mfe-practice/contracts";
import { Button, Card, formatCurrency } from "@mfe-practice/ui";
import { products } from "./products";
import "./styles.css";

type CategoryFilter = "all" | Product["category"];

const categories: { label: string; value: CategoryFilter }[] = [
  { label: "All", value: "all" },
  { label: "Coffee", value: "coffee" },
  { label: "Bakery", value: "bakery" },
  { label: "Pantry", value: "pantry" }
];

const ProductTile = ({ product }: { product: Product }) => {
  const handleAdd = () => {
    dispatchCartAdd(product, 1);
  };

  return (
    <Card className="product-card">
      <div className={`product-token product-token-${product.category}`}>
        {product.image}
      </div>
      <div className="product-card-body">
        <span className="product-brand">{product.brand}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
      <div className="product-card-footer">
        <strong>{formatCurrency(product.price)}</strong>
        <Button
          aria-label={`Add ${product.name} to cart`}
          onClick={handleAdd}
        >
          Add
        </Button>
      </div>
    </Card>
  );
};

export default function CatalogPage() {
  const [category, setCategory] = useState<CategoryFilter>("all");

  const filteredProducts = useMemo(() => {
    if (category === "all") {
      return products;
    }

    return products.filter((product) => product.category === category);
  }, [category]);

  return (
    <section className="catalog-page" aria-labelledby="catalog-title">
      <div className="catalog-hero">
        <div>
          <span className="pill">Catalog remote</span>
          <h1 id="catalog-title" className="section-title">
            Local market goods, composed at runtime.
          </h1>
          <p className="section-lede">
            This product grid is owned by the catalog MFE. Add buttons publish
            typed cart events without importing the cart implementation.
          </p>
        </div>
        <Card className="catalog-metric" as="section">
          <span>Remote boundary</span>
          <strong>catalog/CatalogPage</strong>
          <p>Filter locally, publish cart events globally.</p>
        </Card>
      </div>

      <div className="catalog-toolbar" aria-label="Product category filters">
        {categories.map((item) => (
          <button
            className={item.value === category ? "active" : ""}
            key={item.value}
            type="button"
            onClick={() => setCategory(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

