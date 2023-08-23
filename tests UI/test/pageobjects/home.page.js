const { $ } = require('@wdio/globals');
const Page = require('./page');

class HomePage extends Page {
  get pageLogoSvg() {
    return $(
      '//*[@id="gatsby-focus-wrapper"]//header/div/div/div[1]//*[local-name() = "svg"]'
    );
  }

  get headerText() {
    return $('//*[@id="Hero - homepage"]/section/div/div/div[1]/h1');
  }

  get dropDown() {
    return $(
      '//*[@id="gatsby-focus-wrapper"]/div/div/main/div/header/div/div/div[5]/div/span'
    );
  }

  get helpButton() {
    return $('//*[@id="gatsby-focus-wrapper"]//header//li[4]/a');
  }

  get cookiesPopUp() {
    return $('//*[@id="cookie-consent"]');
  }

  get cookiesReject() {
    return $('//*[@id="cookie-consent"]/div[2]/div[2]/button');
  }

  async navigateToHelpPage() {
    await this.helpButton.click();
  }

  async rejectCookies() {
    (await this.cookiesReject).click();
  }

  open() {
    return super.open('https://nordpass.com/');
  }
}

module.exports = new HomePage();
