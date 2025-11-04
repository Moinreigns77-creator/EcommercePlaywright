const { test, expect } = require("@playwright/test")

const RegisterPage = require("../pages/registerPage.js")

const LoginPage = require("../pages/loginPage.js")

const HomePage = require("../pages/homePage.js")

const data = require("../JsonFiles/registerData.json")

test("Login to Application with valid email and password and logout", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.loginUser(data.email, data.password)
  await homePage.logoutUser();

})

test("login to Application with Invalid Credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto("https://automationexercise.com/");
  await loginPage.loginUserInvalidCredentials("abc1@gmail.com", "Abc@123");
})