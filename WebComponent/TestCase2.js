const { Builder } = require('selenium-webdriver');
const LoginPage = require('./LoginPage');
const DashboardPage = require('./DashboardPage');
const assert = require(`assert`);

describe('TestCase 1', function() {
    this.timeout(40000);
    let driver;

    before(async function (){
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async function (){
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('Error message appears for invalid credentials', async function (){
        const loginPage = new LoginPage(driver);
        const errorMessage = await loginPage.getErrorMessage();
        assert.strictEqual(errorMessage, 'Epic sadface: Username and password invalid', 'Expected error message does not match');
    });

    after(async function () {
        await driver.quit();
    });
})