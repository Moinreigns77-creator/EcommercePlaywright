const { test, expect } = require("@playwright/test")

const RegisterPage = require("../pages/registerPage.js")
const LoginPage = require("../pages/loginPage.js")
const data = require("../JsonFiles/registerData.json")
const HomePage = require("../pages/homePage.js")
test("Register into Application", async ({ page }) => {

    await page.goto("https://automationexercise.com/");

    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await registerPage.registerUser(data.name, data.email, data.title, data.password, data.day, data.month, data.year, data.firstName, data.lastName, data.company, data.address1, data.address2, data.country, data.state, data.city, data.zipcode, data.mobile);

    await homePage.logoutUser();
})

test("Register with existing email id", async({page})=>{

      await page.goto("https://automationexercise.com/");

    const registerPage = new RegisterPage(page);
    const homePage = new HomePage(page);
    await registerPage.registerUserWithExistingEmail(data.name, data.email);


})