import { defineStore } from "pinia"

const currencies = {
	"usd": {convertion_key: 'mxn', key: 'mxn2usd', symbol: "$"},
	"mxn": {convertion_key: 'usd', key: 'usd2mxn', symbol: "$"}
}

const baseCurrency = "mxn";
export const useCurrentConfigStore = defineStore('currentConfig', {
    state: () => ({
        baseCurrency: baseCurrency,
        selectedCurrency: localStorage.getItem('selected_currency') || baseCurrency,
        currencies: currencies,
        currenciesConversion: localStorage.getItem('exchange_currencies') || {},
    }),
    actions: {
        setSelectedCurrency(currency){
            this.selectedCurrency = currency
            if(currency){
                localStorage.setItem('selected_currency', currency)
            }else{
                localStorage.setItem('selected_currency', baseCurrency)
            }
        },
        setExchanceCurrencies(currencies){
            this.currenciesConversion = currencies
            if(currencies){
                localStorage.setItem('exchange_currencies', currencies)
            }else{
                localStorage.removeItem('exchange_currencies')
            }
        }
    }
})