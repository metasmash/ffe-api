const puppeteer = require('puppeteer')

// Function to close the browser instance
async function closeBrowserInstance(browser) {
    await browser.close()
}

export async function loginToFFE(username: string, password: string) {
    const browser = await puppeteer.launch({ headless: false }) // Launch a new browser instance
    const page = await browser.newPage() // Create a new page

    // Navigate to the login page
    await page.goto('http://www.echecs.asso.fr/Connect.aspx')

    // Input username and password
    await page.type(
        'input[name="ctl00$ContentPlaceHolderMain$TextLogin"]',
        username
    )
    await page.type(
        'input[name="ctl00$ContentPlaceHolderMain$TextPassword"]',
        password
    )

    // Click on the login button
    await Promise.all([
        page.waitForNavigation(),
        page.click(
            "a[href=\"javascript:__doPostBack('ctl00$ContentPlaceHolderMain$LinkCmdSoumettre','')\"]"
        ),
    ])

    // Check if the login failed
    const errorMessageElement = await page.$(
        '#ctl00_ContentPlaceHolderMain_LabelMessage'
    )
    if (errorMessageElement) {
        const errorMessage = await page.evaluate(
            (el) => el.textContent,
            errorMessageElement
        )
        if (
            errorMessage &&
            errorMessage.includes("Le mot de passe n'est pas valable")
        ) {
            await closeBrowserInstance(browser) // Call the function to close the browser
            throw new Error('Login failed: ' + errorMessage)
        }
    }

    // If the login was successful, return the browser instance
    return browser
}
