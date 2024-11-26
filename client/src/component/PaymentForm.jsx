import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import client from "../api/Api";

const PaymentForm = ({ sacola }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const getTotalPrice = async () => {
    let total = 0
    sacola.map((item) => {
      total += item.price
    })
    let str = total.toFixed(2)
    let final = str.replace(".", "")
    setTotalPrice(parseInt(final))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)
    setPaymentError(null)

    const cardElement = elements.getElement(CardElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    })

    if (error) {
      setPaymentError(error.message)
      setProcessing(false)
      return
    }

    const data = {
      payment_method: paymentMethod.id,
      price: totalPrice
    }

    const response = await client.post("/payment/create-payment-intent", data);
    
    const paymentIntentResponse = await response.data

    const { client_secret } = paymentIntentResponse

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(client_secret, {
        payment_method: paymentMethod.id,
      })

    if (confirmError) {
      setPaymentError(confirmError.message)
      setProcessing(false)
      return
    }

    if (paymentIntent.status === "succeeded") {
      setPaymentSuccess(true)
    }
    setProcessing(false)
  };

  useEffect(() => {
    getTotalPrice()
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="card">Cartão de Crédito</label>
        <CardElement id="card" />
      </div>
      {paymentError && <div style={{ color: "red" }}>{paymentError}</div>}
      {paymentSuccess && <div>Pagamento realizado com sucesso!</div>}
      <button type="submit" disabled={processing || !stripe}>
        {processing ? "Processando..." : "Pagar"}
      </button>
    </form>
  );
};

export default PaymentForm;
