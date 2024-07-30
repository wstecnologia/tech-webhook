import axios from "axios"
import dotenv from "dotenv"
import express, { Request, Response } from "express"
dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3001
const host = process.env.HOST

app.post("/webhook/payment", async (req: Request, res: Response) => {
  const { paymentId } = req.body

  const result = {
    paymentId: paymentId,
    status: "Completed",
  }
  try {
    await axios.put(`${host}`, result)
    res.status(200).send("Pagamento recebido e status enviado")
  } catch (error) {
    res.status(500).send("Erro ao processar pagamento")
  }
})

app.listen(PORT, () => {
  console.log(`Servidor webhook rodando na porta ${PORT}`)
})

export default app
