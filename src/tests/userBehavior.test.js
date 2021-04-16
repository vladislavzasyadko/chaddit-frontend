import puppeteer from 'puppeteer';
import {TEST_URL} from "../CONSTANTS/API_CONSTANTS";

const URL = TEST_URL;

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
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })
    const page = await browser.newPage()

    const app = URL;
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
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })
    const page = await browser.newPage()
    const app = URL;
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


test('create thread', async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })
    const page = await browser.newPage()


    await page.goto(URL)
    await page.setDefaultNavigationTimeout(30000);
    await page.setViewport({ width: 1848, height: 949 })


    await page.waitForSelector('div #loginEmail')
    await page.click('div #loginEmail')

    await page.type('div #loginEmail', 'admin@chaddit.tk')

    await page.waitForSelector('div #loginPass')
    await page.click('div #loginPass')

    await page.type('div #loginPass', 'admin')
    await page.click('button#loginButton')
    
    await page.waitForSelector('.Header_header__1VCKf > .Header_utils__T1np1 > .Header_buttons__12gv4 > #openCreateThreadWidgetButton > .elements_buttonChad__3D0dV')
    await page.click('.Header_header__1VCKf > .Header_utils__T1np1 > .Header_buttons__12gv4 > #openCreateThreadWidgetButton > .elements_buttonChad__3D0dV')

    await page.waitForSelector('body > #portal #topicName')
    await page.click('body > #portal #topicName')
    await page.type('body > #portal #topicName', 'topictest')

    await page.waitForSelector('body > #portal > .CreateThreadWidget_darkBackground__2ZNe5 > .CreateThreadWidget_creatorContainer__2-rMA > .CreateThreadWidget_inputCreator__30zWb:nth-child(4)')
    await page.click('body > #portal > .CreateThreadWidget_darkBackground__2ZNe5 > .CreateThreadWidget_creatorContainer__2-rMA > .CreateThreadWidget_inputCreator__30zWb:nth-child(4)')
    await page.type('body > #portal > .CreateThreadWidget_darkBackground__2ZNe5 > .CreateThreadWidget_creatorContainer__2-rMA > .CreateThreadWidget_inputCreator__30zWb:nth-child(4)', 'tag')


    await page.waitForSelector('#portal > .CreateThreadWidget_darkBackground__2ZNe5 > .CreateThreadWidget_creatorContainer__2-rMA > .CreateThreadWidget_tagFormContainer__3PuPw > .CreateThreadWidget_addTagButton__2p_Hm')
    await page.click('#portal > .CreateThreadWidget_darkBackground__2ZNe5 > .CreateThreadWidget_creatorContainer__2-rMA > .CreateThreadWidget_tagFormContainer__3PuPw > .CreateThreadWidget_addTagButton__2p_Hm')

    await page.waitForSelector('body > #portal #threadName')
    await page.click('body > #portal #threadName')
    await page.type('body > #portal #threadName', 'testthread')

    await page.waitForSelector('body > #portal #threadMessage')
    await page.click('body > #portal #threadMessage')
    await page.type('body > #portal #threadMessage', 'testmsg')

    await page.waitForSelector('body > #portal #sendThreadButton')
    await page.click('body > #portal #sendThreadButton')

}, 30000)

