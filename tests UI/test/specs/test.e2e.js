const { expect } = require('@wdio/globals');
const HomePage = require('../pageobjects/home.page');
const OutsideHelpPage = require('../pageobjects/outside.help.page');

describe('Basic user steps', () => {
  it('Page should load', async () => {
    await HomePage.open();

    await expect(HomePage.pageLogoSvg).toBeExisting();
    await expect(HomePage.headerText).toHaveTextContaining(
      'NordPass — your digital life manager'
    );
  });

  it('Cookies pop up should close after selection', async () => {
    await expect(HomePage.cookiesPopUp).toBeExisting();
    await HomePage.cookiesReject;
    await expect(HomePage.cookiesPopUp).toBeExisting({ reverse: true });
  });

  it('User should be able to to get to help center and search for something', async () => {
    await HomePage.navigateToHelpPage;
    await OutsideHelpPage.open();

    await expect(OutsideHelpPage.helpPageHeader).toBeExisting();
    await expect(OutsideHelpPage.helpPageHeader).toHaveTextContaining(
      'Welcome to NordPass Help Center'
    );

    (await OutsideHelpPage.queryInputField).setValue('Test');
    await browser.keys('Return');
    await browser.keys('Return');

    await expect(OutsideHelpPage.searchTableHeader).toBeExisting();
  });
});
