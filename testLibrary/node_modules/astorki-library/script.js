const data = require('./data');

function getRandomName() {
    return data.names[Math.floor(Math.random() * data.names.length)];
}

function getRandomDate() {
    return data.dates[Math.floor(Math.random() * data.dates.length)];
}

function getRandomAdress() {
    return data.adresses[Math.floor(Math.random() * data.adresses.length)];
}

module.exports = {getRandomAdress, getRandomDate, getRandomName};