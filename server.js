const express = require("express");
const app = express();
const port = 3000;
const TelegramBot = require("node-telegram-bot-api");
const bodyParser = require('body-parser');
const token = "6039394312:AAH5qg3swfUy1YDOS7WRXjSZCJLPGcV3zY8";

const bot = new TelegramBot(token, { polling: false });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const channelId = "@loft_semey";

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

app.post("/telegram", (req, res) => {
  const data = req.body;
  console.log(data);
  const productStrings = data.products.map(product => `${product.name} - ${product.count} штук`);
  const resultProduct = productStrings.join(", ");
  const phone = data.phone;
  const address = data.address;
  const price = data.price;
  const delevery = data.delevery;
  const totalPrice = +price + +delevery;
  const message = "Продукты: " + resultProduct + "\n"+
  "Телефон: " + phone + "\n" +
  "Адрес: " + address + "\n" +
  "Стоимость: " + price + "\n" +
  "Доставка: " + delevery + "\n"+
  "Общая стоимость - " + totalPrice;
  bot.sendMessage(channelId, message);
  res.send('Данные получены');
});
