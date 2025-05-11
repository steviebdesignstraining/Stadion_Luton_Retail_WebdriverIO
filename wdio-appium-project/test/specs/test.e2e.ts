
describe('My Login application', () => {

    beforeEach(async () => {
        const permissionButton = await $('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_button"]');
        const storeButton = await $('//android.view.ViewGroup[@content-desc="Store"]/com.horcrux.svg.SvgView')
        
        // Check if the permission button is displayed, then click, else click the store button
        if (await permissionButton.isDisplayed()) {
            await permissionButton.click();
            await storeButton.waitForDisplayed({ timeout: 10000 });
            await storeButton.click();
        } else if (await storeButton.isDisplayed()) {
            await storeButton.click();
        }

        // Log and verify if the store tab is opened
        console.log('Tap on Store tab');
        // const storeLogo = await $('//android.widget.TextView[@text="Official Online Store"]');
        // await expect(await storeLogo.getText()).toContain('Official Online Store');
    });

    it('Navigate Retail Hamburger menu and validate links', async () => {
        await $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.widget.Button/com.horcrux.svg.SvgView').click();
        const hamburgerLinks = ['Kits & Jersey', 'Training', 'Image fallback'];
        for (const link of hamburgerLinks) {
            const linkElement = $(`//android.widget.TextView[@text="${link}"]`);
            await expect(linkElement).toBeDisplayed();
            console.log(`Link ${link} is displayed`);
        }
        const closeButton = $('//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/com.horcrux.svg.SvgView');
        await closeButton.click();
        console.log('Close button clicked');
        const storeLogo = await $('//android.widget.TextView[@text="Official Online Store"]');
        await expect(await storeLogo.getText()).toContain('Official Online Store');
    })

    it.skip('Navigate through hero carousels', async () => {
        const carousel1 = $('///android.widget.TextView[@text="PROMO WITH NO JSON PRODUCT"]');
        await carousel1.waitForDisplayed({ timeout: 10000 });
        await expect(carousel1).toHaveText('PROMO WITH NO JSON PRODUCT');

        // Carousel 2 Nav
        await $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]').click();
        const carousel2 = $('//android.widget.TextView[@text="THIS MAIN TITLE. OVERRIDES TITLE IN PRODUCT FIELD."]');
        await carousel2.waitForDisplayed({ timeout: 10000 });
        await expect(carousel2).toHaveText('THIS MAIN TITLE. OVERRIDES TITLE IN PRODUCT FIELD.');
    })

    it('Select and purchase and add item to basket', async () => {
        const itemSelector = '//android.view.ViewGroup[@content-desc="23/24 Home Wom Shirt, £59.00"]/android.view.ViewGroup/android.widget.ImageView';

        // Scroll to the item using UiScrollable (works with UiAutomator2)
        await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("23/24 Home Wom Shirt, £59.00"))`);
        
        // Click the image inside the target view
        await $(itemSelector).click();

        const size16 = $('//android.widget.TextView[@text="16"]');
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("16"))');
        await size16.click();

        const addButton = $('//android.widget.TextView[@text="Add to Basket"]')
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Add to Basket"))');
        await addButton.waitForDisplayed({ timeout: 50000 });
        await addButton.click();

        const dialogTitle = $('//android.widget.TextView[@text="Item successfully added to basket"]');
        await dialogTitle.waitForDisplayed({ timeout: 10000 });  

        await $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.widget.Button[2]/com.horcrux.svg.SvgView').click();
        
        const basketHeader = $('//android.widget.TextView[@text="Basket"]');
        await basketHeader.waitForDisplayed({ timeout: 10000 });
        await expect(basketHeader).toHaveText('Basket');
        console.log('Basket header is displayed');
        const basketItem = $('//android.widget.TextView[@text="23/24 Home Wom Shirt - ORANGE"]');
        await expect(basketItem).toHaveText('23/24 Home Wom Shirt - ORANGE');
        console.log('Basket item is displayed');
    })

    it('Log into account', async () => {
        await $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[2]/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.widget.Button[2]/com.horcrux.svg.SvgView').click();
        const personalDetailsTab = $('//android.widget.Button[@resource-id="section-button-1"]')
        const submitButton = $('//android.widget.Button[@text="Submit "]')
        if (await personalDetailsTab.isDisplayed()) {
            await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Submit "))');
            await submitButton.click();
            console.log('Submit button clicked');
        }
        else if (await submitButton.isDisplayed()) {
            console.log('Form not displayed');
            const loginHeader = $('//android.widget.TextView[@text="Login to your LTFC Club Account"]')
            await loginHeader.waitForDisplayed({ timeout: 10000 });
            await expect(loginHeader).toHaveText('Login to your LTFC Club Account');
            console.log('Login header is displayed');
            const emailField = $('//android.widget.EditText[@resource-id="loginId"]');
            await emailField.setValue('stephen.bennett@stadion.io');
            const passwordField = $('//android.widget.EditText[@resource-id="password"]');
            await passwordField.setValue('Stadion123!');
            await $('//android.widget.Button[@text="Submit "]').click();
    
        }
        // const accountHolderName = $('//android.widget.TextView[@text="Stephen Bennet"]')

        // const fixtureHeader = $('//android.widget.TextView[@text="Fixture"]');
        // await fixtureHeader.waitForDisplayed({ timeout: 10000 });
        // await expect(fixtureHeader).toHaveText('Fixture');
        // await $('//android.view.ViewGroup[@content-desc="Store"]').click();
    })
    it('', async () => {

    })

    it('', async () => {

    })
})

