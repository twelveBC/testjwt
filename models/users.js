'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static #encrypt = (password) => bcrypt.hashSync(password,10)
    static register = ({ username, password }) => {
      const encryptedPassword = this.#encrypt(password)
      return this.create({ username, password: encryptedPassword })
    }
    checkPassword = password => bcrypt.compareSync(password, this.password)
    generateToken = () => {
      const payload = {
        id : this.id,
        username : this.username
      }
      const rahasia = 'ini rahasia gaboleh disebar-sebar'
      const token = jwt.sign(payload,rahasia)
      return token
    }
    static authenticate = async ({ username, password }) => {
      try {
        const user = await this.findOne({ where: { username }})
        if (!user) return Promise.reject("user not found")
        
        const isPasswordValid = user.checkPassword(password)
        if (!isPasswordValid) return Promise.reject("wrong password")
        
        return Promise.resolve(user)
      } catch (error) {
        return Promise.reject(err)
      }
    }
  }
  Users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};