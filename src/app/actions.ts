'use server'

export const paymentAction = async (formData: FormData) => {
  
  const email = formData.get('email')
  const phone = formData.get('phone')
  const response = await fetch(
    "https://paystack-payment-backend.onrender.com/api/accept-payment",
    {
      method: 'POST',
      headers: {
        
        'Content-Type': 'application/json',
       
      },
      body: JSON.stringify({ email, phone })
    }
  )
  const result = await response.json()
  console.log(result)
  return result
}
