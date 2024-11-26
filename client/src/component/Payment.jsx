import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import {
  Button,
  Divider
} from "@mui/material"
import { useLocation } from "react-router-dom";

const stripePublicKey = loadStripe(import.meta.env.VITE_PUBLIC_KEY);

const Payment = () => {
  const location = useLocation();
  const sacola = location.state.products;

  return (
    <div className="flex justify-center mt-4">
        <div className="border border-solid rounded-md p-5 w-[1000px]">
        <div className="mb-2 w-full flex justify-center font-semibold">
          Pagamento com Stripe
        </div>
        <Divider variant="middle" component="div" />
        <div className="my-2"></div>
          <Elements stripe={stripePublicKey}>
            <PaymentForm sacola={sacola} />
          </Elements>
        </div>
    </div>
  );
};

export default Payment;
