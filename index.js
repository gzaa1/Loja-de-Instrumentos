import express from 'express';
import Marca from './models/Marca.js';
import Instrumento from './models/Instrumento.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index');
});

// Abrir formulário
app.get('/instrumento/add', (req, res) => {
    res.render('instrumento/add');
});

// Salvar instrumento
app.post('/instrumento/add/ok', async (req, res) => {
    const { nome, fabricante, preco, tipo } = req.body;

    await Instrumento.create({
        nome,
        fabricante,
        preco,
        tipo
    });

    res.render('instrumento/addok', { nome });
});

// Listar instrumentos
app.get('/instrumento/lst', async (req, res) => {
    const instrumentos = await Instrumento.find();

    res.render('instrumento/lst', { instrumentos });
});

// Pesquisar instrumentos
app.post('/instrumento/lst', async (req, res) => {
    const { pesquisar } = req.body;

    const instrumentos = await Instrumento.find({
        nome: new RegExp(pesquisar, 'i')
    });

    res.render('instrumento/lst', { instrumentos });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});