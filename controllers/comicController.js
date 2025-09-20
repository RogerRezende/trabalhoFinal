const express = require('express');
const router = express.Router();
const comicService = require('../services/comicService');
const userService = require('../services/userService');

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token não informado' });
  const token = authHeader.split(' ')[1];
  const user = userService.verifyToken(token);
  if (!user) return res.status(401).json({ message: 'Token inválido' });
  req.user = user;
  next();
}

router.post('/register', authenticate, (req, res) => {
  const { name, publisher, licensor, genre, price } = req.body;
  if (!name || !publisher || !licensor || !genre || !price) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }
  try {
    const comic = comicService.registerComic({ name, publisher, licensor, genre, price });
    res.status(201).json(comic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', (req, res) => {
  const comics = comicService.getComics();
  res.json(comics);
});

module.exports = router;
