const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger-api.json');
const app = express();

app.use(express.json());

// API Documentation
app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(process.env.PORT || 2000, () => {
    console.log(`http://localhost:${process.env.PORT || 2000}`)
})