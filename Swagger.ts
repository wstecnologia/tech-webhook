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
        post: {
          tags: ["Payment"],
          summary: "Update Status Payment",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    paymentId: {
                      type: "string",
                      required: true,
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Success",
            },
            201: {
              description: "Created",
            },
            400: {
              description: "Invalid Request",
            },
            401: {
              description: "Invalid Access",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
    },
  },

  apis: [],
}

const swaggerSpec = swaggerJsdoc(options)
export default swaggerSpec
