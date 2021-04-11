import puppeteer from 'puppeteer';

function process(str) {

    var div = document.createElement('div');
    div.innerHTML = str.trim();

    return format(div, 0).innerHTML;
}

function format(node, level) {

    var indentBefore = new Array(level++ + 1).join('  '),
        indentAfter  = new Array(level - 1).join('  '),
        textNode;

    for (var i = 0; i < node.children.length; i++) {

        textNode = document.createTextNode('\n' + indentBefore);
        node.insertBefore(textNode, node.children[i]);

        format(node.children[i], level);

        if (node.lastElementChild == node.children[i]) {
            textNode = document.createTextNode('\n' + indentAfter);
            node.appendChild(textNode);
        }
    }

    return node;
}

const isElementVisible = async (page, cssSelector) => {
    let visible = true;
    await page.waitForSelector(cssSelector, { visible: true, timeout: 2000 })
        .catch(() => {
            visible = false;
        });
    return visible;
};

const chill = (seconds) =>
    new Promise(resolve => setTimeout(resolve, seconds * 1000));

test('Validating login actions', async () => {
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

    await page.waitForSelector('div#userImage')

    await browser.close()
}, 20000)

test('Validating register actions', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const app = 'https://chaddit.netlify.app/login';
    await page.goto(app);

    await page.click('div#gotoRegister');

    await page.click('input#registerName')
    await page.type('input#registerName', 'testUser')

    const registerNameValue = await page.$eval('input#registerName', input => input.value)
    expect(registerNameValue).toBe('testUser')

    const randInt = () => { return Math.floor(Math.random()*10000+ 10000)}
    const testEmail = `test${randInt()}@chaddit.tk`
    console.log(testEmail)
    await page.click('input#registerEmail')
    await page.type('input#registerEmail', testEmail)
    const registerEmailValue = await page.$eval('input#registerEmail', input => input.value)
    expect(registerEmailValue).toBe(testEmail)

    await page.click('input#registerPass');
    await page.type('input#registerPass', 'test')

    const registerPassValue = await page.$eval('input#registerPass', input => input.value)
    expect(registerPassValue).toBe('test')

    await page.click('input#registerCheckPass');
    await page.type('input#registerCheckPass', 'test')

    const registerCheckPassValue = await page.$eval('input#registerCheckPass', input => input.value)
    expect(registerCheckPassValue).toBe('test')

    expect(registerPassValue === registerCheckPassValue).toBe(true)

    await page.click('button#registerButton')

    await page.waitForSelector('div#userImage')

    await browser.close()
}, 20000)

// test('Validating thread creation', async () => {
//     const browser = await puppeteer.launch()
//
//     const page = await browser.newPage()
//     await page.setViewport( { 'width' : 1500, 'height' : 1000 } )
//     const app = 'https://chaddit.netlify.app/login';
//     await page.goto(app);
//
//
//
//     await page.click('input#loginEmail');
//     await page.type('input#loginEmail', 'test_admin@chaddit.tk')
//     const loginEmailValue = await page.$eval('input#loginEmail', input => input.value)
//     expect(loginEmailValue).toBe('test_admin@chaddit.tk')
//
//     await page.click('input#loginPass');
//     await page.type('input#loginPass', '#test@chaddit#')
//
//     const loginPassValue = await page.$eval('input#loginPass', input => input.value)
//     expect(loginPassValue).toBe('#test@chaddit#')
//
//     await page.click('button#loginButton')
//
//     await page.waitForSelector('div#userImage')
//
//     await page.waitForSelector('div#openCreateThreadWidgetButton')
//
//     await page.click('div#openCreateThreadWidgetButton')
//
//     const randInt = () => { return Math.floor(Math.random()*10000+ 1000)}
//     const threadTestId = randInt()
//
//     await page.click('input#topicName')
//     await page.type('input#topicName', `test_topic_name_${threadTestId}`)
//
//     const topicNameValue = await page.$eval('input#topicName', input => input.value)
//     expect(topicNameValue).toBe(`test_topic_name_${threadTestId}`)
//
//     await page.click('input#threadName')
//     await page.type('input#threadName', `test_thread_name_${threadTestId}`)
//
//     const threadNameValue = await page.$eval('input#threadName', input => input.value)
//     expect(threadNameValue).toBe(`test_thread_name_${threadTestId}`)
//
//     await page.click('textarea#threadMessage')
//     await page.type('textarea#threadMessage', `test_topic_msg_${threadTestId}`)
//
//     const threadMsgValue = await page.$eval('textarea#threadMessage', input => input.value)
//     expect(threadMsgValue).toBe(`test_topic_msg_${threadTestId}`)
//
//     await page.click('button#sendThreadButton')
//
//     await chill(2);
//     await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
//
//     const isVisible = await isElementVisible(page, 'input#topicName');
//     console.log(isVisible)
//     expect(isVisible).toBe(false)
//     await chill(5)
//
//
//
//     await browser.close()
// }, 30000)

