import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import client from "../api/Api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function paymentSuccess() {
  const { id } = useContext(AuthContext)
  const [hasCreated, setHasCreated] = useState(false)
  const location = useLocation()
  const { totalPriceFront, sacola, address } = location.state

  const createSale = async () => {
    if (!hasCreated) {
      console.log("Enviando para o backend...");
      await client.post(`/payment/confirm-payment/${id}`, {
        totalPriceFront,
        sacola
      })
      setHasCreated(true)
    }
  }

  useEffect(() => {
    createSale()
  }, [])

  return (
    <div className="flex justify-center mt-4">
      <div className="border border-solid rounded-md shadow-md p-5 w-[500px]">
        <h1 className="flex justify-center text-2xl font-bold text-green-500">
          Pagamento Confirmado!
        </h1>
        <p className="text-gray-700 mt-4">Obrigado pela sua compra.</p>
        <p className="text-gray-700 mt-4">
          Total pago: R$ {totalPriceFront}
        </p>
        <p className="text-gray-700 mt-4">
          Endereço de entrega: {address}
        </p>
        <div className="mt-4">
          <h2 className="text-xl font-bold">Itens Comprados:</h2>
          <ul className="list-disc list-inside">
            {sacola.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item.name} - R$ {item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center mt-2">
          <Button href="/main" variant="contained">
              Página Inicial
          </Button>
        </div>
      </div>
    </div>
  );
}
