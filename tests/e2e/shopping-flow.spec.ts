import { test, expect } from "@playwright/test";

test("shopping flow composes catalog, cart, and checkout remotes", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await expect(page.getByRole("heading", { name: /Local market goods/i })).toBeVisible();
  await page.getByRole("button", { name: /Add Trail Coffee to cart/i }).click();

  await expect(page.getByLabel("Cart summary")).toContainText("1 item");
  await expect(page.getByLabel("Cart summary")).toContainText("₩12,900");

  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("button", { name: "Cart", exact: true })
    .click();
  await expect(page.getByRole("heading", { name: /Cart state lives here/i })).toBeVisible();
  await expect(page.getByText("Trail Coffee")).toBeVisible();

  await page.getByRole("link", { name: "Continue to checkout" }).click();
  await expect(page.getByRole("heading", { name: /Complete a mock order/i })).toBeVisible();
  await page.getByLabel("Name").fill("Kim Minjun");
  await page.getByLabel("Email").fill("minjun@example.com");
  await page.getByRole("button", { name: "Place mock order" }).click();

  await expect(page.getByRole("heading", { name: "Order received" })).toBeVisible();
});
