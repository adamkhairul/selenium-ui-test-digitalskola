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

    it('should login successfully and verify dashboard', async function (){
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be Products');
    });

    after(async function () {
        await driver.quit();
    });
})