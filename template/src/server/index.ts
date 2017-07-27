import * as http from 'http';
import * as chalk from 'chalk';
import * as path from 'path';

import App from './App';

console.log(`${chalk.gray('Server|')} ${chalk.yellow('Starting...')}`);

const port = process.env.PORT || 3000;

App.set('port', port);
const server = http.createServer(App);

server.listen(port, () => {
  console.log(`${chalk.gray('Server|')} ${chalk.green('Server started! Listening on port ')}${chalk.cyan(port)}`);
});
