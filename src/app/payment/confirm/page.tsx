'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import SuccessPage from '@/app/component/Success'

const ConfirmPage = () => {
  const [showSucces, setShowSuccess] = useState(false)
  const searchParams = useSearchParams()
  const referenceId = searchParams.get('trxref')
  const getPaymentStatus = async () => {
    try {
      const response = await fetch(
        `https://paystack-payment-backend.onrender.com/api/verify-transaction/${referenceId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (!response.ok) {
        throw new Error('fail to fetch data')
      }

      const {
        data: { data }
      } = await response.json()

      if (data.status === 'success') {
        setShowSuccess(true)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    if (referenceId !== "") {
      getPaymentStatus()
    }
  }, [getPaymentStatus, referenceId])
  return <div>{showSucces ? <SuccessPage /> : null}</div>
}

export default ConfirmPage
