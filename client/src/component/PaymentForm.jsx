import { useEffect, useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import client from "../api/Api";

export default function PaymentForm ({ sacola }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { address } = useContext(AuthContext);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceFront, setTotalPriceFront] = useState(0);

  const getTotalPrice = async () => {
    let total = 0
    sacola.map((item) => {
      total += item.price
    })
    let str = total.toFixed(2);
    setTotalPriceFront(str);
    let final = str.replace(".", "");
    setTotalPrice(parseInt(final));
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
    
    const paymentIntentResponse = await response.data;

    if (paymentIntentResponse.error) {
      setPaymentError(paymentIntentResponse.error);
    } else {
      setPaymentSuccess(true);
      setTimeout(() => {
        navigate("/payment/success", {
          state: {
            totalPriceFront,
            sacola,
            address
          }
        });
      })
    }
  
    setProcessing(false);
  };

  useEffect(() => {
    getTotalPrice()
  }, [])

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-[600px] mx-auto">
      <div className="mb-4">
        <div>
          <b>Total:</b> R${totalPriceFront}
        </div>
        <div>
          <b>Local de Entrega:</b> {address}
        </div>
        <label htmlFor="card" className="block text-sm font-medium text-gray-700">
          Cartão de Crédito
        </label>
        <div className="border border-gray-300 rounded-md p-3 mt-1 bg-gray-50">
          <CardElement id="card" className="w-full" />
        </div>
      </div>
      {paymentError && <div className="text-red-500 text-sm mb-4">{paymentError}</div>}
      {paymentSuccess && <div className="text-green-500 text-sm mb-4">Pagamento realizado com sucesso!</div>}
      <button
        type="submit"
        disabled={processing || !stripe}
        className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-md ${
          processing ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {processing ? "Processando..." : "Pagar"}
      </button>
    </form>
  );
};
