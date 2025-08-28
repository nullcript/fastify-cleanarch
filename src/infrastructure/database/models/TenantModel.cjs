"use strict";
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tenant extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.User, {
                foreignKey: 'tenant_id',
                as: 'users'
            });
            this.hasMany(models.UserDetail, {
                foreignKey: 'tenant_id',
                as: 'user_details'
            });
            this.hasMany(models.Role, {
                foreignKey: 'tenant_id',
                as: 'roles'
            });
            this.hasMany(models.UserRole, {
                foreignKey: 'tenant_id',
                as: 'user_roles'
            });
            this.hasMany(models.RolePermission, {
                foreignKey: 'tenant_id',
                as: 'role_permissions'
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
        }
    }

    Tenant.init({
        tenant_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        tenant_code: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        domain: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
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
        }
    }, {
        sequelize,
        modelName: 'Tenant',
        tableName: 'tenants',
        schema: 'security',
        underscored: true,
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        createdAt: 'create_date',
        updatedAt: 'modify_date',
        deletedAt: 'remove_date',
        indexes: [
            {
                unique: true,
                fields: ['tenant_code']
            },
            {
                unique: true,
                fields: ['title']
            },
            {
                unique: true,
                fields: ['domain']
            },
            {fields: ['is_active']},
            {fields: ['creator_id']},
            {fields: ['modifier_id']},
            {fields: ['remover_id']}
        ]
    });

    return Tenant;
};
