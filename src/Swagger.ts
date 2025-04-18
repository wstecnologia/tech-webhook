import swaggerJsdoc from "swagger-jsdoc"

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
          summary: "Update Payment Status",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    paymentId: {
                      type: "string",
                      description: "Unique identifier of the payment",
                      example: "8a108dc0-dd5c-4559-8cd4-682b74ed4fd9",
                    },
                    status: {
                      type: "string",
                      description: "New status of the payment",
                      example: "Completed",
                      enum: ["Pending", "Completed", "Failed", "Refunded"], // Ajuste conforme os valores permitidos
                    },
                  },
                  required: ["paymentId", "status"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Payment status updated successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      paymentId: { type: "string" },
                      status: { type: "string" },
                    },
                  },
                },
              },
            },
            400: {
              description: "Invalid request (e.g., missing or invalid fields)",
            },
            404: {
              description: "Payment not found",
            },
            500: {
              description: "Internal server error",
            },
          },
        },
      },
    },
  },
  apis: [], // Adicione caminhos para arquivos de rotas, se necessário (ex.: ["./routes/*.ts"])
}

const swaggerSpec = swaggerJsdoc(options)
export default swaggerSpec