const fs = require('fs');
const { v4: uuidv4 } = require("uuid");

const dataPath = './data/transfers.json';

const saveData = (data) => {
  const stringifyData = JSON.stringify(data, null, 2)
  fs.writeFileSync(dataPath, stringifyData)
}

const getData = () => {
  const jsonData = fs.readFileSync(dataPath)
  return JSON.parse(jsonData)
}

exports.findAll = (req, res) => {
  res.send(getData());
};

exports.create = (req, res) => {
  const transfers = getData();

  req.body.id = uuidv4();

  transfers.push(req.body);
 
  try {
    saveData(transfers);
    res.send(req.body);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

exports.findOne = (req, res) => {
  const transfers = getData();
  const filteredTransfers = transfers.filter((t) => t.id === req.params.id);

  res.send(filteredTransfers);
};

exports.update = (req, res) => {
  const transfers = getData();
  const index = transfers.findIndex((t) => t.id === req.params.id);

  transfers.splice(index, 1, req.body);

  try {
    saveData(transfers);
    res.send(req.body);
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};

exports.delete = (req, res) => {
  const transfers = getData();
  const transferId = req.params.id;
  const filteredTransfers = transfers.filter((t) => t.id !== transferId);

  try {
    saveData(filteredTransfers);
    res.status(200);
    res.send(`transfer with id ${transferId} has been deleted`)
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
};
