let express = require('express');
let cors = require('cors');
const { resolve } = require('path');

const app = express();
const port = 3000;
app.use(cors({ origin: 'https://bd1-stocks.vercel.app/' }));

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.send('Welcome to Stock portfolio analysis API!');
});

function calculateReturnValue(boughtAt, marketPrice, quantity) {
  return Math.abs(boughtAt - marketPrice) * quantity;
}
app.get('/calculate-returns', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let marketPrice = parseFloat(req.query.marketPrice);
  let quantity = parseFloat(req.query.quantity);
  res.send(calculateReturnValue(boughtAt, marketPrice, quantity).toString());
});

function calculateTotalReturnValue(stock1, stock2, stock3, stock4) {
  return stock1 + stock2 + stock3 + stock4;
}
app.get('/total-returns', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);
  res.send(
    calculateTotalReturnValue(stock1, stock2, stock3, stock4).toString()
  );
});

function calculateTotalReturnPercentage(boughtAt, returns) {
  return (returns / boughtAt) * 100;
}
app.get('/calculate-return-percentage', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let returns = parseFloat(req.query.returns);
  res.send(calculateTotalReturnPercentage(boughtAt, returns).toString());
});

function calculateAllTotalReturnPercentage(stock1, stock2, stock3, stock4) {
  return stock1 + stock2 + stock3 + stock4;
}
app.get('/total-return-percentage', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);

  res.send(
    calculateAllTotalReturnPercentage(stock1, stock2, stock3, stock4).toString()
  );
});

function checkStockStatus(returnPercentage) {
  if (returnPercentage > 0) {
    return 'profit';
  } else {
    return 'loss';
  }
}
app.get('/status', (req, res) => {
  let returnPercentage = req.query.returnPercentage;
  res.send(checkStockStatus(returnPercentage));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
