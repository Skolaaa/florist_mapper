from playwright.sync_api import sync_playwright

def verify_florist_detail():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the discovery page
        page.goto("http://localhost:3000/discovery")
        page.wait_for_selector("text=Wildwood Botanics")

        # Click on the first florist card
        page.click("text=Wildwood Botanics")

        # Wait for detail page content
        page.wait_for_selector("h1")

        # Verify florist details
        name = page.inner_text("h1")
        print(f"Florist Name: {name}")

        description = page.inner_text("text=About the Florist")
        print(f"Found About section: {description}")

        # Take screenshot of the detail page
        page.screenshot(path="/home/jules/verification/florist_detail.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    verify_florist_detail()
