import { browser } from "k6/browser";
import { fillForm, submitForm } from "./fromActions.js";
import { logStep, getTimestampedFilename, validations, logStepReport, createSummary } from "./logger.js";
import { options } from "./config.js";
import { Counter } from 'k6/metrics';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';


export let formSubmissions = new Counter('form_submissions');
const data1 = JSON.parse(open('./demoQA.json'));
export {
    options
}

export default async function () {
    const page = await browser.newPage()
    const startTime = Date.now();
    logStep('INFO', 'Navigating to form page...');
    await page.goto('https://demoqa.com/automation-practice-form');
    logStep('STEP1', 'Filling form data....');
    await fillForm(page, data1);
    formSubmissions.add(1);
    logStep('STEP2', 'Submitting form....');
    await submitForm(page);
    logStepReport("FormCompaltion", startTime)
    logStep('Validation', 'Validation after Submission....');
    validations(page, data1)
    await page.close();
}

export function handleSummary(data) {
    createSummary(data)
} 
