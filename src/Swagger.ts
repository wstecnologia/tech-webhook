import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Techchalleger - Documentation WebHook",
      version: "1.0.0",
    },
    paths: {
      "/webhook/payment": {
        put: {
          tags: ["Payment"],
          summary: "Atualiza o status do pagamento",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    numberPayment: {
                      type: "number",
                      description: "Identificador único do pagamento",
                      example: "123456",
                    },
                    status: {
                      type: "string",
                      description: "Status do pagamento",
                      enum: ["Pending", "Approved", "Canceled", "Reembolsado", "Failed"],
                      example: "Approved",
                    },
                  },
                  required: ["numberPayment", "status"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Sucesso no processamento do pagamento",
            },
            400: {
              description: "Requisição inválida",
            },
            500: {
              description: "Erro interno no servidor",
            },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
