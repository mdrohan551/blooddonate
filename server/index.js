
const chalk = require('chalk');

const app = require('./app');
const config = require('./src/config/config');
const port = config.PORT;
const fig = require('./src/figlet')

app.listen(port, () => {
    console.log(chalk.blue(`SERVER RUNING  ON PORT ${chalk.red(port)}`));
});
