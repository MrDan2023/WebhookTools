const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/login-success", (req, res) => {
    const timestamp = new Date().toLocaleString();

    console.log(`Login success!`);

    const webhookUrl = "https://discord.com/api/webhooks/1154491766813241465/mjM4QyFxfeQGeTjwKX7KjZWhorjln6Jt3Eujf_7oEmtZfn9VKnMNnHuFocQMYTA9NOgb";
    const data = {
        content: `Login success!`
    };

    axios.post(webhookUrl, data)
        .then(response => {
            if (response.status === 204) {
                res.status(204).send();
            } else {
                res.status(500).send("Failed to send data to webhook");
            }
        })
        .catch(error => {
            console.error("Error sending data to webhook:", error);
            res.status(500).send("Error sending data to webhook");
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
