import React from 'react'
import {
  Container,
  FormControl,
  InputAdornment,
  makeStyles,
  TextField,
} from '@material-ui/core'
import { getInputValidation } from '../../lib/input-validator'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    margin: theme.spacing(6, 0),
    [theme.breakpoints.down('sm')]: {
      width: '60%',
      justifyContent: 'center',
      flexDirection: 'column',
      margin: theme.spacing(4, 0, 0),
    },
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  input: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(3),
    },
    '& label.Mui-focused': {
      color: '#16a085',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#16a085',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#16a085',
      },
    },
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
    <Container className={classes.root} maxWidth="md">
      <form className={classes.form} autoComplete="off">
        <FormControl>
          <TextField
            className={classes.input}
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
            className={classes.input}
            id="interest-rate"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            helperText="Your estimated monthly interest rate"
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
            className={classes.input}
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
    </Container>
  )
}
