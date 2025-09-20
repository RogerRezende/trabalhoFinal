const users = require('../models/userModel');
const jwt = require('jsonwebtoken');
const SECRET = 'supersecret';

function registerUser({ username, password }) {
  if (users.find(u => u.username === username)) {
    throw new Error('Usuário já existe');
  }
  const user = { username, password };
  users.push(user);
  return user;
}

function loginUser({ username, password }) {
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    throw new Error('Credenciais inválidas');
  }
  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  return token;
}

function getUser(username) {
  return users.find(u => u.username === username);
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

module.exports = { registerUser, loginUser, getUser, verifyToken };
