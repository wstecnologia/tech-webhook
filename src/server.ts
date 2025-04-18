import axios from "axios"
import dotenv from "dotenv"
import express, { Request, Response } from "express"
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./Swagger"

dotenv.config()

const app = express()
app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const PORT = process.env.PORT || 3001
const host = process.env.HOST

app.put("/webhook/payment", async (req: Request, res: Response) => {
  const { paymentId, status } = req.body 

  const result = {
    paymentId: paymentId,
    status: status || "Completed",
  }

  try {
    const options = {
      method: "PUT",
      url: `${host}/payment-status`, 
      data: result, 
    }

    await axios.request(options)

    res.status(200).json("Pagamento recebido e status enviado")
  } catch (error) {
    console.error("Erro ao chamar lanchonetews:", error) 
    res.status(500).json(`Erro ao processar pagamento: ${error}`)
  }
})

app.listen(PORT, () => {
  console.log(`Servidor webhook rodando na porta ${PORT}`)
})

export default app