"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint({
            schema: 'security',
            tableName: 'tenants'
        }, {
            fields: ['modifier_id'],
            type: 'foreign key',
            name: 'fk_tenants_users_modifierid',
            references: {
                table: {
                    schema: 'security',
                    tableName: 'users'
                },
                field: 'user_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint({
            schema: 'security',
            tableName: 'tenants'
        }, 'fk_tenants_users_modifierid');
    }
};
