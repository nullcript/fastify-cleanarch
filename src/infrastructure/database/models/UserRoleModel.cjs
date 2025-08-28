"use strict";
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserRole extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user'
            });
            this.belongsTo(models.Role, {
                foreignKey: 'role_id',
                as: 'role'
            });
            this.belongsTo(models.User, {
                foreignKey: 'creator_id',
                as: 'creator'
            });
            this.belongsTo(models.User, {
                foreignKey: 'modifier_id',
                as: 'modifier'
            });
            this.belongsTo(models.User, {
                foreignKey: 'remover_id',
                as: 'remover'
            });
            this.belongsTo(models.Tenant, {
                foreignKey: 'tenant_id',
                as: 'tenant'
            });
        }
    }

    UserRole.init({
        user_role_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        role_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'roles',
                key: 'role_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        assign_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        expire_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        creator_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'users',
                key: 'user_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        modifier_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'users',
                key: 'user_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        remover_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'users',
                key: 'user_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        tenant_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'tenants',
                key: 'tenant_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        }
    }, {
        sequelize,
        modelName: 'UserRole',
        tableName: 'user_roles',
        schema: 'security',
        underscored: true,
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        createdAt: 'create_date',
        updatedAt: 'modify_date',
        deletedAt: 'remove_date',
        indexes: [
            {fields: ['user_id']},
            {fields: ['role_id']},
            {fields: ['creator_id']},
            {fields: ['modifier_id']},
            {fields: ['remover_id']},
            {fields: ['tenant_id']}
        ]
    });

    return UserRole;
};