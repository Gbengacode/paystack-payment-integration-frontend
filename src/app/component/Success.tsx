// SuccessPage.js
'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const SuccessPage = () => {
  const router = useRouter()
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      router.push('/')
    }, 3000)
    return () => clearTimeout(redirectTimeout)
  }, [router])
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='p-8 bg-white shadow-md rounded-md'>
        <h1 className='text-3xl font-bold mb-4 text-green-600'>
          Payment Successful!
        </h1>
        <p className='text-gray-700'>
          Thank you for your payment. Your transaction was successful.
        </p>
      </div>
    </div>
  )
}

export default SuccessPage
