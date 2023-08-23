const { $ } = require('@wdio/globals');
const Page = require('./page');

class OutsideHelpPage extends Page {
  get helpPageHeader() {
    return $('/html/body/main/div/div[1]/div/h1');
  }

  get queryInputField() {
    return $('//*[@id="query"]');
  }

  get searchTableHeader() {
    return $('/html/body/main/div/div[2]/div/h1');
  }

  open() {
    return super.open('https://support.nordpass.com/');
  }
}

module.exports = new OutsideHelpPage();
