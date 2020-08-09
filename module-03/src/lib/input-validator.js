const INPUT_VALIDATOR = [
  {
    type: 'initial-investment',
    minValue: 1,
    maxValue: 1000000,
  },
  {
    type: 'interest-rate',
    minValue: -30,
    maxValue: 30,
  },
  {
    type: 'length',
    minValue: 1,
    maxValue: 1200,
  },
]

const getInputValidation = (inputType) => {
  const input = INPUT_VALIDATOR.find((element) => element.type === inputType)

  const { minValue, maxValue } = input

  return {
    minValue,
    maxValue,
  }
}

export { getInputValidation }
