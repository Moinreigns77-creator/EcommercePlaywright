const { expect } = require("@playwright/test");

class Register {

    constructor(page) {
        this.page = page
        this.homeBtn = "//a[normalize-space()='Home']"
        this.loginBtn = "//a[normalize-space()='Signup / Login']"
        this.signupHeading = "h2:has-text('New User Signup')"
        this.name1 = "input[placeholder='Name']"
        this.email1 = "input[data-qa='signup-email'][placeholder='Email Address']"
        this.signUpBtn = "button[data-qa='signup-button']"

        this.accInfoHeading = "//h2[normalize-space()='Enter Account Information']"

        this.genderMr = "input[type='radio'][value='Mr']"
        this.genderMs = "input[type='radio'][value='Mrs']"

        this.name2 = "input[id='name']"
        this.email2 = "input[id='email']"
        this.password = "input[id='password']"
        this.days = "select[id='days']"
        this.month = "select[id='months']"
        this.year = "select[id='years']"

        this.newsLetterCheckbox = "input[id='newsletter']"
        this.specialCheckbox = "input[id='optin']"

        this.firstName = "input[id='first_name']"
        this.lastName = "input[id='last_name']"

        this.company = "input[id='company']"

        this.address1 = "input[id='address1']"
        this.address2 = "input[id='address2']"

        this.country = "select[id='country']"

        this.state = "input[id='state']"
        this.city = "input[id='city']"
        this.zipcode = "input[id='zipcode']"
        this.mobile = "input[id='mobile_number']"
        this.createAccBtn = "button[data-qa='create-account']"

        this.accCreateStatus = "//h2[@data-qa='account-created']"
        this.continueBtn = "//a[@data-qa='continue-button']"

        this.loggedInAsHeading = "//a[contains(text(),'Logged in as')]"



    }


    async registerUser(name, email, title, password, day, month, year, firstName, lastName, company, address1, address2, country, state, city, zipcode, mobile) {

        await expect(this.page.locator(this.homeBtn)).toBeVisible();

        await this.page.locator(this.loginBtn).click();

        await expect(this.page.locator(this.signupHeading)).toBeVisible();

        await this.page.locator(this.name1).fill(name);
        await this.page.locator(this.email1).fill(email);
        await this.page.locator(this.signUpBtn).click()

        await expect(this.page.locator(this.accInfoHeading)).toBeVisible();

        if (title === "Mr") {
            await this.page.locator(this.genderMr).setChecked(true);
        } else {
            await this.page.locator(this.genderMs).setChecked(true);
        }

        await this.page.locator(this.name2).fill(name);
        // await this.page.locator(this.email2).fill(email);
        await this.page.locator(this.password).fill(password)

        await this.page.locator(this.days).selectOption({ label: day });
        await this.page.locator(this.month).selectOption({ label: month });
        await this.page.locator(this.year).selectOption({ label: year });

        await this.page.locator(this.newsLetterCheckbox).setChecked(true);
        await this.page.locator(this.specialCheckbox).setChecked(true);

        await this.page.locator(this.firstName).fill(firstName);
        await this.page.locator(this.lastName).fill(lastName);
        await this.page.locator(this.company).fill(company);
        await this.page.locator(this.address1).fill(address1);
        await this.page.locator(this.address2).fill(address2);
        await this.page.locator(this.country).selectOption({ label: country });
        await this.page.locator(this.state).fill(state);
        await this.page.locator(this.city).fill(city);
        await this.page.locator(this.zipcode).fill(zipcode);
        await this.page.locator(this.mobile).fill(mobile);

        await this.page.locator(this.createAccBtn).click();

        await expect(this.page.locator(this.accCreateStatus)).toBeVisible();

        await this.page.locator(this.continueBtn).click();

        await expect(this.page.locator(this.loggedInAsHeading)).toBeVisible();


    }


    async registerUserWithExistingEmail(name, email) {
        await expect(this.page.locator(this.homeBtn)).toBeVisible();

        await this.page.locator(this.loginBtn).click();

        await expect(this.page.locator(this.signupHeading)).toBeVisible();

        await this.page.locator(this.name1).fill(name);
        await this.page.locator(this.email1).fill(email);
        await this.page.locator(this.signUpBtn).click()
        await expect(this.page.locator("//p[normalize-space()='Email Address already exist!']")).toBeVisible();
    }
}

module.exports = Register