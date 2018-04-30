const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/plantr', {logging: false});

const Gardener = db.define('gardeners', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 99
        }
    }
})

const Plot = db.define('plots', {
    size: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    shaded: {
        type: Sequelize.BOOLEAN
    }
})

const Vegetable = db.define('vegetables', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING
    },
    plantedOn: {
        type: Sequelize.DATE
    }
})

Plot.belongsTo(Gardener);
Gardener.hasOne(Plot);

Gardener.belongsTo(Vegetable, {as: 'favoriteVegetable'});

Vegetable.belongsToMany(Plot, {through: 'plotVeg'});
Plot.belongsToMany(Vegetable, {through: 'plotVeg'});

module.exports = {db, Gardener, Plot, Vegetable};