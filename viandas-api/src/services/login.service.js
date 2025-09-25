const { getUserByUsername } = require('../models/bd');
// si usás bcrypt para comparar passwords:
// const bcrypt = require('bcrypt');

async function doLogin({ username, password }) {
  const user = await getUserByUsername(username);
  if (!user) return null;

  // Comparación simple (cambiá por bcrypt si ya guardás hash):
  if (user.password !== password) {
    return null;
  }

  return { id: user.id, username: user.username, email: user.email }; 
}

module.exports = { doLogin };