"use strict";
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.RolePermission, {
                foreignKey: 'permission_id',
                as: 'role_permissions'
            });
        }
    }

    Permission.init({
        permission_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        permission_code: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        end_point: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        type: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Permission',
        tableName: 'permissions',
        schema: 'security',
        underscored: true,
        timestamps: false,
        paranoid: false,
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['permission_code']
            },
            {
                unique: true,
                fields: ['end_point']
            }
        ]
    });

    return Permission;
};
