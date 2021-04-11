import puppeteer from 'puppeteer';

test('Validating login fields', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const app = 'https://chaddit.netlify.app/login';
    await page.goto(app);

    await page.click('input#loginEmail');
    await page.type('input#loginEmail', 'admin@chaddit.tk')
    const loginEmailValue = await page.$eval('input#loginEmail', input => input.value)
    expect(loginEmailValue).toBe('admin@chaddit.tk')

    await page.click('input#loginPass');
    await page.type('input#loginPass', 'admin')

    const loginPassValue = await page.$eval('input#loginPass', input => input.value)
    expect(loginPassValue).toBe('admin')

    await page.click('button#loginButton')

    await browser.close()
}, 20000)