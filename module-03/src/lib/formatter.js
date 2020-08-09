const locale = 'pt-BR'
const currencyOptions = { style: 'currency', currency: 'BRL' }
const percentageOptions = {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

function formatCurrency(value) {
  return new Intl.NumberFormat(locale, currencyOptions).format(value)
}

function formatPercentage(value) {
  return new Intl.NumberFormat(locale, percentageOptions).format(value)
}

export { formatCurrency, formatPercentage }
