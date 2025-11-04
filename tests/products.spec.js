const { test, expect } = require("@playwright/test")

const ProductPage = require("../pages/productPage.js")

test("Verify All Products and product detail page", async ({ page }) => {

    await page.goto("https://automationexercise.com/")

    const productPage = new ProductPage(page);

    await productPage.verifyProducts();



})

test("Search Products", async ({ page }) => {
    await page.goto("https://automationexercise.com/")
    const productPage = new ProductPage(page);

    await productPage.searchProduct("shirt");
})

test("Add products and verify name,price,quantity and total price in cart page", async ({ page }) => {
    await page.goto("https://automationexercise.com/")
    const productPage = new ProductPage(page);

    await productPage.addProductsAndCompareNamePrice();
})

test("Verify Product quantity in Cart", async ({ page }) => {
    await page.goto("https://automationexercise.com/")
    const productPage = new ProductPage(page);

    await productPage.verifyProductQuantity("40");
})

test("Verify Brand", async ({ page }) => {
    await page.goto("https://automationexercise.com/")
    const productPage = new ProductPage(page);

    await productPage.verifyBrand();
})


test("Search Products and Verify Cart After Login", async ({ page }) => {
    await page.goto("https://automationexercise.com/")
    const productPage = new ProductPage(page);

    await productPage.searchProdAndVerifyCartAfterLogin();
})


test.only(" Add review on product", async ({ page }) => {
    await page.goto("https://automationexercise.com/")
    const productPage = new ProductPage(page);
    await productPage.addReviewOnProduct("Moin","Moin1@gmail.com","Testing");
})


