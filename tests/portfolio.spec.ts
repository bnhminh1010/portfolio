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

test("deep links clear the sticky header", async ({ page }) => {
  for (const id of ["work", "experience", "skills", "education", "contact"]) {
    await page.goto(`/#${id}`);
    const section = page.locator(`#${id}`);
    await expect(section).toBeInViewport();
    await expect.poll(() => section.evaluate((element) => element.getBoundingClientRect().top)).toBeGreaterThan(70);
  }
});

test("unrecorded projects present architecture evidence, not a fake preview", async ({ page }) => {
  await page.goto("/#work");
  const trigger = page.locator("#work .preview-trigger").first();
  await expect(trigger).toContainText(/architecture/i);
  await trigger.click();
  await expect(page.getByRole("dialog")).toContainText(/architecture overview/i);
  await expect(page.getByRole("dialog")).toContainText(/private production environment/i);
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
