import React from 'react'
import Navbar from '../../components/userComponents/Navbar/Navbar'
import PaymentHistory from '../../components/userComponents/PaymentHistory'

function PaymentHistoryPage() {
  return (
    <div>
      <Navbar reservation={"reservaions"} />
      <PaymentHistory/>
    </div>
  )
}

export default PaymentHistoryPage
