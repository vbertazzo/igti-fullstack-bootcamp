import React from 'react'
import { GridList } from '@material-ui/core'
import Installment from './components/installment'

export default function Installments({ data }) {
  return (
    <GridList>
      {data.map((installment) => (
        <Installment key={installment.month} details={installment} />
      ))}
    </GridList>
  )
}
