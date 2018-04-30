const { db, Gardener, Plot, Vegetable } = require('./models');

db.sync()
.then(() => {
    console.log('Database connected!');
    // db.close()
})
.catch(err => {
    // db.close();
    console.log(err)
})
.finally(()=> db.close());

const tomato = Vegetable.create({
    name: 'tomato',
    color: 'red',
    plantedOn: new Date('2018-01-01')
})

const broccoli = Vegetable.create({
    name: 'broccoli',
    color: 'green',
    plantedOn: new Date('2018-01-02')
})

const arugula = Vegetable.create({
    name: 'arugula',
    color: 'green',
    plantedOn: new Date('2018-01-03')
})

const chloe = broccoli.then(veg => {
    return Gardener.create({
        name: 'Chloe',
        age: 21,
        favoriteVegetableId: veg.id
    })
})

const jenny = arugula.then(veg => {
    return Gardener.create({
        name: 'Jenny',
        age: 21,
        favoriteVegetableId: veg.id
    })
})

const plot1 = jenny.then(gardener => {
    return Plot.create({
        size: 100,
        shaded: false,
        gardenerId: gardener.id
    })
})
// .then(plot => plot.addVegetables([broccoli]));

const plot2 = chloe.then(gardener => {
    return Plot.create({
        size: 99,
        shaded: true,
        gardenerId: gardener.id
    })
})

const vegetables = Vegetable.findAll();
console.log(vegetables);
// const PlotVeg = db.models('plotVeg');


// BULLSHIT
// const fillGardenerRow = Promise.all([chloe, jenny]);
// const fillVegRow = Promise.all([tomato, broccoli, arugula])
// .then(([tomato, broccoli, arugula]) => {
//     return fillGardenerRow;
// })
// .then(result => console.log(result[1]));