import React, { useState } from 'react'
import { Container, Typography, makeStyles } from '@material-ui/core'

import Form from './components/form'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    marginTop: theme.spacing(4),
    textAlign: 'center',
  },
}))

export default function App() {
  const [initialAmount, setInitialAmount] = useState(1)
  const [interestRate, setInterestRate] = useState(1)
  const [timeSpan, setTimeSpan] = useState(1)

  const classes = useStyles()
  const data = { initialAmount, interestRate, timeSpan }

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
    </Container>
  )
}
