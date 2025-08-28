"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable({
            tableName: 'tenants',
            schema: 'security'
        }, {
            tenant_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            tenant_code: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true
            },
            title: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true
            },
            domain: {
                type: Sequelize.STRING(255),
                allowNull: true,
                unique: true
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            creator_id: {
                type: Sequelize.BIGINT,
                allowNull: true
            },
            create_date: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            modifier_id: {
                type: Sequelize.BIGINT,
                allowNull: true
            },
            modify_date: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            remover_id: {
                type: Sequelize.BIGINT,
                allowNull: true
            },
            remove_date: {
                type: Sequelize.DATE,
                allowNull: true
            }
        });

        // Indexes
        await queryInterface.addIndex({
            tableName: 'tenants',
            schema: 'security'
        }, ['tenant_code'], {unique: true});
        await queryInterface.addIndex({
            tableName: 'tenants',
            schema: 'security'
        }, ['title'], {unique: true});
        await queryInterface.addIndex({
            tableName: 'tenants',
            schema: 'security'
        }, ['domain'], {unique: true});
        await queryInterface.addIndex({
            tableName: 'tenants',
            schema: 'security'
        }, ['is_active']);
        await queryInterface.addIndex({
            tableName: 'tenants',
            schema: 'security'
        }, ['creator_id']);
        await queryInterface.addIndex({
            tableName: 'tenants',
            schema: 'security'
        }, ['modifier_id']);
        await queryInterface.addIndex({
            tableName: 'tenants',
            schema: 'security'
        }, ['remover_id']);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable({
            tableName: 'tenants',
            schema: 'security'
        });
    }
};
