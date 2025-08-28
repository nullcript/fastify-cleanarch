"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable({
            tableName: 'permissions',
            schema: 'security'
        }, {
            permission_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            permission_code: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true
            },
            title: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            end_point: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true
            },
            type: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            priority: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            }
        });

        // Indexes
        await queryInterface.addIndex({
            tableName: 'permissions',
            schema: 'security'
        }, ['permission_code'], {unique: true});
        await queryInterface.addIndex({
            tableName: 'permissions',
            schema: 'security'
        }, ['end_point'], {unique: true});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable({
            tableName: 'permissions',
            schema: 'security'
        });
    }
};