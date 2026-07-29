import { expect, test } from "@playwright/test";

const htmlRoutes = ["/", "/lab"];

for (const route of htmlRoutes) {
  test(`${route} renders without horizontal overflow`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("body")).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

test("CV route redirects to the published PDF", async ({ page }) => {
  const response = await page.goto("/cv");
  expect(page.url()).toContain("/NguyenBinhMinh-DevOpsEngineer-2026.pdf");
  expect(response?.headers()["content-type"]).toContain("application/pdf");
});

test("work anchor clears the sticky header", async ({ page }) => {
  await page.goto("/#work");
  await expect(page.locator("#work")).toBeInViewport();
  await expect.poll(() => page.locator("#work").evaluate((element) => element.getBoundingClientRect().top)).toBeGreaterThan(70);
});

test("section stages reveal when they enter the viewport", async ({ page }) => {
  await page.goto("/");

  for (const selector of ["#work .project-preview", "#experience .experience-card", "#skills .skill-grid", "#education .education-card"]) {
    const stage = page.locator(selector).first();
    await stage.scrollIntoViewIfNeeded();
    await expect.poll(() => stage.getAttribute("data-motion-revealed")).toBe("true");
  }
});

test("reduced motion keeps staged content visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const previewButton = page.locator("#work .preview-trigger").first();
  await expect(previewButton).toBeVisible();
  await expect.poll(() => previewButton.evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
});

test("home publishes an absolute social thumbnail", async ({ page, request }) => {
  await page.goto("/");
  const image = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(image).toMatch(/^https:\/\//);
  expect(image).toContain("/og-image.png");

  const response = await request.get("/og-image.png");
  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("image/png");
});
