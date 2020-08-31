module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        passWordHash: {
            type: DataTypes.STRING,
            allowNull: false
        }
       
    }) 
    return User;
}