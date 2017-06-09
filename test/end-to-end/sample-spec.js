'use strict';

describe('The Google home page', () => {
  it('should load in the browser', () => {
    browser.get('http://localhost:8100/#/categories');
    let firstCatLink = element(by.css('[href="#/categories/0"]'));
    expect(firstCatLink.getText()).toEqual('Latest');
  });
});
