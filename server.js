// Comentarios pra me lembrar de como usar

//basicamnete ele ta epgando todos os dados da api openweathermap


const express = require("express");
require("dotenv").config();
const cors = require("cors");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 8080;

// Habilitar CORS para permitir chamadas do frontend, pelas minhas pesquisas isso funciona
app.use(cors());

app.get("/", (req, res) => {
  res.send("API de clima funcionando!");
});

app.get("/clima/:cidade", async (req, res) => {
  const cidade = encodeURIComponent(req.params.cidade);
  const apiKey = process.env.API_KEY;  // isso pega do .env

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      return res.status(404).json({
        erro: "Cidade não encontrada",
        detalhes: data,
      });
    }

    //isso ele da esses resultados
    const resultado = {
      cidade: data.name,
      temperatura: data.main.temp,
      minima: data.main.temp_min,
      maxima: data.main.temp_max,
      descricao: data.weather[0].description,
      humidade: data.main.humidity,
    };

    res.json(resultado);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar clima",
      motivo: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
