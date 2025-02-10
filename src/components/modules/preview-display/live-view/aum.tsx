import { useHoldings } from '@/hooks/use-holdings'
import { DaoData } from '@/validation/dao.validation'
import React from 'react'

const AUM = (dao: DaoData) => {
    const {}  = useHoldings(dao)
  return (
    <div>AUM</div>
  )
}

export default AUM