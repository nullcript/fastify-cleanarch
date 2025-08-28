"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable({
            tableName: 'role_permissions',
            schema: 'security'
        }, {
            role_permission_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            role_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'roles',
                        schema: 'security'
                    },
                    key: 'role_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },
            permission_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'permissions',
                        schema: 'security'
                    },
                    key: 'permission_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
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
            tableName: 'role_permissions',
            schema: 'security'
        }, ['role_id']);
        await queryInterface.addIndex({
            tableName: 'role_permissions',
            schema: 'security'
        }, ['permission_id']);
        await queryInterface.addIndex({
            tableName: 'role_permissions',
            schema: 'security'
        }, ['creator_id']);
        await queryInterface.addIndex({
            tableName: 'role_permissions',
            schema: 'security'
        }, ['modifier_id']);
        await queryInterface.addIndex({
            tableName: 'role_permissions',
            schema: 'security'
        }, ['remover_id']);
        await queryInterface.addIndex({
            tableName: 'role_permissions',
            schema: 'security'
        }, ['tenant_id']);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable({
            tableName: 'role_permissions',
            schema: 'security'
        });
    }
};