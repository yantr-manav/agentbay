# Stripe Payment Integration Setup

## Overview
The payment system has been updated with the following changes:

### ✅ Completed Changes

1. **Currency Updates**:
   - Changed from ETH to USD/INR pricing
   - Basic Plan: $9.99/month (₹799/month)
   - Premium Plan: $29.99/month (₹2,499/month) 
   - Enterprise Plan: $99.99/month (₹8,499/month)

2. **Stripe Integration**:
   - Added Stripe payment processing
   - Secure card payment forms
   - Payment intent creation and confirmation
   - Error handling and success notifications

3. **Updated Components**:
   - Payment page with currency selector (USD/INR)
   - StripePaymentForm component with card elements
   - Updated UploadAgent pricing to USD
   - Updated Wallet transaction history to USD

## Setup Instructions

### 1. Get Stripe API Keys
1. Create a Stripe account at https://stripe.com
2. Go to Developers > API Keys
3. Copy your Publishable Key (starts with `pk_test_` for test mode)

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env`
2. Replace the placeholder with your actual Stripe publishable key:
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

### 3. Backend Setup (Required for Production)
For production, you'll need to create backend endpoints:

```javascript
// Example backend endpoint for creating payment intents
app.post('/api/create-payment-intent', async (req, res) => {
  const { amount, currency, planId } = req.body;
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency: currency,
    metadata: { planId }
  });
  
  res.json({ client_secret: paymentIntent.client_secret });
});
```

### 4. Test the Integration
1. Start the development server: `npm run dev`
2. Navigate to the Payment page
3. Select a plan and currency (USD/INR)
4. Choose "Credit/Debit Card" payment method
5. Use Stripe test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

## Features

### Multi-Currency Support
- USD ($) and INR (₹) pricing
- Automatic currency conversion in UI
- Reasonable and affordable pricing tiers

### Payment Methods
1. **Stripe (Primary)**: Secure card payments
2. **Cryptocurrency**: ETH, BTC, USDC, USDT
3. **PayPal**: PayPal account payments
4. **Bank Transfer**: Direct bank transfers

### Security Features
- PCI-compliant payment processing via Stripe
- Secure card element with built-in validation
- No sensitive card data stored locally
- HTTPS required for production

## File Structure
```
src/
├── components/
│   └── StripePaymentForm.tsx    # Stripe payment form component
├── lib/
│   ├── stripe.ts                # Stripe configuration
│   └── payment-api.ts           # Payment API simulation
└── pages/
    └── Payment.tsx              # Main payment page
```

## Next Steps
1. Set up your Stripe account and get API keys
2. Configure webhook endpoints for payment confirmations
3. Implement subscription management
4. Add invoice generation
5. Set up customer portal for subscription management

## Support
For Stripe-specific issues, refer to:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe React Integration](https://stripe.com/docs/stripe-js/react)