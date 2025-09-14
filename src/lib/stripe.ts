import { loadStripe } from "@stripe/stripe-js";

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_..."
);

export default stripePromise;

export const STRIPE_CONFIG = {
  publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_...",
  currency: "usd",
  appearance: {
    theme: "night" as const,
    variables: {
      colorPrimary: "#00d4ff",
      colorBackground: "#0a0a0a",
      colorText: "#ffffff",
      colorDanger: "#ff6b6b",
      fontFamily: "system-ui, sans-serif",
      spacingUnit: "4px",
      borderRadius: "8px",
    },
  },
};
