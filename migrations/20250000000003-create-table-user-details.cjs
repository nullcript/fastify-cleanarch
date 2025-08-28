"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            {
                schema: 'security',
                tableName: 'user_details'
            },
            {
                user_id: {
                    type: Sequelize.BIGINT,
                    allowNull: false,
                    primaryKey: true,
                    references: {
                        model: {
                            tableName: 'users',
                            schema: 'security'
                        },
                        key: 'user_id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                national_code: {
                    type: Sequelize.STRING(20),
                    allowNull: true
                },
                gender: {
                    type: Sequelize.INTEGER,
                    allowNull: true
                },
                birth_date: {
                    type: Sequelize.DATEONLY,
                    allowNull: true
                },
                marital_status: {
                    type: Sequelize.INTEGER,
                    allowNull: true
                },
                country: {
                    type: Sequelize.STRING(100),
                    allowNull: true
                },
                province: {
                    type: Sequelize.STRING(100),
                    allowNull: true
                },
                city: {
                    type: Sequelize.STRING(100),
                    allowNull: true
                },
                address: {
                    type: Sequelize.TEXT,
                    allowNull: true
                },
                job: {
                    type: Sequelize.STRING(100),
                    allowNull: true
                },
                description: {
                    type: Sequelize.TEXT,
                    allowNull: true
                },
                website: {
                    type: Sequelize.STRING(255),
                    allowNull: true
                },
                social_links: {
                    type: Sequelize.JSONB,
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
            }
        );

        // Indexes
        await queryInterface.addIndex({
            tableName: 'user_details',
            schema: 'security'
        }, ['national_code'], {unique: true});
        await queryInterface.addIndex({
            tableName: 'user_details',
            schema: 'security'
        }, ['gender']);
        await queryInterface.addIndex({
            tableName: 'user_details',
            schema: 'security'
        }, ['marital_status']);
        await queryInterface.addIndex({
            tableName: 'user_details',
            schema: 'security'
        }, ['creator_id']);
        await queryInterface.addIndex({
            tableName: 'user_details',
            schema: 'security'
        }, ['modifier_id']);
        await queryInterface.addIndex({
            tableName: 'user_details',
            schema: 'security'
        }, ['remover_id']);
        await queryInterface.addIndex({
            tableName: 'user_details',
            schema: 'security'
        }, ['tenant_id']);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable({
            schema: 'security',
            tableName: 'user_details'
        });
    }
};
