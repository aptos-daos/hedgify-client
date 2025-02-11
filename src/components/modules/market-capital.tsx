"use client";

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useMarketCapital } from '@/store/dao'
import { Skeleton } from "@/components/ui/skeleton"

const MarketCapital = () => {
  const {isLoading, marketCapital} = useMarketCapital()
  return (
    <Card className='space-y-2'>
      <CardHeader className="pb-0">
        <CardTitle className="text-white">Market Capital</CardTitle>
      </CardHeader>
      <CardContent className="text-primary text-3xl">
        {isLoading ? (
          <Skeleton className="h-8 w-[100px]" />
        ) : (
          `$ ${marketCapital}`
        )}
      </CardContent>
    </Card>
  )
}

export default MarketCapital