export const info = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Ropa",
            version: "1.0.0",
            description: "Tecnologias utilizadas: Nodejs, MongoDB, Express"
        },
        servers: [
            {
                url: "http://localhost:8080/api"
            }
        ]
    },
    apis: ["/.src/docs/*.yml"]
};