import React from 'react'
import Navbar from '../../components/userComponents/Navbar/Navbar'
import PaymentHistory from '../../components/hostComponents/PaymentHistory/PaymentHistory'

function PaymentHistoryPage() {
  return (
    <div>
      <Navbar reservation={"reservaions"} />
      <PaymentHistory/>
    </div>
  )
}

export default PaymentHistoryPage
