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

const allVeg = Promise.all([tomato, broccoli, arugula]);

const plot1 = jenny.then(gardener => {
    return Plot.create({
        size: 100,
        shaded: false,
        gardenerId: gardener.id
    })
})

// Talked to Gabe and he said we could also do what you suggested - created variables then assigning them inside the 'then'
let createdPlot, veggie, etc

const plot2 = chloe.then(gardener => {
    return Plot.create({
        size: 99,
        shaded: true,
        gardenerId: gardener.id
    })
}).then(plot => {
    createdPlot = plot
    return allVeg.then(result => {
        return plot.addVegetables(result);
    })
})


// const vegetables = Vegetable.findAll();


// BULLSHIT
// const fillGardenerRow = Promise.all([chloe, jenny]);
// const fillVegRow = Promise.all([tomato, broccoli, arugula])
// .then(([tomato, broccoli, arugula]) => {
//     return fillGardenerRow;
// })
// .then(result => console.log(result[1]));