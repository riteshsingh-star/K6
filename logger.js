import { check } from "k6";
import { Trend } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export let stepDuration = new Trend('step_duration');

// helpers/logger.js
export function logStep(step, message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${step}] ${message}`);
}

export function logStepReport(step, startTime) {
    const duration = new Date().getTime() - startTime;
    console.log(`[${step}] completed in ${duration}ms`);
    stepDuration.add(duration);
}

export function getTimestampedFilename(baseName, ext = 'png') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `${baseName}_${timestamp}.${ext}`;
}

export async function validations(page, data) {
    const firstName = await page.locator("//td[normalize-space()='Demo QA']").textContent();
    check(page, {
        'form submitted': () =>
            page.locator('#example-modal-sizes-title-lg').isVisible(),
        'FirstName Validation': () => firstName == `${data.firstName} ${data.lastName}`
    });
}

export function createSummary(data) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return {
        [`demo_${timestamp}.json`]: JSON.stringify(data, null, 2),
        [`demo_${timestamp}.html`]: textSummary(data)
    };
}
