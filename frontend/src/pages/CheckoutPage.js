import React, { useState } from 'react';
import { checkout } from '../api/api';

export default function CheckoutPage() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    checkout(form).then((res) => setReceipt(res.data));
  };

  if (receipt) {
    return (
      <div className="receipt">
        <h1>Receipt</h1>
        <div className='receive'>
        <p>This is your Receipt ID</p>
        <p className='special'>{receipt.receiptId}</p>
        <p>You bought products worth</p>
        <p className='special'>₹{receipt.total}</p>
        <p className='special2'>{new Date(receipt.timestamp).toLocaleString()}</p>
        <p className='track'>Your order will soon be shipped.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required/>
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required/>
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
}