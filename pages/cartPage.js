const { expect } = require("@playwright/test")

const RegisterPage = require("../pages/registerPage.js")
const data = require("../JsonFiles/registerData.json")

const ProductPage = require("../pages/productPage.js")

const LoginPage = require("../pages/loginPage.js")

class Cart {
    constructor(page) {
        this.page = page
        this.homeBtn = "//a[@href='/']/i"
        this.cartBtn = "//a[@href='/view_cart'][normalize-space()='Cart']"

        this.footer = "footer[id='footer']"
        this.subscriptionHeading = "//h2[text()='Subscription']"
        this.subscribeEmailField = "input[id='susbscribe_email']"
        this.subscribeBtn = "button[id='subscribe']"
        this.subscribeStatus = "div[class='alert-success alert']"

        this.checkoutBtn = "a[class='btn btn-default check_out']"
        this.register_LoginBtn = "//a[@href='/login']/u[text()='Register / Login']"

        this.addressDetailsHeading = "//h2[text()='Address Details']"
        this.addressName = "//ul[@id='address_delivery']/li[@class='address_firstname address_lastname']"
        this.company = "(//ul[@id='address_delivery']/li[@class='address_address1 address_address2'])[1]"
        this.address1 = "(//ul[@id='address_delivery']/li[@class='address_address1 address_address2'])[2]"
        this.address2 = "(//ul[@id='address_delivery']/li[@class='address_address1 address_address2'])[3]"
        this.cityStatePostalCode = "//ul[@id='address_delivery']/li[@class='address_city address_state_name address_postcode']"
        this.country = "//ul[@id='address_delivery']/li[@class='address_country_name']"
        this.phone = "//ul[@id='address_delivery']/li[@class='address_phone']"

        this.billingAddressName = "//ul[@id='address_invoice']/li[@class='address_firstname address_lastname']"
        this.billingCompany = "(//ul[@id='address_invoice']/li[@class='address_address1 address_address2'])[1]"
        this.billingAddress1 = "(//ul[@id='address_invoice']/li[@class='address_address1 address_address2'])[2]"
        this.billingAddress2 = "(//ul[@id='address_invoice']/li[@class='address_address1 address_address2'])[3]"
        this.billingCityStatePostalCode = "//ul[@id='address_invoice']/li[@class='address_city address_state_name address_postcode']"
        this.billingCountry = "//ul[@id='address_invoice']/li[@class='address_country_name']"
        this.billingPhone = "//ul[@id='address_invoice']/li[@class='address_phone']"




        this.commentTextarea = "//textarea[@name='message']"
        this.placeOrderBtn = "//a[@href='/payment']"

        this.name_on_card = "//input[@data-qa='name-on-card']"
        this.card_number = "//input[@data-qa='card-number']"
        this.cvv = "//input[@data-qa='cvc']"
        this.expiry_month = "//input[@data-qa='expiry-month']"
        this.expiry_year = "//input[@data-qa='expiry-year']"
        this.pay_and_confirmOrderBtn = "//button[@data-qa='pay-button']"
        this.orderPlacedMessage = "//p[text()='Congratulations! Your order has been confirmed!']"

        this.prod1_name = "//a[@href='/product_details/1']"
        this.prod1_removeCart = "//a[@class='cart_quantity_delete'][@data-product-id='1']"

        this.downloadInvoiceBtn = "//a[contains(@href,'/download_invoice/')]"



    }

    async verifySubscribtion(email) {
        await expect(this.page.locator(this.homeBtn)).toBeVisible();
        await this.page.locator(this.cartBtn).click();
        await this.page.locator(this.footer).scrollIntoViewIfNeeded();

        await expect(this.page.locator(this.subscriptionHeading)).toBeVisible();
        await this.page.locator(this.subscribeEmailField).fill(email);
        await this.page.locator(this.subscribeBtn).click();
        const status = await this.page.locator(this.subscribeStatus).textContent();
        console.log(status);
        await expect(this.page.locator(this.subscribeStatus)).toHaveText(/You have been successfully subscribed!/);


    }

    async checkoutProductsAndRegister() {
        await expect(this.page).toHaveURL(/view_cart/);
        await this.page.locator(this.checkoutBtn).click();
        await this.page.locator(this.register_LoginBtn).click();

        const registerPage = new RegisterPage(this.page);
        await registerPage.registerUser(data.name, data.email, data.title, data.password, data.day, data.month, data.year, data.firstName, data.lastName, data.company, data.address1, data.address2, data.country, data.state, data.city, data.zipcode, data.mobile);

        await this.page.locator(this.cartBtn).click();
        await this.page.locator(this.checkoutBtn).click();
        await expect(this.page.locator(this.addressDetailsHeading)).toBeVisible();

        const addressName = await this.page.locator(this.addressName).textContent();
        const fullName = data.title + '. ' + data.firstName + ' ' + data.lastName;
        await expect(fullName).toBe(addressName);

        const addressCompany = await this.page.locator(this.company).textContent();
        await expect(addressCompany).toBe(data.company);

        const address1 = await this.page.locator(this.address1).textContent()
        await expect(address1).toBe(data.address1);

        const address2 = await this.page.locator(this.address2).textContent()
        await expect(address2).toBe(data.address2);

        const cityStatePostalCode = data.city + ' ' + data.state + ' ' + data.zipcode;
        const city_state_zipcode = await this.page.locator(this.cityStatePostalCode).textContent();
        await expect(cityStatePostalCode).toBe(city_state_zipcode.replace(/\s+/g, ' ').trim())
        console.log(cityStatePostalCode);
        console.log(city_state_zipcode.replace(/\s+/g, ' ').trim());

        const country = await this.page.locator(this.country).textContent();
        await expect(country).toBe(data.country);

        const phone = await this.page.locator(this.phone).textContent();
        await expect(phone).toBe(data.mobile);

        await this.page.locator(this.commentTextarea).fill("Testing")
        await this.page.locator(this.placeOrderBtn).click();

        await expect(this.page).toHaveURL(/payment/);

        await this.page.locator(this.name_on_card).fill(data.name);
        await this.page.locator(this.card_number).fill("234514");
        await this.page.locator(this.cvv).fill("2121");
        await this.page.locator(this.expiry_month).fill("03");
        await this.page.locator(this.expiry_year).fill("2026");
        await this.page.locator(this.pay_and_confirmOrderBtn).click();
        await expect(this.page.locator(this.orderPlacedMessage)).toBeVisible();

    }

    async registerAndCheckoutProducts() {

        const registerPage = new RegisterPage(this.page);
        await registerPage.registerUser(data.name, data.email, data.title, data.password, data.day, data.month, data.year, data.firstName, data.lastName, data.company, data.address1, data.address2, data.country, data.state, data.city, data.zipcode, data.mobile);


        const productPage = new ProductPage(this.page);
        await productPage.addProducts();

        await this.page.locator(this.cartBtn).click();
        await expect(this.page).toHaveURL(/view_cart/);
        await this.page.locator(this.checkoutBtn).click();


        const addressName = await this.page.locator(this.addressName).textContent();
        const fullName = data.title + '. ' + data.firstName + ' ' + data.lastName;
        await expect(fullName).toBe(addressName);

        const addressCompany = await this.page.locator(this.company).textContent();
        await expect(addressCompany).toBe(data.company);

        const address1 = await this.page.locator(this.address1).textContent()
        await expect(address1).toBe(data.address1);

        const address2 = await this.page.locator(this.address2).textContent()
        await expect(address2).toBe(data.address2);

        const cityStatePostalCode = data.city + ' ' + data.state + ' ' + data.zipcode;
        const city_state_zipcode = await this.page.locator(this.cityStatePostalCode).textContent();
        await expect(cityStatePostalCode).toBe(city_state_zipcode.replace(/\s+/g, ' ').trim())
        console.log(cityStatePostalCode);
        console.log(city_state_zipcode.replace(/\s+/g, ' ').trim());

        const country = await this.page.locator(this.country).textContent();
        await expect(country).toBe(data.country);

        const phone = await this.page.locator(this.phone).textContent();
        await expect(phone).toBe(data.mobile);

        await this.page.locator(this.commentTextarea).fill("Testing")
        await this.page.locator(this.placeOrderBtn).click();

        await expect(this.page).toHaveURL(/payment/);

        await this.page.locator(this.name_on_card).fill(data.name);
        await this.page.locator(this.card_number).fill("234514");
        await this.page.locator(this.cvv).fill("2121");
        await this.page.locator(this.expiry_month).fill("03");
        await this.page.locator(this.expiry_year).fill("2026");
        await this.page.locator(this.pay_and_confirmOrderBtn).click();
        await expect(this.page.locator(this.orderPlacedMessage)).toBeVisible();

    }

    async checkoutProducts() {
        await this.page.locator(this.cartBtn).click();
        await expect(this.page).toHaveURL(/view_cart/);
        await this.page.locator(this.checkoutBtn).click();


        const addressName = await this.page.locator(this.addressName).textContent();
        const fullName = data.title + '. ' + data.firstName + ' ' + data.lastName;
        await expect(fullName).toBe(addressName);

        const addressCompany = await this.page.locator(this.company).textContent();
        await expect(addressCompany).toBe(data.company);

        const address1 = await this.page.locator(this.address1).textContent()
        await expect(address1).toBe(data.address1);

        const address2 = await this.page.locator(this.address2).textContent()
        await expect(address2).toBe(data.address2);

        const cityStatePostalCode = data.city + ' ' + data.state + ' ' + data.zipcode;
        const city_state_zipcode = await this.page.locator(this.cityStatePostalCode).textContent();
        await expect(cityStatePostalCode).toBe(city_state_zipcode.replace(/\s+/g, ' ').trim())
        console.log(cityStatePostalCode);
        console.log(city_state_zipcode.replace(/\s+/g, ' ').trim());

        const country = await this.page.locator(this.country).textContent();
        await expect(country).toBe(data.country);

        const phone = await this.page.locator(this.phone).textContent();
        await expect(phone).toBe(data.mobile);

        await this.page.locator(this.commentTextarea).fill("Testing")
        await this.page.locator(this.placeOrderBtn).click();

        await expect(this.page).toHaveURL(/payment/);

        await this.page.locator(this.name_on_card).fill(data.name);
        await this.page.locator(this.card_number).fill("234514");
        await this.page.locator(this.cvv).fill("2121");
        await this.page.locator(this.expiry_month).fill("03");
        await this.page.locator(this.expiry_year).fill("2026");
        await this.page.locator(this.pay_and_confirmOrderBtn).click();
        await expect(this.page.locator(this.orderPlacedMessage)).toBeVisible();
    }

    async loginBeforeCheckout() {

        const productPage = new ProductPage(this.page);
        await productPage.addProducts();

        const loginPage = new LoginPage(this.page);
        await loginPage.loginUser(data.email, data.password);

        await this.checkoutProducts();
    }


    async removeProductFromCart() {

        const productPage = new ProductPage(this.page);
        await productPage.addProducts();

        await this.page.locator(this.cartBtn).click();
        await expect(this.page).toHaveURL(/view_cart/);
        await this.page.locator(this.prod1_removeCart).click();
        await expect(this.page.locator(this.prod1_name)).toHaveCount(0);


    }

    async verifyDeliveryAndBillingAddress() {
        await this.page.locator(this.cartBtn).click();
        await expect(this.page).toHaveURL(/view_cart/);
        await this.page.locator(this.checkoutBtn).click();

        const addressName = await this.page.locator(this.addressName).textContent();
        const billingAddressName = await this.page.locator(this.billingAddressName).textContent();
        const fullName = data.title + '. ' + data.firstName + ' ' + data.lastName;
        await expect(fullName).toBe(addressName);
        await expect(fullName).toBe(billingAddressName);

        const addressCompany = await this.page.locator(this.company).textContent();
        const billingCompany = await this.page.locator(this.billingCompany).textContent();
        await expect(addressCompany).toBe(data.company);
        await expect(billingCompany).toBe(data.company);

        const address1 = await this.page.locator(this.address1).textContent()
        const billingAddress1 = await this.page.locator(this.billingAddress1).textContent();
        await expect(address1).toBe(data.address1);
        await expect(billingAddress1).toBe(data.address1);

        const address2 = await this.page.locator(this.address2).textContent()
        const billingAddress2 = await this.page.locator(this.billingAddress2).textContent()
        await expect(address2).toBe(data.address2);
        await expect(billingAddress2).toBe(data.address2);

        const cityStatePostalCode = data.city + ' ' + data.state + ' ' + data.zipcode;
        const city_state_zipcode = await this.page.locator(this.cityStatePostalCode).textContent();
        const billingCity_state_zipcode = await this.page.locator(this.billingCityStatePostalCode).textContent();

        await expect(cityStatePostalCode).toBe(city_state_zipcode.replace(/\s+/g, ' ').trim())
        await expect(cityStatePostalCode).toBe(billingCity_state_zipcode.replace(/\s+/g, ' ').trim())

        console.log(cityStatePostalCode);
        console.log(city_state_zipcode.replace(/\s+/g, ' ').trim());

        const country = await this.page.locator(this.country).textContent();
        const billingCountry = await this.page.locator(this.billingCountry).textContent();
        await expect(country).toBe(data.country);
        await expect(billingCountry).toBe(data.country);

        const phone = await this.page.locator(this.phone).textContent();
        const billingPhone = await this.page.locator(this.billingPhone).textContent();
        await expect(phone).toBe(data.mobile);
        await expect(billingPhone).toBe(data.mobile);

    }


    async downloadInvoice() {
        await this.page.locator(this.commentTextarea).fill("Testing")
        await this.page.locator(this.placeOrderBtn).click();

        await expect(this.page).toHaveURL(/payment/);

        await this.page.locator(this.name_on_card).fill(data.name);
        await this.page.locator(this.card_number).fill("234514");
        await this.page.locator(this.cvv).fill("2121");
        await this.page.locator(this.expiry_month).fill("03");
        await this.page.locator(this.expiry_year).fill("2026");
        await this.page.locator(this.pay_and_confirmOrderBtn).click();
        await expect(this.page.locator(this.orderPlacedMessage)).toBeVisible();

        // Wait for download triggered by button click
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.downloadInvoiceBtn).click() // Use your actual locator
        ]);

        // Assert we have a download object and correct file name/extension
        const path = await download.path();
        expect(path).not.toBeNull();
        const filename = download.suggestedFilename();
        expect(filename.endsWith('.txt')).toBe(true);


        const datetime = this.getDateTimeForFilename();
        const uniqueFileName = `invoice_${datetime}.pdf`;
        // Optionally save and further examine the file
        await download.saveAs(`./uploads/${uniqueFileName}.txt`);
    }


    getDateTimeForFilename() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}${month}${day}_${hours}${minutes}${seconds}`;
    }

}

module.exports = Cart