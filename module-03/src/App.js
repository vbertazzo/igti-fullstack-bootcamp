import React, { useState, useEffect } from 'react'
import { Container, Typography, makeStyles } from '@material-ui/core'

import { Form, Installments, Summary } from './components'
import { getInputValidation } from './lib/input-validator'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    marginTop: theme.spacing(4),
    textAlign: 'center',
    color: '#16a085',

    [theme.breakpoints.up('xs')]: {
      fontSize: '2rem',
    },
  },
}))

export default function App() {
  const [initialAmount, setInitialAmount] = useState('100')
  const [interestRate, setInterestRate] = useState('1')
  const [timeSpan, setTimeSpan] = useState('1')
  const [installments, setInstallments] = useState([
    {
      total: 101,
      difference: 1,
      percentage: 0.01,
      month: 1,
    },
  ])

  const classes = useStyles()
  const data = { initialAmount, interestRate, timeSpan }

  useEffect(() => {
    if (!initialAmount || !interestRate || !timeSpan) {
      return
    }

    let data = []
    let amount = +initialAmount
    const { maxValue } = getInputValidation('length')

    for (let i = 1; i <= maxValue; i++) {
      const total = amount + amount * (interestRate / 100)
      const difference = total - initialAmount
      const percentage = difference / initialAmount

      data = [
        ...data,
        {
          month: i,
          total: total,
          difference: difference,
          percentage: percentage,
        },
      ]
      amount = total
    }

    setInstallments(data)
  }, [initialAmount, interestRate, timeSpan])

  const handleFormChange = (type, value) => {
    const types = {
      'initial-investment': setInitialAmount,
      'interest-rate': setInterestRate,
      length: setTimeSpan,
    }

    if (types[type]) {
      types[type](value)
    }
  }

  return (
    <Container component="main" maxWidth="lg">
      <Typography className={classes.title} component="h1">
        Compound Interest
      </Typography>
      <Form onChange={handleFormChange} data={data} />
      <Summary data={installments} limit={timeSpan} />
      <Installments data={installments} limit={timeSpan} />
    </Container>
  )
}
