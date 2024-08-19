const express = require('express');
const app = module.exports = express()
const { upload } = require('./routers');

const PORT = process.env.PORT || 5000

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.use('/admin/files', upload);

app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
})