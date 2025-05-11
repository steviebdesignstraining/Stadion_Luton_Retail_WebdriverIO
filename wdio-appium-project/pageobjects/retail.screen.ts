import { expect, $ } from '@wdio/globals';

class RetailScreen {
    get permissionButton() {
        return $('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_button"]');
    }

    get storeButton() {
        return $('//android.view.ViewGroup[@content-desc="Store"]');
    }

    get storeLogo() {
        return $('//android.widget.TextView[@text="Official Online Store"]');
    }

    async openStoreTab() {
        if (await this.permissionButton.isDisplayed()) {
            await this.permissionButton.click();
        } else if (await this.storeButton.isDisplayed()) {
            await this.storeButton.click();
        }
        await expect(await this.storeLogo.getText()).toContain('Official Online Store');
    }
}

export default new RetailScreen();
