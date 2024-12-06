import axios from "axios";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./Swagger";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3001;
const EXTERNAL_ENDPOINT = process.env.EXTERNAL_ENDPOINT || "http://localhost:3000";

app.put("/webhook/payment", async (req: Request, res: Response) => {
  const { numberPayment } = req.body;

  if (!numberPayment) {
    return res.status(400).json({ error: "Campo 'numberPayment' é obrigatório." });
  }

  const result = {
    numberPayment: numberPayment,
    status: "Approved",
  };

  try {
    // Envia os dados para o endpoint externo
    const response = await axios.put(`${EXTERNAL_ENDPOINT}/payment-confirm`, result);

    res.status(200).json({
      message: "Pagamento aprovado e enviado ao endpoint externo.",
      externalResponse: response.data,
    });
  } catch (error: any) {
    console.error("Erro ao enviar para o endpoint externo:", error.message);
    res.status(500).json({ error: "Erro ao processar o pagamento.", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor webhook rodando na porta ${PORT}`);
});

export default app;
