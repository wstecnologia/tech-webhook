import axios from "axios"
import dotenv from "dotenv"
import express, { Request, Response } from "express"
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "../Swagger"
dotenv.config()

const app = express()

app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const PORT = process.env.PORT || 3001
const host = process.env.HOST

app.post("/webhook/payment", async (req: Request, res: Response) => {
  const { paymentId } = req.body

  const result = {
    paymentId: paymentId,
    status: "Completed",
  }

  try {
    const options = {
      method: "PUT",
      url: host,
      params: result,
    }

    await axios.request(options)

    res.status(200).json("Pagamento recebido e status enviado")
  } catch (error) {
    res.status(500).json("Erro ao processar pagamento")
  }
})

app.listen(PORT, () => {
  console.log(`Servidor webhook rodando na porta ${PORT}`)
})

export default app
