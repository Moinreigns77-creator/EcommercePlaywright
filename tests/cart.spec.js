const { test, expect } = require("@playwright/test")

const CartPage = require("../pages/cartPage")
const ProductPage = require("../pages/productPage")
const RegisterPage = require("../pages/registerPage")
const HomePage = require("../pages/homePage")
const data = require("../JsonFiles/registerData.json")

test("Verify Subscription in cart page", async ({ page }) => {
    await page.goto("https://automationexercise.com/");

    const cartPage = new CartPage(page);
    await cartPage.verifySubscribtion("abcd@gmail.com");
})

test("Place Order: Register while Checkout", async ({ page }) => {
    await page.goto("https://automationexercise.com/");

    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const homePage = new HomePage(page);

    await productPage.addProducts();

    await cartPage.checkoutProductsAndRegister();

    await homePage.deleteAccount();
})

test("Place Order: Register berfore Checkout", async ({ page }) => {
    await page.goto("https://automationexercise.com/");

    // const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const homePage = new HomePage(page);

    await cartPage.registerAndCheckoutProducts();

    await homePage.deleteAccount();

})


test("Place Order: Login before Checkout", async ({ page }) => {

    await page.goto("https://automationexercise.com/");

    // const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    // await registerPage.registerUser(data.name, data.email, data.title, data.password, data.day, data.month, data.year, data.firstName, data.lastName, data.company, data.address1, data.address2, data.country, data.state, data.city, data.zipcode, data.mobile);

    await cartPage.loginBeforeCheckout();

    await homePage.logoutUser();


})


test.only("Remove Products From Cart",async({page})=>{
     await page.goto("https://automationexercise.com/");

    // const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const homePage = new HomePage(page);

    await cartPage.removeProductFromCart();
   
})
