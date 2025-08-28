"use strict";
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RolePermission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Role, {
                foreignKey: 'role_id',
                as: 'role'
            });
            this.belongsTo(models.Permission, {
                foreignKey: 'permission_id',
                as: 'permission'
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

    RolePermission.init({
        role_permission_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
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
        permission_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'permissions',
                key: 'permission_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
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
        modelName: 'RolePermission',
        tableName: 'role_permissions',
        schema: 'security',
        underscored: true,
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        createdAt: 'create_date',
        updatedAt: 'modify_date',
        deletedAt: 'remove_date',
        indexes: [
            {fields: ['role_id']},
            {fields: ['permission_id']},
            {fields: ['creator_id']},
            {fields: ['modifier_id']},
            {fields: ['remover_id']},
            {fields: ['tenant_id']}
        ]
    });

    return RolePermission;
};