import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.leedyer.com");

  const contactLink = await page.$('a[href="/contact"]');
  if (contactLink) {
    await contactLink.click();
  
    // Wait for the input fields to be available
    await page.waitForSelector('#name');
    
    // Select input fields
    const name = await page.$('#name');
    
    await page.evaluate(() => {
        function slowType(element, text) {
          return new Promise((resolve) => {
            let index = 0;
            function type() {
              if (index < text.length) {
                const randomTime = (Math.random() * 350) + 50;
                element.value += text[index++];
                element.dispatchEvent(new Event('input', { bubbles: true })); // Ensure any listeners are triggered
                setTimeout(type, randomTime);
              } else {
                resolve();
              }
            }
            type();
          });
        }
  
        // Get the input element and use slowType
        const nameInput = document.querySelector('#name');
        if (nameInput) {
          return slowType(nameInput, 'Bob man wants to go on a date with my wife to the moon');
        } else {
          throw new Error('Input element not found');
        }
      });
  
  } else {
    console.error('Contact link not found');
  }

})();

