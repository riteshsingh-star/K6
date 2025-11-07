export const options = {
    scenarios: {
        demo_QA: {
            executor: 'shared-iterations',
            vus: 1,
            iterations: 5,
            maxDuration: '1m',
            options: {
                browser: {
                    type: 'chromium',
                    headless: false
                }
            }
        }
    }
}