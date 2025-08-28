"use strict";
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user'
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

    UserDetail.init({
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'user_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        national_code: {
            type: DataTypes.STRING(20),
            allowNull: true,
            unique: true
        },
        gender: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        marital_status: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        province: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        job: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        website: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        social_links: {
            type: DataTypes.JSONB,
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
        modelName: 'UserDetail',
        tableName: 'user_details',
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
                fields: ['national_code']
            },
            {fields: ['gender']},
            {fields: ['marital_status']},
            {fields: ['tenant_id']},
            {fields: ['creator_id']},
            {fields: ['modifier_id']},
            {fields: ['remover_id']}
        ]
    });

    return UserDetail;
};