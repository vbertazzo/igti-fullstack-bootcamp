import React, { useState, useEffect } from 'react'
import { Divider, makeStyles, Paper, Typography } from '@material-ui/core'
import { formatCurrency, formatPercentage } from '../../lib/formatter'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: theme.spacing(0, 0, 6),
    padding: theme.spacing(3),
    backgroundColor: '#ecf0f1',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      backgroundColor: '#ecf0f1',
    },
  },
  summaryLeft: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 0, 2),
    },
  },
  title: {
    textAlign: 'center',
    marginBottom: '0.4rem',
  },
  total: {
    textAlign: 'center',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
  summaryMiddle: {
    justifyContent: 'space-between',
    padding: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 0, 2),
    },
  },
  regular: {
    marginRight: theme.spacing(1),
  },
  regularBottom: {
    textAlign: 'center',
  },
  percentage: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
  summaryRight: {
    padding: theme.spacing(3),
    minWidth: '10rem',
  },
  difference: {
    textAlign: 'center',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  positive: {
    color: '#16a085',
  },
  negative: {
    color: '#c0392b',
  },
}))

export default function Summary({ data, limit }) {
  const [isProfit, setIsProfit] = useState(true)

  useEffect(() => {
    const difference = data[0].difference
    setIsProfit(+difference >= 0)
  }, [data])

  const classes = useStyles()
  const installments = data.filter((installment) => installment.month <= limit)
  const installment = installments.slice(-1)[0]

  return (
    <Paper className={classes.root} elevation={0}>
      <Paper className={classes.summaryLeft} elevation={2}>
        <Typography className={classes.title} component="h2">
          In {limit} {+limit === 1 ? 'month' : 'months'}, you will have
        </Typography>
        <Divider variant="middle" />
        <Typography
          className={`${classes.total} ${
            isProfit ? classes.positive : classes.negative
          }`}
          component="h3"
        >
          {formatCurrency(installment.total)}
        </Typography>
      </Paper>

      <Paper className={classes.summaryMiddle} elevation={2}>
        <div className={classes.flexRow}>
          <Typography className={classes.regular} component="h2">
            That is
          </Typography>
          <Typography
            className={`${classes.percentage} ${
              isProfit ? classes.positive : classes.negative
            }`}
            component="h3"
          >
            {formatPercentage(installment.percentage)}
          </Typography>
        </div>
        <Typography className={classes.regularBottom}>
          of your initial investment
        </Typography>
      </Paper>

      <Paper className={classes.summaryRight} elevation={2}>
        <Typography className={classes.title} component="h2">
          And a {isProfit ? 'profit' : 'loss'} of
        </Typography>
        <Divider variant="middle" />
        <Typography
          className={`${classes.difference} ${
            isProfit ? classes.positive : classes.negative
          }`}
          component="h3"
        >
          {formatCurrency(installment.difference)}
        </Typography>
      </Paper>
    </Paper>
  )
}
