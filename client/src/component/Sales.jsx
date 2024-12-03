import { useEffect, useState } from "react"
import client from "../api/Api"

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

export default function Sales({ userid }) {
  const [sales, setSales] = useState([])

  const getSales = async () => {
    try {
      const res = await client.get(`/payment/${userid}`)
      if (res.data) {
        setSales(res.data.vendas)
      } else {
        setSales([])
      }     
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getSales()
  }, [])

  return (
    <div className="w-[50%] p-4">
      <div className="font-semibold">Últimas Compras</div>
      <div className="my-4">
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="bg-zinc-200">
              <TableRow>
                <TableCell>
                  <b>Data</b>
                </TableCell>
                <TableCell>
                  <b>Valor</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((sale) => {
                const date = new Date(sale.createdAt)
                const formattedDate = date.toLocaleString("pt-BR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false
                });
                
                return (
                  <TableRow
                    key={sale.id}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {formattedDate}
                    </TableCell>
                    <TableCell>
                      R${sale.totalPrice}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}