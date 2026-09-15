import { test, expect } from "@playwright/test";
const routes = [
  "/",
  "/about",
  "/speakers",
  "/speakers/arundhati-roy",
  "/schedule",
  "/passes",
  "/volunteer",
  "/partners",
  "/venue",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility",
  "/passes/confirmation",
];
test("all routes render without client errors and load their images", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
    const broken = await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter((image): image is HTMLImageElement => image instanceof HTMLImageElement && image.complete && image.naturalWidth === 0)
          .map((image) => image.src),
      );
    expect(broken, route).toEqual([]);
  }
  expect(errors).toEqual([]);
  expect((await page.goto("/not-a-real-page"))?.status()).toBe(404);
});
test("speaker filters, empty state, pagination and profiles", async ({
  page,
}) => {
  await page.goto("/speakers");
  await expect(page.locator(".speaker-card")).toHaveCount(6);
  await page.getByRole("button", { name: "Load more voices" }).click();
  await expect(page.locator(".speaker-card")).toHaveCount(8);

  await page.getByLabel("Search speakers").fill("Amitav");
  await expect(page.locator(".speaker-card")).toHaveCount(1);
  await page.getByLabel("Search speakers").fill("no matching person");
  await expect(page.getByText("No voices found.")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.getByRole("button", { name: "Poets", exact: true }).click();
  await expect(page.locator(".speaker-card")).toHaveCount(1);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await page.getByLabel("Filter by country").selectOption("United Kingdom");
  await expect(page.locator(".speaker-card")).toHaveCount(1);
  await page
    .getByRole("link", { name: "View sample profile", exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText("William Dalrymple");
});
test("schedule tabs support keyboard, session disclosure and PDF download", async ({
  page,
  request,
}) => {
  await page.goto("/schedule");
  const first = page.getByRole("tab", { name: "Day 1 Jan 15" });
  await first.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Day 2 Jan 16" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByText("A Morning of New Voices")).toBeVisible();
  await page.locator("summary").first().click();
  await expect(page.locator(".session-detail").first()).toBeVisible();
  const pdf = await request.get("/api/schedule");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect((await pdf.body()).toString().startsWith("%PDF-1.4")).toBeTruthy();
});
test("pass review calculates totals and cannot fabricate confirmation", async ({
  page,
  request,
}) => {
  await page.goto("/passes");
  await page.getByRole("button", { name: "Select Festival Pass" }).click();
  await page.getByLabel("Full name").fill("Test Reader");
  await page.getByLabel("Email address", {exact:true}).fill("reader@example.com");
  await page.getByLabel("Phone number").fill("9876543210");
  await page.getByLabel("Number of passes").fill("2");
  await page.locator('.registration-panel input[name="consent"]').check();
  await page.getByRole("button", { name: "Review registration" }).click();
  await expect(page.locator(".review-total")).toContainText("2,998");
  await expect(
    page.getByRole("button", { name: "Continue to secure payment" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Edit details" }).click();
  await expect(page.getByLabel("Full name")).toHaveValue("Test Reader");
  const invalid = await request.post("/api/checkout", {
    data: { passId: "festival", quantity: -1 },
  });
  expect(invalid.status()).toBe(400);
  await page.goto("/passes/confirmation?session_id=fake");
  await expect(
    page.getByRole("heading", { name: "Not confirmed yet." }),
  ).toBeVisible();
});
test("contact validates and honestly reports unavailable backend", async ({
  page,
  request,
}) => {
  await page.goto("/contact");
  await page.getByLabel("Full name").fill("Test Reader");
  await page.getByLabel("Email address", {exact:true}).fill("reader@example.com");
  await page.getByLabel("Subject", { exact: true }).fill("Access enquiry");
  await page
    .getByLabel("Message", { exact: true })
    .fill("Could you share access arrangements for the festival?");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator(".festival-form [role=alert]")).toContainText(
    "Submissions are not open yet",
  );
  const invalid = await request.post("/api/submissions", {
    data: { kind: "newsletter", email: "bad", consent: true },
  });
  expect(invalid.status()).toBe(400);
});
test("mobile navigation traps focus, closes with Escape, and navigates", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Schedule" })
    .click();
  await expect(page).toHaveURL("/schedule");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("requested widths remain within viewport and reduced motion leaves content visible", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2400]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator(".hero-word").first()).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
      "width " + width,
    ).toBeTruthy();
  }
  for (const route of [
    "/speakers",
    "/schedule",
    "/passes",
    "/volunteer",
    "/contact",
    "/venue",
  ]) {
    await page.setViewportSize({ width: 320, height: 850 });
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
      route,
    ).toBeTruthy();
  }
});

test("volunteer requires availability and newsletter shows loading and success", async ({ page }) => {
  await page.goto("/volunteer");
  await page.getByLabel("Full name").fill("Test Volunteer");
  await page.getByLabel("Email address", {exact:true}).fill("volunteer@example.com");
  await page.getByLabel("Phone number").fill("+91 9876543210");
  await page.getByLabel("Age", { exact: true }).fill("24");
  await page.getByLabel("City", { exact: true }).fill("Kollam");
  await page.getByLabel("Area of interest").selectOption("Guest hospitality");
  await page.getByLabel("Why would you like to volunteer?").fill("I enjoy helping readers and supporting cultural events.");
  await page.locator('form[aria-label="Volunteer application"] input[name="consent"]').check();
  await page.getByRole("button", { name: "Submit application" }).click();
  await expect(page.locator(".festival-form [role=alert]")).toContainText("Choose at least one day");
  await page.getByLabel("Jan 15", { exact: true }).check();
  await page.getByRole("button", { name: "Submit application" }).click();
  await expect(page.locator(".festival-form [role=alert]")).toContainText("Submissions are not open yet");
  await page.goto("/");
  let release: (() => void) | undefined;
  const responseGate = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/api/submissions", async route => {
    await responseGate;
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ message: "You’re on the list." }) });
  });
  await page.getByLabel("Newsletter email address", { exact: true }).fill("newsletter@example.com");
  await page.locator('input[name="consent"]').check();
  await page.getByRole("button", { name: "Subscribe to festival updates" }).click();
  await expect(page.getByRole("button", { name: "Subscribe to festival updates" })).toBeDisabled();
  release?.();
  await expect(page.locator(".newsletter-form [role=status]")).toContainText("You’re on the list.");
});
