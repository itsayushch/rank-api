const fetch = require('node-fetch');

exports.wakeUp = () => {
    setTimeout(async () => {
        try {
            return await fetch('https://level-api.herokuapp.com').then(() => process.stdout.write('App persisted for another 25 mins.'));
        } catch (err) {
            return console.log('Error fetching the page.');
        } finally {
            this.wakeUp();
        }
    }, 1.5e+6);
};