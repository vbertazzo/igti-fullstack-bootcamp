import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { TrendingUp, TrendingDown } from '@material-ui/icons'
import { formatCurrency, formatPercentage } from '../../../../lib/formatter'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    boxShadow: theme.shadows[3],
    height: '100%',
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: 'white',
  },
  content: {
    flex: '1 0 auto',
    margin: theme.spacing(0, 4),
    '& > :not(:last-child)': {
      margin: theme.spacing(1, 0),
    },
    paddingLeft: 0,
  },
  title: {
    color: 'text.secondary',
  },
  total: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  positive: {
    color: '#16a085',
  },
  negative: {
    color: '#c0392b',
  },
  bgPositive: {
    backgroundColor: '#16a085',
  },
  bgNegative: {
    backgroundColor: '#c0392b',
  },
}))

export default function Installment({
  details: { month, total, difference, percentage },
}) {
  const [isProfit, setIsProfit] = useState(true)

  const classes = useStyles()
  const formattedTotal = formatCurrency(+total)
  const formattedDifference = formatCurrency(+difference)
  const formattedPercentage = formatPercentage(+percentage)

  useEffect(() => {
    setIsProfit(+difference >= 0)
  }, [difference])

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.root} variant="outlined">
        <div
          className={`${classes.avatarContainer} ${
            isProfit ? classes.bgPositive : classes.bgNegative
          }`}
        >
          <Avatar
            className={`${classes.avatar} ${
              isProfit ? classes.positive : classes.negative
            }`}
          >
            {isProfit ? <TrendingUp /> : <TrendingDown />}
          </Avatar>
        </div>
        <Divider orientation="vertical" flexItem />
        <CardContent className={classes.content}>
          <Typography className={classes.title} component="h2" gutterBottom>
            {`Month ${month}`}
          </Typography>
          <Divider variant="middle" />
          <Typography
            className={`${classes.total} ${
              isProfit ? classes.positive : classes.negative
            }`}
          >
            {formattedTotal}
          </Typography>
          <Typography
            className={isProfit ? classes.positive : classes.negative}
          >
            {`${isProfit ? '+' : ''}${formattedDifference}`}
          </Typography>
          <Typography>{formattedPercentage}</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
