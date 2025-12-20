const express = require('express');
const router = express.Router();
const artistRoleService = require('../services/artistRoleService');

router.post('/', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: 'Nome e descrição são obrigatórios' });
  }
  const role = artistRoleService.createRole({ name, description });
  res.status(201).json(role);
});

router.get('/', (req, res) => {
  const roles = artistRoleService.getAllRoles();
  res.json(roles);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const role = artistRoleService.updateRole(id, { name, description });
    res.json(role);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  try {
    artistRoleService.deleteRole(id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get('/id/:id', (req, res) => {
  const { id } = req.params;
  const role = artistRoleService.getRoleById(id);
  if (!role) {
    return res.status(404).json({ message: 'Função não encontrada' });
  }
  res.json(role);
});

router.get('/name/:name', (req, res) => {
  const { name } = req.params;
  const role = artistRoleService.getRoleByName(name);
  if (!role) {
    return res.status(404).json({ message: 'Função não encontrada' });
  }
  res.json(role);
});

module.exports = router;
