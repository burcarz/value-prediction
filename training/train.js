const brain = require('brain.js');

const net = new brain.recurrent.LSTM();

net.train([
    { input: 'I am so happy', output: 'happy' },
    { input: 'I am so sad', output: 'sad' },
    { input: 'worst day ever', output: 'sad' },
    { input: 'best day ever', output: 'happy' }
])

const output = net.run('I am so happy');

console.log(output)
