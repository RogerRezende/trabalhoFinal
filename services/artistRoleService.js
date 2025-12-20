const artistRoles = require('../models/artistRoleModel');

function generateId() {
  return [...Array(20)].map(() => Math.random().toString(36)[2]).join('');
}

function createRole({ name, description }) {
  const id = generateId();
  const role = { id, name, description };
  artistRoles.push(role);
  return role;
}

function getAllRoles() {
  return artistRoles;
}

function updateRole(id, { name, description }) {
  const role = artistRoles.find(r => r.id === id);
  if (!role) throw new Error('Função não encontrada');
  if (name) role.name = name;
  if (description) role.description = description;
  return role;
}

function deleteRole(id) {
  const index = artistRoles.findIndex(r => r.id === id);
  if (index === -1) throw new Error('Função não encontrada');
  artistRoles.splice(index, 1);
}

function getRoleById(id) {
  return artistRoles.find(r => r.id === id);
}

function getRoleByName(name) {
  return artistRoles.find(r => r.name === name);
}

module.exports = { createRole, getAllRoles, updateRole, deleteRole, getRoleById, getRoleByName };
