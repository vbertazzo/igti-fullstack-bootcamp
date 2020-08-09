import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import Installment from './components/installment'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(8, 0),

    [theme.breakpoints.up('xs')]: {
      margin: theme.spacing(3, 0),
    },
  },
}))

export default function Installments({ data, limit }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={3}>
        {data
          .filter((installment) => installment.month <= limit)
          .map((installment) => (
            <Installment key={installment.month} details={installment} />
          ))}
      </Grid>
    </div>
  )
}
