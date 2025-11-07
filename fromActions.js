export async function fillForm(page, data) {

    await page.locator('#firstName').type(data.firstName);
    const lastNameInput = page.locator('#lastName');
    await lastNameInput.type(data.lastName);
    await page.locator('#userEmail').type(data.email);
    const genderRadio = page.locator(`//label[normalize-space()='${data.gender}']`);
    await genderRadio.click();
    await page.locator('#userNumber').type(data.phone);
    // await page.locator('#dateOfBirthInput').type(data.date);
    // page.waitForTimeout(20000);
    await page.waitForSelector(`//label[normalize-space()='${data.hobbies}']`, { state: 'visible', timeout: 5000 });
    await page.check(`//label[normalize-space()='${data.hobbies}']`);

    // await page.waitForFunction(() => document.readyState === 'complete');
    // await page.click("//label[normalize-space()='Sports']");

    await page.locator('#currentAddress').type(data.address);
    await page.locator('#state').click();
    await page.locator(`//div[contains(text(),'${data.state}')]`).click();
    await page.locator('#city').click();
    await page.locator(`//div[contains(text(),'${data.city}')]`).click();
    /*  await page.locator('#dateOfBirthInput').clear()
     await page.locator('#dateOfBirthInput').type(data.date);
     page.waitForTimeout(20000); */


}

export async function submitForm(page) {
    await page.locator('#submit').click();

}