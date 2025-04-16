import 'dotenv/config';
import express from 'express';
import { getBaseCurrency, getCurrencyPairRate } from './getVendorData.js';
import { fetchAndStoreData } from './fetchAndStoreData.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Route to fetch exchange rates for a base currency
app.get('/base-currency', async (req, res) => {
    const baseCurrency = req.query.base || 'EUR'; // Default to EUR if no query param is provided
    try {
        const data = await getBaseCurrency(baseCurrency);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to fetch conversion rate between two currencies
app.get('/currency-pair', async (req, res) => {
    const fromCurrency = req.query.from || 'EUR'; // Default to EUR
    const toCurrency = req.query.to || 'GBP'; // Default to GBP
    try {
        const data = await getCurrencyPairRate(fromCurrency, toCurrency);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to fetch and store data dynamically
app.get('/fetch-and-store', async (req, res) => {
    const baseCurrency = req.query.base;
    const targetCurrency = req.query.target;
    try {
        await fetchAndStoreData(baseCurrency, targetCurrency);
        res.status(200).send('Data fetched and stored successfully!');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


