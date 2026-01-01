const express = require('express');
const Stripe = require('stripe');
const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/checkout', async (req, res) => {
  const { item, amount } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: item },
          unit_amount: amount * 100
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: `${process.env.BASE_URL}/?success=payment`,
      cancel_url: `${process.env.BASE_URL}/?error=payment`
    });

    res.json({ url: session.url });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;