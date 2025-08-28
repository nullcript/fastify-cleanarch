"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable({
            tableName: 'user_roles',
            schema: 'security'
        }, {
            user_role_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
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
            assign_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_DATE')
            },
            expire_date: {
                type: Sequelize.DATEONLY,
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
            tableName: 'user_roles',
            schema: 'security'
        }, ['user_id']);
        await queryInterface.addIndex({
            tableName: 'user_roles',
            schema: 'security'
        }, ['role_id']);
        await queryInterface.addIndex({
            tableName: 'user_roles',
            schema: 'security'
        }, ['creator_id']);
        await queryInterface.addIndex({
            tableName: 'user_roles',
            schema: 'security'
        }, ['modifier_id']);
        await queryInterface.addIndex({
            tableName: 'user_roles',
            schema: 'security'
        }, ['remover_id']);
        await queryInterface.addIndex({
            tableName: 'user_roles',
            schema: 'security'
        }, ['tenant_id']);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable({
            tableName: 'user_roles',
            schema: 'security'
        });
    }
};