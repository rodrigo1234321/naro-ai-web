const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

async function testPlaywright() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const rssLink = 'https://news.google.com/rss/articles/CBMilwFBVV95cUxOejkxMHJ6eDUwTlVkbURBR0hqUUNUcllGUzdQS0x5al9YWUdFUU9hSFJJeU85bVJUbU9vbnRsOWl4cGlFcXhhbjJNa01lSFVyRWc2bmIzdHFMTkxIbkdNbXBoZDRMSjRyLUxpX2pMdXljZnJmaVFYWkdOREZpRXItQnpKSzB5UXpIUnZITkV3ZmM1TlhQcHkw?oc=5';
  
  console.log('Navigating to', rssLink);
  await page.goto(rssLink, { waitUntil: 'domcontentloaded', timeout: 30000 });
  
  // Wait a bit for the redirect to happen
  await page.waitForTimeout(3000);
  
  const realUrl = page.url();
  console.log('Real URL after redirect:', realUrl);
  
  const html = await page.content();
  
  // Use Readability directly in the browser context if possible, or just jsdom locally
  const ogImage = await page.evaluate(() => {
    const meta = document.querySelector('meta[property="og:image"]');
    return meta ? meta.content : null;
  });
  console.log('OG Image:', ogImage);
  
  const textContent = await page.evaluate(() => {
    const paragraphs = Array.from(document.querySelectorAll('p'));
    return paragraphs.map(p => p.innerText.trim()).filter(p => p.length > 50).join('\n\n').substring(0, 500);
  });
  console.log('Text content snippet:\n', textContent);
  
  await browser.close();
}

testPlaywright().catch(console.error);
