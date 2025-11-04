const { expect } = require("@playwright/test")
const { ECDH } = require("crypto")

const LoginPage = require("../pages/loginPage")
const { log } = require("console")

class Product {
    constructor(page) {
        this.page = page
        this.homeBtn = "//a[normalize-space()='Home']"
        this.productsBtn = "//a[@href='/products']"
        this.allProductsHeading = "//h2[normalize-space()='All Products']"
        this.productList = "//ul[@class='nav nav-pills nav-stacked']/li"

        this.firstProdut = "//a[@href='/product_details/1']"
        this.firstProdName = "//h2[normalize-space()='Blue Top']"
        this.firstProdCategory = "//p[normalize-space()='Category: Women > Tops']"
        this.firstProdPrice = "//span[contains(text(),'Rs.')]"
        this.firstProdAvailability = "//p/b[text()='Availability:']"
        this.firstProdCondition = "//p/b[text()='Condition:']"
        this.firstProdBrand = "//p/b[text()='Brand:']"

        this.searchField = "//input[@id='search_product']"
        this.searchBtn = "button[id='submit_search']"
        this.searchedProductsHeading = "//h2[text()='Searched Products']"
        this.allProdTitle = "//div[@class='productinfo text-center']//p"


        this.prod1_AddCartBtn = "//div[@class='productinfo text-center']//a[@data-product-id='1']"
        this.prod1_price = "//div[@class='productinfo text-center']//a[@data-product-id='1']/preceding-sibling::h2"
        this.prod1_name = "//div[@class='productinfo text-center']//a[@data-product-id='1']/preceding-sibling::p"
        this.prod1_viewProduct = "//a[@href='/product_details/1']"
        this.prod1_fillQuantity = "//input[@type='number']"

        this.prod2_AddCartBtn = "//div[@class='productinfo text-center']//a[@data-product-id='2']"
        this.prod2_price = "//div[@class='productinfo text-center']//a[@data-product-id='2']/preceding-sibling::h2"
        this.prod2_name = "//div[@class='productinfo text-center']//a[@data-product-id='2']/preceding-sibling::p"

        this.continueShopBtn = "//button[@class='btn btn-success close-modal btn-block']"
        this.addCartStatus = "//p[text()='Your product has been added to cart.']"
        this.viewCartBtn = "//a[@href='/view_cart'][normalize-space()='View Cart']"

        this.quantity = "//input[@id='quantity']"

        this.prod1_cartName = "//tr[@id='product-1']/td[@class='cart_description']//a"
        this.prod1_cartPrice = "//tr[@id='product-1']/td[@class='cart_price']"
        this.prod1_cartQuantity = "//tr[@id='product-1']/td[@class='cart_quantity']/button"
        this.prod1_cartTotal = "//tr[@id='product-1']/td[@class='cart_total']/p"

        this.prod2_cartName = "//tr[@id='product-2']/td[@class='cart_description']//a"
        this.prod2_cartPrice = "//tr[@id='product-2']/td[@class='cart_price']"
        this.prod2_cartQuantity = "//tr[@id='product-2']/td[@class='cart_quantity']/button"
        this.prod2_cartTotal = "//tr[@id='product-2']/td[@class='cart_total']/p"



        this.brandsHeading = "//div[@class='brands_products']/h2[normalize-space()='Brands']"
        this.madameBrandBtn = "//a[@href='/brand_products/Madame']"
        this.madameBrandHeading = "//h2[normalize-space()='Brand - Madame Products']"

        this.madameViewProdBtn_Prod1 = "//a[@href='/product_details/3']"
        this.madameBrand_Prod1 = "//p[contains(normalize-space(),'Brand:')]"

        this.allProdsAddToCart = "//div[@class='productinfo text-center']//a"

        this.cartBtn = "//a[@href='/view_cart'][normalize-space()='Cart']"
        this.cartAllProdTitle = "//td[@class='cart_description']/h4"

        this.writeReviewHeading = "//a[@href='#reviews']"
        this.reviewNameField = "input[id='name']"
        this.reviewEmailField= "input[id='email']"
        this.reviewTextareaField = "textarea[name='review']"
        this.reviewSubmitBtn = "button[id='button-review']"
        this.reviewSubmitStatus = "//div[@class='alert-success alert']/span[normalize-space()='Thank you for your review.']"
    }

    async verifyProducts() {
        await expect(this.page.locator(this.homeBtn)).toBeVisible();
        await this.page.locator(this.productsBtn).click();
        await expect(this.page.locator(this.allProductsHeading)).toBeVisible();
        const list = await this.page.locator(this.productList).count();
        await expect(list === 8).toBeTruthy();
        await this.page.locator(this.firstProdut).click();
        await expect(this.page.getByText("Quantity:")).toBeVisible();
        await expect(this.page.locator(this.firstProdName)).toBeVisible();
        await expect(this.page.locator(this.firstProdCategory)).toBeVisible();
        await expect(this.page.locator(this.firstProdPrice)).toBeVisible();
        await expect(this.page.locator(this.firstProdAvailability)).toBeVisible();
        await expect(this.page.locator(this.firstProdCondition)).toBeVisible();
        await expect(this.page.locator(this.firstProdBrand)).toBeVisible();

    }


    async searchProduct(product) {
        await expect(this.page.locator(this.homeBtn)).toBeVisible();
        await this.page.locator(this.productsBtn).click();

        await expect(this.page.locator(this.allProductsHeading)).toBeVisible();
        await this.page.locator(this.searchField).fill(product);
        await this.page.locator(this.searchBtn).click();

        await expect(this.page.locator(this.searchedProductsHeading)).toBeVisible();

        const prodList = await this.page.$$(this.allProdTitle);

        for (let i = 0; i < prodList.length; i++) {
            const name = await prodList[i].textContent();
            console.log(name.toLowerCase());

            // await expect((name.toLowerCase()).includes(product)).toBeTruthy();
        }


    }


    async addProductsAndCompareNamePrice() {
        await expect(this.page.locator(this.homeBtn)).toBeVisible();

        await this.page.locator(this.productsBtn).click();

        const name_p1 = await this.page.locator(this.prod1_name).textContent();
        const price_p1 = await this.page.locator(this.prod1_price).textContent();
        console.log(`${name_p1} - ${price_p1}`);

        await this.page.locator(this.prod1_viewProduct).click();
        await this.page.locator(this.prod1_fillQuantity).fill("10");
        await this.page.locator("//button[@class='btn btn-default cart'][normalize-space()='Add to cart']").click();
        await expect(this.page.locator(this.addCartStatus)).toBeVisible();
        await this.page.locator(this.continueShopBtn).click();

        // await this.page.locator(this.prod1_AddCartBtn).click();
        // await expect(this.page.locator(this.addCartStatus)).toBeVisible();
        // await this.page.locator(this.continueShopBtn).click();
        await this.page.locator(this.productsBtn).click();

        const name_p2 = await this.page.locator(this.prod2_name).textContent();
        const price_p2 = await this.page.locator(this.prod2_price).textContent();
        console.log(`${name_p2} - ${price_p2}`);

        await this.page.locator(this.prod2_AddCartBtn).click();
        await expect(this.page.locator(this.addCartStatus)).toBeVisible();
        await this.page.locator(this.viewCartBtn).click();

        const nameCart_p1 = await this.page.locator(this.prod1_cartName).textContent();
        const nameCart_p2 = await this.page.locator(this.prod2_cartName).textContent();

        await expect(name_p1).toBe(nameCart_p1);
        await expect(name_p2).toBe(nameCart_p2);

        const priceCart_p1 = await this.page.locator(this.prod1_cartPrice).textContent();
        const priceCart_p2 = await this.page.locator(this.prod2_cartPrice).textContent();


        console.log(`${price_p1} = ${priceCart_p1.trim()}`);
        console.log(`${price_p2} = ${priceCart_p2.trim()}`);


        await expect(price_p1).toBe(priceCart_p1.trim());
        await expect(price_p2).toBe(priceCart_p2.trim());

        const prod1_cartPrice = this.priceParse(priceCart_p1.trim());

        const quantityCart_p1 = await this.page.locator(this.prod1_cartQuantity).textContent();
        const q_p1 = parseInt(quantityCart_p1);
        console.log(`P1 Quantity: ${q_p1}`);


        const prod1_cartTotal = await this.page.locator(this.prod1_cartTotal).textContent();
        const p1_cartTotal = this.priceParse(prod1_cartTotal);
        console.log(`P1 Total: ${p1_cartTotal}`);


        await expect(prod1_cartPrice * q_p1).toBe(p1_cartTotal)


        const prod2_cartPrice = this.priceParse(priceCart_p2.trim());

        const quantityCart_p2 = await this.page.locator(this.prod2_cartQuantity).textContent();
        const q_p2 = parseInt(quantityCart_p2);
        console.log(`P2 Quantity: ${q_p2}`);


        const prod2_cartTotal = await this.page.locator(this.prod2_cartTotal).textContent();
        const p2_cartTotal = this.priceParse(prod2_cartTotal);
        console.log(`P2 Total: ${p2_cartTotal}`);


        await expect(prod2_cartPrice * q_p2).toBe(p2_cartTotal)


    }

    priceParse(price) {
        const arr = price.split(' ');
        const parsePrice = parseInt(arr[1]);
        return parsePrice;
    }


    async verifyProductQuantity(quantity) {
        await expect(this.page.locator(this.homeBtn)).toBeVisible();

        await this.page.locator(this.prod1_viewProduct).click();

        await expect(this.page).toHaveURL(/product_details/);

        await this.page.locator(this.prod1_fillQuantity).fill(quantity);

        await this.page.locator("//button[@class='btn btn-default cart'][normalize-space()='Add to cart']").click();
        await expect(this.page.locator(this.addCartStatus)).toBeVisible();
        await this.page.locator(this.viewCartBtn).click();

        const prod1_quantity = await this.page.locator(this.prod1_cartQuantity).textContent();
        await expect(prod1_quantity).toBe(quantity);

    }

    async addProducts() {
        await expect(this.page.locator(this.homeBtn)).toBeVisible();

        await this.page.locator(this.productsBtn).click();

        const name_p1 = await this.page.locator(this.prod1_name).textContent();
        const price_p1 = await this.page.locator(this.prod1_price).textContent();
        console.log(`${name_p1} - ${price_p1}`);

        await this.page.locator(this.prod1_AddCartBtn).click();
        await expect(this.page.locator(this.addCartStatus)).toBeVisible();
        await this.page.locator(this.continueShopBtn).click();

        const name_p2 = await this.page.locator(this.prod2_name).textContent();
        const price_p2 = await this.page.locator(this.prod2_price).textContent();
        console.log(`${name_p2} - ${price_p2}`);

        await this.page.locator(this.prod2_AddCartBtn).click();
        await expect(this.page.locator(this.addCartStatus)).toBeVisible();
        // await this.page.locator(this.viewCartBtn).click();
        await this.page.locator(this.continueShopBtn).click();

    }

    async verifyBrand() {
        await expect(this.page.locator(this.homeBtn)).toBeVisible();

        await this.page.locator(this.productsBtn).click();
        await expect(this.page).toHaveURL(/products/);

        await expect(this.page.locator(this.brandsHeading)).toBeVisible();
        await this.page.locator(this.madameBrandBtn).click();
        await expect(this.page.locator(this.madameBrandHeading)).toBeVisible();

        await this.page.locator(this.madameViewProdBtn_Prod1).click();
        const brandName_Prod1 = await this.page.locator(this.madameBrand_Prod1).textContent();
        console.log(brandName_Prod1);
        await expect(brandName_Prod1.includes("Madame")).toBeTruthy();



    }



    async searchProdAndVerifyCartAfterLogin() {

        await expect(this.page.locator(this.homeBtn)).toBeVisible();

        await this.page.locator(this.productsBtn).click();
        await expect(this.page.locator(this.allProductsHeading)).toBeVisible();

        await this.page.locator(this.searchField).fill("Jeans");
        await this.page.locator(this.searchBtn).click();
        await expect(this.page.locator(this.searchedProductsHeading)).toBeVisible();

        const allprodTitle = await this.page.locator(this.allProdTitle).allTextContents();

        for (let i = 0; i < allprodTitle.length; i++) {
            await expect(allprodTitle[i].includes("Jean")).toBeTruthy();
        }

        const allProdsAddToCart = await this.page.$$(this.allProdsAddToCart);

        for (let btn of allProdsAddToCart) {
            await btn.click();
            await this.page.locator(this.continueShopBtn).click();
        }

        await this.page.locator(this.cartBtn).click();
        await expect(this.page).toHaveURL(/view_cart/);
        const cartAllProdTitle = await this.page.locator(this.cartAllProdTitle).allTextContents();
        console.log(cartAllProdTitle);

        const allProdTitleSorted = allprodTitle.sort((a, b) => a - b);
        const cartAllProdTitleSorted = cartAllProdTitle.sort((a, b) => a - b);

        console.log(allProdTitleSorted);
        console.log(cartAllProdTitleSorted);

        await expect(allProdTitleSorted.length === cartAllProdTitleSorted.length).toBeTruthy();

        for (let i = 0; i < allProdTitleSorted.length; i++) {
            await expect(allProdTitleSorted[i] === cartAllProdTitleSorted[i]).toBeTruthy();
        }


        const loginPage = new LoginPage(this.page);
        await loginPage.loginUser("Moin1@gmail.com", "Moin@123");

        await this.page.locator(this.cartBtn).click();
        await expect(this.page).toHaveURL(/view_cart/);
        
        const cartAllProdTitle2 = await this.page.locator(this.cartAllProdTitle).allTextContents();
        console.log(cartAllProdTitle2);

    }

    async addReviewOnProduct(name,email,review){
        await this.page.locator(this.productsBtn).click();
        await expect(this.page).toHaveURL(/products/);

        await expect(this.page.locator(this.allProductsHeading)).toBeVisible();
        await this.page.locator(this.prod1_viewProduct).click();

        await expect(this.page.locator(this.writeReviewHeading)).toBeVisible();

        await this.page.locator(this.reviewNameField).fill(name);
        await this.page.locator(this.reviewEmailField).fill(email);
        await this.page.locator(this.reviewTextareaField).fill(review);
        await this.page.locator(this.reviewSubmitBtn).click();
        await expect(this.page.locator(this.reviewSubmitStatus)).toBeVisible();


    }


}

module.exports = Product