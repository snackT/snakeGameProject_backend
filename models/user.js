import Sequelize from 'sequelize';
const { Model, STRING } = Sequelize;

export default class User extends Model {
  static init(sequelize) {
    return super.init({
      // id가 기본적으로 들어있다.
      email: {
        type: STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: false, // 필수
        unique: true, // 고유한 값
      },
      nickname: {
        type: STRING(30),
        allowNull: false, // 필수
      },
      password: {
        type: STRING(100),
        allowNull: false, // 필수
      },
    }, {
      modelName: 'User',
      tableName: 'users',
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
      sequelize,
    });
  }
  static associate(db) {
    //TODO: Have to add friends

    // db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
    // db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
  }
};
