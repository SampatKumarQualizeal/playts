import { expect, Page, Locator, Frame } from "@playwright/test";
import path from 'path';
import fs from 'fs';

class playwrightUtil {
	page: Page | any;

	constructor(page: Page) {
		this.page = page;
	}

	async open(url: string) {
		await this.page.goto(url);
	}

	async openWithWait(url: string, timeInSeconds: number) {
		await this.page.goto(url, { timeout: timeInSeconds });
	}

	async pause() {
		await this.page.pause();
	}

	async reload() {
		await this.page.reload();
	}

	async getPageTitle(): Promise<string> {
		return await this.page.title();
	}

	async getUrl(): Promise<string> {
		return this.page.url();
	}

	async waitForLoadState(strState: string) {
		return this.page.waitForLoadState(strState as any);
	}

	async waitForPageLoad() {
		return this.page.waitForLoadState("networkidle");
	}

	async waitForPageLoadDomcontentloaded() {
		return this.page.waitForLoadState("domcontentloaded");
	}

	async wait() {
		return this.page.waitForTimeout(10000);
	}

	async wait(timeInSeconds: number) {
		return this.page.waitForTimeout(timeInSeconds * 1000);
	}

	async waitForSomeTime(timeInSeconds: number) {
		//console.log('Additional Wait for ' + timeInSeconds + ' seconds.');
		await new Promise(resolve => setTimeout(resolve, (timeInSeconds * 1000)));
	}

	async waitForNavigation(timeInSeconds: number) {
		await this.page.waitForNavigation({ timeout: timeInSeconds * 1000 });
	}

	async waitForSelector(selector: string) {
		await this.page.waitForSelector(selector);
	}

	async waitForSelector(selector: string, timeInSeconds: number) {
		await this.page.waitForSelector(selector, { timeout: timeInSeconds * 1000, });
	}

	async waitForSelectorState(selector: string, strState: string, timeInSeconds: number) {
		await this.page.waitForSelector(selector, { state: strState as any, timeout: timeInSeconds * 1000 });
	}

	async getElement(selector: string): Promise<Locator> {
		return await this.page.locator(selector);
	}

	async isElementDisplayed(selector: string) {
		const element = await this.page.locator(selector);
		return !!element;
	}

	async verifyElementPresent(selector: string) {
		const element = await this.page.locator(selector);
		expect.soft((!!element)).toBeTruthy();
	}

	async verifyElementAttached(identifier: string) {
		await expect(this.page.locator(identifier)).toBeAttached();
	}

	async verifyElementAttachedSoft(identifier: string) {
		await expect.soft(this.page.locator(identifier)).toBeAttached();
	}


	async verifyElementNotAttachedSoft(identifier: string) {
		await expect.soft(this.page.locator(identifier)).toBeAttached({ attached: false });
	}

	async isElementVisible(selector: string, errorMessage?: string) {
		await this.page.waitForSelector(selector);
		const element = this.page.locator(selector);
		try {
			const isVisible = await element.isVisible();
			expect(isVisible).toBeTruthy();
		} catch (error: any) {
			throw new Error(`${errorMessage}`);
		}
	}

	async isElementNotVisible(selector: string) {
		const element = this.page.locator(selector);
		return expect(element).toBeHidden;
	}

	async isElementEnabled(selector: string, errorMessage?: string) {
		await this.page.waitForSelector(selector);
		const element = this.page.locator(selector);
		try {
			const isEnabled = await element.isEnabled();
			expect(isEnabled).toBeTruthy();
		} catch (error: any) {
			throw new Error(`${errorMessage}`);
		}
	}

	async isElementChecked(selector: string, errorMessage?: string) {
		await this.page.waitForSelector(selector);
		const element = this.page.locator(selector);
		try {
			const isChecked = await element.isChecked();
			expect(isChecked).toBeTruthy();
		} catch (error: any) {
			throw new Error(`${errorMessage}`);
		}
	}

	async getElements(selector: string) {
		this.waitForSomeTime(30);
		return await this.page.$$(selector);
	}

	async click(selector: string) {
		await this.page.click(selector);
	}

	async waitAndClick(selector: string) {
		await this.page.waitForSelector(selector);
		return this.page.click(selector);
	}

	async clickFirstEle(selector: Locator) {
		const ele = await this.page.waitForSelector(selector.first());
		return this.page.click(ele as any);
	}



	async waitAndHardClick(selector: string) {
		await this.page.waitForSelector(selector);
		return await this.page.$eval(selector, (element: any) => element.click());
	}

	async waitAndFill(selector: string, text: string) {
		await this.page.waitForSelector(selector);
		await this.page.fill(selector, text);
	}

	async waitAndType(Selector: string, text: string) {
		await this.page.waitForSelector(Selector);
		await this.page.click(Selector, { clickCount: 3 });
		await this.page.keyboard.press("Backspace");
		await this.page.type(Selector, text);
	}

	async keyPress(selector: string, key: string) {
		this.page.press(selector, key);
	}

	async waitForSelector(selector: string) {
		await this.page.waitForSelector(selector);
	}

	async getInnerText(selector: string) {
		const element = await this.page.$(selector);
		return await (element as any).innerText();
	}

	async getTextContent(selector: string) {
		const element = await this.page.locator(selector);

		if (!element) {
			throw new Error(`Element with selector ${selector} not found.`);
		}
		try {
			return await element.textContent();
		} catch (error: any) {
			throw new Error(
				`Error retrieving text content for element with selector ${selector}: ${error.message}`
			);
		}
	}

	async clickOnElement(identifier: string) {
		await this.page.locator(identifier).click();
	}

	async mouseHover(identifier: string) {
		await this.page.locator(identifier).hover();
	}

	async fillInputBox(identifier: string, text: string) {
		await this.page.locator(identifier).fill(text);
	}

	async fillInputBoxWithClear(identifier: string, text: string) {
		await this.page.locator(identifier).clear();
		await this.page.locator(identifier).fill(text);
	}

	async dblClickOnElement(identifier: string) {
		await this.page.locator(identifier).dblclick();
	}

	async focusOnElement(identifier: string) {
		await this.page.locator(identifier).focus();
	}


	async compareTextContent(selector: string, expectedTextContent: string) {
		expect.soft((await this.getTextContent(selector)) === expectedTextContent).toBeTruthy();
	}

	async verifyTextPresent(text: string) {

		let selector = `//*[contains(text(),'" + ${text} + "')]`;

		let bFlag: boolean;

		try {
			const element = await this.page.waitForSelector(selector, { state: 'attached', timeout: 10 * 1000 });

			bFlag = !!element;

		} catch (error: any) {
			console.log("verifyTextPresentSoft error:" + error.message);
			bFlag = false;
		}

		return bFlag;
	}


	async verifyElementText(selector: string, text: string) {
		await this.page.waitForSelector(selector);
		const textValue = await this.page.textContent(selector);
		return expect.soft(textValue.trim()).toBe(text);
	}

	async verifyElementContainsText(selector: string, text: string) {
		await this.page.waitForSelector(selector);
		return await expect.soft(this.page.locator(selector)).toContainText(text);
	}


	async verifyElementAttribute(selector: string, attribute: string, value: string) {
		await this.page.waitForSelector(selector);
		const textValue = await this.page.getAttribute(selector, attribute);
		return expect.soft((textValue as string).trim()).toBe(value);
	}

	async verifyContainsUrl(url: string) {
		await expect(this.page).toHaveURL(url);
	}

	async verifyToHaveText(identifier: string, expectedText: string) {
		await expect.soft(this.page.locator(identifier)).toHaveText(expectedText);
	}

	async verifyToHaveValue(identifier: string, inputFieldText: string) {
		await expect.soft(this.page.locator(identifier)).toHaveValue(inputFieldText);
	}

	async verifyContainText(identifier: string, expectedText: string) {
		await expect.soft(this.page.locator(identifier)).toContainText(expectedText);
	}

	async verifyToHaveAttrbutes(attr: string, value: string) {
		await expect.soft(this.page.locator(identifier)).toHaveAttribute(attr, value);
	}

	async verifyToHaveCss(key: string, value: string) {
		await expect.soft(this.page.locator(identifier)).toHaveCSS(key, value);
	}

	async verifyElementIsVisible(identifier: string) {
		await expect.soft(this.page.locator(identifier)).isVisible();
	}

	async verifyRadioBtnChecked(identifier: string) {
		await expect.soft(this.page.locator(identifier)).toBeChecked();
	}

	async verifyTextBoxEditable(identifier: string) {
		await expect.soft(this.page.locator(identifier)).toBeEditable();
	}

	async verifyTextBoxEnabled(identifier: string) {
		await expect.soft(this.page.locator(identifier)).toBeEnabled();
	}

	async verifyElementFocused(identifier: string) {
		await expect.soft(this.page.locator(identifier)).toBeFocused();
	}


	async verifyJSElementValue(selector: string, text: string) {
		const textValue = await this.page.$eval(selector, element => (element as any).value)
		return expect(textValue.trim()).toBe(text)
	}

	async selectValueFromDropdown(selector: string, text: string) {
		await this.page.waitForSelector(selector);
		const dropdown = await this.page.locator(selector);
		return await dropdown.selectOption({ value: text });
	}

	async getValue(selector: string) {
		const element = await this.page.$(selector);
		return await (element as any).inputValue();
	}
	async screenshot(path: string) {
		await this.page.screenshot({ path });
	}

	async waitForURL(url: string) {
		await this.page.waitForURL(url);
	}

	async waitForHidden(selector: string, options: Record<string, any> = {}) {
		await this.page.waitForSelector(selector, { state: "hidden", ...options });
	}

	async getFirstElementFromTheList(selector: string) {
		const rows = this.page.locator(selector);
		const count = await rows.count();
		for (let i = 0; i < count; ++i) {
			const firstItem = await rows.nth(0).textContent();
			return firstItem;
		}
	}

	async getLastElementFromTheList(selector: string) {
		const rows = this.page.locator(selector);
		const count = await rows.count();
		for (let i = 0; i < count; ++i) {
			const lastItem = await rows.nth(i).textContent();
			return lastItem;
		}
	}

	async switchToFrame(selector: string) {
		const frame = await this.page.$(selector);
		const frameContent = await (frame as any).contentFrame();
		if (!frameContent) {
			throw new Error("Frame not found or cannot be accessed.");
		}
		this.page = frameContent;
	}

	async switchToMainFrame() {
		await this.page.waitForLoadState();
		this.page = await this.page.mainFrame();
	}

	async getTexts(selector: string) {
		const elements = await this.getElements(selector);
		const texts = await Promise.all(
			elements.map((element: any) => element.innerText())
		);
		return texts;
	}

	async getElementAttributeValue(selector: string, attribute: string) {
		await this.page.waitForSelector(selector);
		const textValue = await this.page.getAttribute(selector, attribute);
		return textValue;
	}


	async elementIsVisible(selector: string) {
		await this.page.waitForSelector(selector, { state: "visible" });
	}

	async elementIsNotVisible(selector: string) {
		const element = await this.page.$(selector);
		return element === null || !(await (element as any).isVisible());
	}

	async readJsonFile(filePath: string) {
		try {
			const jsonData = fs.readFileSync(filePath, "utf-8");
			const data = JSON.parse(jsonData);
			return data;
		} catch (error) {
			console.error("Error reading JSON file:", error);
			throw error;
		}
	}

	async getCount(selector: string) {
		await this.page.waitForSelector(selector);
		const count = await this.page.$$eval(selector, (elements: any) => elements.length);
		return count;
	}

	async hover(selector: string) {
		await this.page.waitForSelector(selector);
		await this.page.hover(selector)
	}

	async hoverAndClick(selector: string, selector2: string) {
		await this.page.waitForSelector(selector);
		const element = await this.page.$(selector);
		await this.page.hover(element as any);
		await this.page.click((element as any).locator(selector2))

	}

	async checkElement(selector: string) {
		await this.page.check(selector)
	}

	async clickFirstElement(selector: string) {
		await this.page.locator(selector).first().click()
	}

	async hoverFirstElement(selector: string) {
		await this.page.locator(selector).first().hover();

	}


	async getElementByRole(attribute: string, name: string) {
		await this.page.getByRole(`$attribute`, { name: `$name` });
	}



	async getFrame() {
		return this.page.frame(frameLocator)
	}


	async takeScreenShot() {
		return expect(await this.page.screenshot()).toMatchSnapshot(
			'MyScreenShot.png'
		)
	}

	async upLoadFile(selector: string, fileName: string) {
		let filePath = path.resolve('src');

		filePath = path.join(filePath, 'testdata', fileName);

		await this.page.locator(selector).setInputFiles(filePath);

		this.waitForSomeTime(4);
	}

	async scrollIntoViewIfNeed(selector: string) {
		await this.page.locator(selector).scrollIntoViewIfNeeded();
	}

	async scrollbottom() {
		await this.page.evaluate(() => {
			window.scrollTo(0, document.body.scrollHeight);
		});
	}

	getRndInteger(min: number, max: number) {
		const number = Math.floor(Math.random() * (max - min)) + min;
		return number.toString();
	}

}


export default playwrightUtil;
