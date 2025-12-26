import { useState } from 'react';
import { createBooking } from './services/bookingService';

function BookingForm({ serviceType, serviceName, price }) {
  const [date, setDate] = useState('');
  const [totalAmount, setTotalAmount] = useState(price);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const booking = await createBooking({ serviceType, serviceName, date, totalAmount });
      console.log('Booking created:', booking);
      alert('Booking created successfully!');
    } catch (err) {
      console.error(err);
      alert('Booking failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={date} onChange={e=>setDate(e.target.value)} required />
      <button type="submit">Book {serviceName}</button>
    </form>
  );
}

export default BookingForm;