"use strict";

module.exports = function(sequelize, DataTypes) {
    var Photos = sequelize.define('photos', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        likes: {
            type: DataTypes.INTEGER
        }
    });
    
    //sequelize.sync({force:true});

    return Photos;
}