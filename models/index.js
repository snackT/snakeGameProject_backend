import Sequelize from 'sequelize';
import user from './user.js';
import config from "../config/config.json" assert {type: "json"};

const env = 'development';
const db = {};

const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);

db.User = user;

Object.keys(db).forEach(modelName => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
