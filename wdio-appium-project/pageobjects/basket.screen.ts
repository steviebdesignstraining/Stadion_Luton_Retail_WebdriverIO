import { expect, $ } from '@wdio/globals';

class BasketScreen {
    itemByDescription(description: string) {
        return $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("${description}"))`);
    }

    get size16() {
        return $('//android.widget.TextView[@text="16"]');
    }

    get addButton() {
        return $('//android.widget.TextView[@text="Add to Basket"]');
    }

    get successDialog() {
        return $('//android.widget.TextView[@text="Item successfully added to basket"]');
    }

    get basketHeader() {
        return $('//android.widget.TextView[@text="Basket"]');
    }

    get basketItem() {
        return $('//android.widget.TextView[@text="23/24 Home Wom Shirt - ORANGE"]');
    }

    get viewBasketButton() {
        return $('//android.widget.Button[2]/com.horcrux.svg.SvgView');
    }

    async addItemToBasket(description: string) {
        await this.itemByDescription(description);
        await $(`//android.view.ViewGroup[@content-desc="${description}"]/android.view.ViewGroup/android.widget.ImageView`).click();

        await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("16"))');
        await this.size16.click();

        await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Add to Basket"))');
        await this.addButton.click();

        await this.successDialog.waitForDisplayed({ timeout: 10000 });
        await this.viewBasketButton.click();

        await this.basketHeader.waitForDisplayed({ timeout: 10000 });
        await expect(this.basketHeader).toHaveText('Basket');
        await expect(this.basketItem).toBeDisplayed();
    }}

    export default new BasketScreen();