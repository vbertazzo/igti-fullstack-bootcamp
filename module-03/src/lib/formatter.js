const locale = 'pt-BR'
const options = { style: 'currency', currency: 'BRL' }

function formatCurrency(value) {
  return new Intl.NumberFormat(locale, options).format(value)
}

export { formatCurrency }
