import type { Product } from "@mfe-practice/contracts";

export const products: Product[] = [
  {
    id: "coffee-1",
    name: "Trail Coffee",
    brand: "North Market",
    category: "coffee",
    price: 12900,
    image: "TC",
    description: "A bright house blend with citrus notes and a clean finish."
  },
  {
    id: "bakery-1",
    name: "Salted Rye Loaf",
    brand: "Oven Room",
    category: "bakery",
    price: 7800,
    image: "RY",
    description: "Dense rye, sea salt crust, and a slow fermented crumb."
  },
  {
    id: "pantry-1",
    name: "Garden Olive Oil",
    brand: "Field Press",
    category: "pantry",
    price: 18400,
    image: "OO",
    description: "Peppery extra virgin olive oil for salads and warm bread."
  },
  {
    id: "coffee-2",
    name: "Cold Brew Pouches",
    brand: "North Market",
    category: "coffee",
    price: 9900,
    image: "CB",
    description: "Ready-to-steep pouches for a smooth overnight brew."
  },
  {
    id: "bakery-2",
    name: "Almond Morning Buns",
    brand: "Oven Room",
    category: "bakery",
    price: 11200,
    image: "AB",
    description: "Four laminated buns with almond cream and orange zest."
  },
  {
    id: "pantry-2",
    name: "Tomato Table Sauce",
    brand: "Field Press",
    category: "pantry",
    price: 6400,
    image: "TS",
    description: "A small-batch sauce for pasta, eggs, and quick dinners."
  }
];

