const { expect } = require("@playwright/test");

class Home {
    constructor(page) {
        this.page = page
        this.homeBtn = "//a[normalize-space()='Home']"
        this.loggedInAsHeading = "//a[contains(text(),'Logged in as')]"
        this.logoutBtn = "//a[normalize-space()='Logout']"
        this.deleteBtn = "//a[normalize-space()='Delete Account']"
        this.loginPageHeading = "//h2[normalize-space()='Login to your account']"
        this.deleteAccStatus = "//h2[normalize-space()='Account Deleted!']"

        this.continueBtn = "//a[normalize-space()='Continue']"

        this.signUp_loginBtn = "//a[normalize-space()='Signup / Login']"

        this.contactUsBtn = "//a[normalize-space()='Contact us']"
        this.getInTouchHeading = "//h2[normalize-space()='Get In Touch']"

        this.name = "input[data-qa='name']"
        this.email = "input[data-qa='email']"
        this.subject = "input[data-qa='subject']"
        this.message = "textarea[data-qa='message']"
        this.fileBtn = "input[name='upload_file']"
        this.submitBtn = "input[data-qa='submit-button']"
        this.formSubmitStatus = "//div[@class='contact-form']//div[contains(., 'Success!')]";

        this.testCasesBtn = "//a[contains(text(),'Test Cases')]"

        this.footer = "footer[id='footer']"
        this.subscriptionHeading = "//h2[text()='Subscription']"
        this.subscribeEmailField = "input[id='susbscribe_email']"
        this.subscribeBtn = "button[id='subscribe']"
        this.subscribeStatus = "div[class='alert-success alert']"

        this.categoryHeading = "//div[@class='left-sidebar']/h2"
        this.womenCategoryBtn = "//a[@href='#Women']"
        this.womenDressBtn = "//a[@href='/category_products/1'][normalize-space()='Dress']"
        this.womenDressHeading = "//h2[text()='Women - Dress Products']"

        this.menCategoryBtn = "//a[@href='#Men']"
        this.menJeansBtn = "//a[@href='/category_products/6'][normalize-space()='Jeans']"
        this.menJeansHeading = "//h2[normalize-space()='Men - Jeans Products']"

    }

    async logoutUser() {

        await expect(this.page.locator(this.loggedInAsHeading)).toBeVisible()
        await this.page.locator(this.logoutBtn).click();
        await expect(this.page.locator(this.loginPageHeading)).toBeVisible();

    }

    async deleteAccount() {
        await this.page.locator(this.deleteBtn).click();

        await expect(this.page.locator(this.deleteAccStatus)).toBeVisible();

        await this.page.locator(this.continueBtn).click();

        await expect(this.page.locator(this.signUp_loginBtn)).toBeVisible();
    }

    async contactUs(name, email, subject, message, filePath) {
        await expect(this.page.locator(this.homeBtn)).toBeVisible();

        await this.page.locator(this.contactUsBtn).click();

        await expect(this.page.locator(this.getInTouchHeading)).toBeVisible();

        await this.page.locator(this.name).fill(name)
        await this.page.locator(this.email).fill(email)
        await this.page.locator(this.subject).fill(subject)
        await this.page.locator(this.message).fill(message)
        await this.page.locator(this.fileBtn).setInputFiles(filePath);

        await this.page.on("dialog", (dialogwin) => {
            const type = dialogwin.type();
            const msg = dialogwin.message();
            console.log(type);
            console.log(msg);

            dialogwin.accept();
        })

        await Promise.all([
            this.page.waitForResponse(res => res.url().includes('/contact_us') && res.status() === 200),
            this.page.locator(this.submitBtn).click(),
        ]);
        await this.page.waitForTimeout(10000);
        await expect(this.page.locator(this.formSubmitStatus)).toBeVisible();

    }


    async testCases() {
        await expect(this.page.locator(this.homeBtn)).toBeVisible();
        await this.page.locator(this.testCasesBtn).click();

        await expect(this.page).toHaveURL(/test_cases/);

    }

    async verifySubscribtion(email) {
        await expect(this.page.locator(this.homeBtn)).toBeVisible();
        // await this.page.locator(this.footer).scrollIntoViewIfNeeded();

        await expect(this.page.locator(this.subscriptionHeading)).toBeVisible();
        await this.page.locator(this.subscribeEmailField).fill(email);
        await this.page.locator(this.subscribeBtn).click();
        const status = await this.page.locator(this.subscribeStatus).textContent();
        console.log(status);
        await expect(this.page.locator(this.subscribeStatus)).toHaveText(/You have been successfully subscribed!/);


    }

    async verifyCategory() {
        await expect(this.page.locator(this.homeBtn)).toBeVisible();
        await this.page.locator(this.homeBtn).click();
        await expect(this.page.locator(this.categoryHeading)).toBeVisible();


        await this.page.locator(this.menCategoryBtn).click();
        await this.page.locator(this.menJeansBtn).click();
        await expect(this.page.locator(this.menJeansHeading)).toBeVisible();

        await this.page.locator(this.womenCategoryBtn).click();
        await this.page.locator(this.womenDressBtn).click();
        await expect(this.page.locator(this.womenDressHeading)).toBeVisible();

    }


}



module.exports = Home