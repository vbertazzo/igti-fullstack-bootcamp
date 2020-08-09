import React, { useState, useEffect } from 'react'
import { Container, Typography, makeStyles } from '@material-ui/core'

import { Form, Installments } from './components'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    marginTop: theme.spacing(4),
    textAlign: 'center',
  },
}))

export default function App() {
  const [initialAmount, setInitialAmount] = useState(100)
  const [interestRate, setInterestRate] = useState(1)
  const [timeSpan, setTimeSpan] = useState(1)
  const [installments, setInstallments] = useState([])

  const classes = useStyles()
  const data = { initialAmount, interestRate, timeSpan }

  useEffect(() => {
    let data = []
    let amount = +initialAmount

    console.log(amount)

    for (let i = 1; i <= timeSpan; i++) {
      const total = amount + amount * (interestRate / 100)
      const difference = total - initialAmount
      const percentage = (difference / initialAmount) * 100
      data = [
        ...data,
        {
          month: i,
          total: total,
          difference: difference,
          percentage: percentage.toFixed(2),
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
    <Container component="main" maxWidth="md">
      <Typography className={classes.title} component="h1">
        Compound Interest
      </Typography>
      <Form onChange={handleFormChange} data={data} />
      <Installments data={installments} />
    </Container>
  )
}
