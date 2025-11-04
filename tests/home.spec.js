const { test, expect } = require("@playwright/test")

const HomePage = require("../pages/homePage");

test("Contact Us Form", async ({ page }) => {
    const homePage = new HomePage(page);

    await page.goto("https://automationexercise.com/");

    await homePage.contactUs("Moin", "Moin2@gmail.com", "Testing", "Testing", "./uploads/Img1.jpg");


})

test("Verify user is navigating test cases setion", async ({ page }) => {
    await page.goto("https://automationexercise.com/");
    const homePage = new HomePage(page);

    await homePage.testCases();



})


test("Verify Subscription in home page", async ({ page }) => {

    await page.goto("https://automationexercise.com/")
    const homePage = new HomePage(page);

    await homePage.verifySubscribtion("moin1@gmail.com")


})


test.only("View Category Products", async({page})=>{
 await page.goto("https://automationexercise.com/")
    const homePage = new HomePage(page);

   await homePage.verifyCategory();


})
