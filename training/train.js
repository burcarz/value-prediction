const brain = require('brain');
const Fighter = require('../lib/Fighter');

const net = new brain.NeuralNetwork();


net.train([
    { input:[0,0], output:{zero:1} },
    { input:[1,0], output:{one:1} },
    { input:[0,1], output:{one:1} },
    { input:[1,1], output:{zero:1} },
])

result = net.run([1,0]);

console.log(result);

module.exports = brain;