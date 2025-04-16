import { mkdir, writeFile } from 'fs/promises';
import { getCurrencyPairRate, getBaseCurrency } from './getVendorData.js';

async function fetchAndStoreData(baseCurrency, targetCurrency) {
    try {
        // Ensure the ./data/ folder exists
        await mkdir('./data', { recursive: true });

        let data;
        let fileName;

        if (baseCurrency && targetCurrency) {
            // Fetch conversion rate between two currencies
            data = await getCurrencyPairRate(baseCurrency, targetCurrency);
            fileName = `./data/conversionRate-${baseCurrency}-to-${targetCurrency}.json`;
            console.log(`Conversion Rate (${baseCurrency} to ${targetCurrency}):`, data);
        } else {
            // Fetch exchange rates for a base currency
            const base = baseCurrency || "EUR"; // Default to "EUR" if no baseCurrency is provided
            data = await getBaseCurrency(base);
            fileName = `./data/baseRates-${base}.json`;
            console.log(`Base Rates (${base}):`, data);
        }

        // Save the data to a file
        await writeFile(fileName, JSON.stringify(data, null, 2));
        console.log(`Data saved successfully to ${fileName}!`);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

export { fetchAndStoreData };
