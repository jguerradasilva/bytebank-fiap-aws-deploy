import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Lê os dados do arquivo JSON
function getData() {
  const dataPath = path.join(__dirname, 'json-server', 'db.json');
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData);
}

// Salva os dados no arquivo JSON
function saveData(data) {
  const dataPath = path.join(__dirname, 'json-server', 'db.json');
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// Routes
app.get('/extrato', (req, res) => {
  const data = getData();
  res.json(data.extrato);
});

app.post('/extrato', (req, res) => {
  const data = getData();
  const newItem = {
    id: Math.random().toString(36).substr(2, 9),
    ...req.body
  };
  data.extrato.push(newItem);
  saveData(data);
  res.json(data.extrato);
});

app.patch('/extrato/:id', (req, res) => {
  const data = getData();
  const id = req.params.id;
  const itemIndex = data.extrato.findIndex(item => item.id === id);
  
  if (itemIndex !== -1) {
    data.extrato[itemIndex] = { ...data.extrato[itemIndex], ...req.body };
    saveData(data);
  }
  
  res.json(data.extrato);
});

app.delete('/extrato/:id', (req, res) => {
  const data = getData();
  const id = req.params.id;
  data.extrato = data.extrato.filter(item => item.id !== id);
  saveData(data);
  res.json(data.extrato);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
