const comics = require('../models/comicModel');

function registerComic({ name, publisher, licensor, genre, price }) {
  if (comics.find(c => c.name === name)) {
    throw new Error('Revista já registrada');
  }
  const comic = { name, publisher, licensor, genre, price };
  comics.push(comic);
  return comic;
}

function getComics() {
  return comics;
}

module.exports = { registerComic, getComics };
