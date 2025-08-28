"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable({
            tableName: 'users',
            schema: 'security'
        }, {
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            user_type: {
                type: Sequelize.STRING(150),
                allowNull: false,
                defaultValue: 'CLIENT'
            },
            username: {
                type: Sequelize.STRING(150),
                allowNull: false,
                unique: true
            },
            first_name: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            last_name: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            display_name: {
                type: Sequelize.STRING(150),
                allowNull: true
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true
            },
            phone_number: {
                type: Sequelize.STRING(50),
                unique: true,
                allowNull: true
            },
            password_hash: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            auth_provider: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: 'LOCAL'
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            is_verified: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            last_login_at: {
                type: Sequelize.DATE,
                allowNull: true
            },
            last_login_ip: {
                type: Sequelize.STRING(45),
                allowNull: true
            },
            last_login_device: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            failed_attempts: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            locked_until: {
                type: Sequelize.DATE,
                allowNull: true
            },
            password_changed_at: {
                type: Sequelize.DATE,
                allowNull: true
            },
            mfa_enabled: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            mfa_secret: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            mfa_backup_codes: {
                type: Sequelize.ARRAY(Sequelize.TEXT),
                allowNull: true
            },
            avatar_url: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            creator_id: {
                type: Sequelize.BIGINT,
                allowNull: true,
                references: {
                    model: {
                        tableName: 'users',
                        schema: 'security'
                    },
                    key: 'user_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },
            create_date: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            modifier_id: {
                type: Sequelize.BIGINT,
                allowNull: true,
                references: {
                    model: {
                        tableName: 'users',
                        schema: 'security'
                    },
                    key: 'user_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },
            modify_date: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            remover_id: {
                type: Sequelize.BIGINT,
                allowNull: true,
                references: {
                    model: {
                        tableName: 'users',
                        schema: 'security'
                    },
                    key: 'user_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },
            remove_date: {
                type: Sequelize.DATE,
                allowNull: true
            },
            tenant_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'tenants',
                        schema: 'security'
                    },
                    key: 'tenant_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            }
        });

        // Indexes
        await queryInterface.addIndex({
            tableName: 'users',
            schema: 'security'
        }, ['username'], {unique: true});
        await queryInterface.addIndex({
            tableName: 'users',
            schema: 'security'
        }, ['email'], {unique: true});
        await queryInterface.addIndex({
            tableName: 'users',
            schema: 'security'
        }, ['phone_number'], {unique: true});
        await queryInterface.addIndex({
            tableName: 'users',
            schema: 'security'
        }, ['creator_id']);
        await queryInterface.addIndex({
            tableName: 'users',
            schema: 'security'
        }, ['modifier_id']);
        await queryInterface.addIndex({
            tableName: 'users',
            schema: 'security'
        }, ['remover_id']);
        await queryInterface.addIndex({
            tableName: 'users',
            schema: 'security'
        }, ['tenant_id']);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable({
            tableName: 'users',
            schema: 'security'
        });
    }
};
