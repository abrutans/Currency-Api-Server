// *Helper function depends on the endpoint which API will be called.
async function fetchFromApi(endpoint) {
    const url = `${process.env.VENDOR_ADDRESS}${endpoint}`
    console.log(`Fetching ${url}`)
    const response = await fetch(url)
    if(!response.ok){
        throw new Error(`API call to ${url}  failed with status ${response.status}:${response.statusText}`)
    }
    return await response.json();
}

//* Standard API endpoint is the easiest and fastest way to access our exchange rate data.
// * Fetch exchange rates for a specific base currency
export async function getBaseCurrency (base = "EUR") {
    const endpoint = `latest/${base}`
    return await fetchFromApi(endpoint)

}
//* Pair conversion rates
//*Function to get the conversion rate between two currencies
//* default call is from euro to GreatBritainPound
export async function getCurrencyPairRate(fromCurr="EUR",toCurr ="GBP") {
    const endpoint = `pair/${fromCurr}/${toCurr}`;
    return await fetchFromApi(endpoint)
}


