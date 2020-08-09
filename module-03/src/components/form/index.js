import React from 'react'
import {
  FormControl,
  InputAdornment,
  makeStyles,
  TextField,
} from '@material-ui/core'
import { getInputValidation } from '../../lib/input-validator'

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: theme.spacing(4),
  },
}))

export default function Form({ onChange, data }) {
  const classes = useStyles()
  const { initialAmount, interestRate, timeSpan } = data

  const handleInputChange = ({ target }) => {
    const { id, value } = target

    const { minValue, maxValue } = getInputValidation(id)

    if (value < minValue || value > maxValue) {
      return
    }

    onChange(id, value)
  }

  return (
    <form className={classes.form} autoComplete="off">
      <FormControl>
        <TextField
          id="initial-investment"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
          helperText="Amount of money to invest"
          label="Initial Investment"
          onChange={handleInputChange}
          required
          type="number"
          value={initialAmount}
          variant="outlined"
        />
      </FormControl>
      <FormControl>
        <TextField
          id="interest-rate"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          helperText="Your estimated annual interest rate"
          label="Interest Rate"
          onChange={handleInputChange}
          required
          type="number"
          value={interestRate}
          variant="outlined"
        />
      </FormControl>
      <FormControl>
        <TextField
          id="length"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">months</InputAdornment>
            ),
          }}
          helperText="Length of time in months"
          label="Length of Time"
          onChange={handleInputChange}
          required
          type="number"
          value={timeSpan}
          variant="outlined"
        />
      </FormControl>
    </form>
  )
}
