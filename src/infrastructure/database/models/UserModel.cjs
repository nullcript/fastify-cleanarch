"use strict";
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasOne(models.UserDetail, {
                foreignKey: 'user_id',
                as: 'user_detail'
            });
            this.hasMany(models.UserRole, {
                foreignKey: 'user_id',
                as: 'user_roles'
            });
            this.hasMany(models.User, {
                foreignKey: 'creator_id',
                as: 'created_users'
            });
            this.hasMany(models.User, {
                foreignKey: 'modifier_id',
                as: 'modified_users'
            });
            this.hasMany(models.User, {
                foreignKey: 'remover_id',
                as: 'removed_users'
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

    User.init({
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_type: {
            type: DataTypes.STRING(150),
            allowNull: false,
            defaultValue: 'CLIENT'
        },
        username: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        display_name: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {isEmail: true}
        },
        phone_number: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: true
        },
        password_hash: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        auth_provider: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'LOCAL'
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        last_login_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        last_login_ip: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        last_login_device: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        failed_attempts: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        locked_until: {
            type: DataTypes.DATE,
            allowNull: true
        },
        password_changed_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        mfa_enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        mfa_secret: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        mfa_backup_codes: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true
        },
        avatar_url: {
            type: DataTypes.TEXT,
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
        modelName: 'User',
        tableName: 'users',
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
                fields: ['username']
            },
            {
                unique: true,
                fields: ['email']
            },
            {
                unique: true,
                fields: ['phone_number']
            },
            {fields: ['is_active']},
            {fields: ['creator_id']},
            {fields: ['modifier_id']},
            {fields: ['remover_id']},
            {fields: ['tenant_id']}
        ]
    });

    return User;
};
