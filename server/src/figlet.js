const figlet = require('figlet');
const chalk = require('chalk');
figlet(`Rohan and Azim ` , function (err, data) {
    if (err) {
        console.log(data);
        console.dir(err);
        return;
    }
    console.log(chalk.bgBlack(chalk.greenBright(data))); // স্টাইলিশ সবুজ টেক্সট
});

