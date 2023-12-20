'use client'
import { useState } from 'react'

const Payment = () => {
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }

  const handleClick = async (e: any) => {
    e.preventDefault()
    if (email.length && phone.length) {
      setIsProcessing(true)
      try {
        const response = await fetch(
          'https://paystack-payment-backend.onrender.com/api/accept-payment',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, phone })
          }
        )
        if(!response.ok){
           throw new Error('Failed to get data')
        }
        const result = await response.json()
        window.location.href = result.data.authorization_url
      } catch (error) {
        throw new Error('Failed to get data')
      }
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <form
        className='bg-white p-8 shadow-md rounded-lg max-w-lg w-full'
        onSubmit={handleClick}
      >
        <h2 className='text-2xl text-center text-black font-semibold mb-4'>
          Payment Form
        </h2>
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Email Address
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='w-full text-slate-500 border border-gray-300 p-2 rounded-md'
            placeholder='example@example.com'
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='phone'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Phone Number
          </label>
          <input
            type='tel'
            id='phone'
            name='phone'
            value={phone}
            className='w-full border text-slate-500 border-gray-300 p-2 rounded-md'
            placeholder='123-456-7890'
            onChange={handleChangePhone}
          />
        </div>
        <div className='flex justify-center items-center'>
          <button
            type='submit'
            onClick={handleClick}
            className='bg-blue-500 w-full text-white p-2 rounded-md hover:bg-blue-600'
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing' : 'Pay'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Payment
