const express = require('express');
const app = express();
const routes = require('./routes');
app.use(express.json())
app.use('/api',routes);

app.listen(7000, () => {
    console.log("masuk");
})