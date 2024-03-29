const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const render = require('./render');

const ignoreDirs = ['node_modules'];

class Runner {
  constructor() {
    this.testFiles = [];
  }

  async runTests() {
    for (const file of this.testFiles) {
      console.log(chalk.gray(`----- ${file.shortName}`));

      global.render = render;

      const beforeEaches = [];
      global.beforeEach = (fn) => {
        beforeEaches.push(fn);
      };

      global.it = async (desc, fn) => {
        try {
          beforeEaches.forEach((fn) => fn());
          await fn();
          console.log(chalk.green(`OK - ${desc}`));
        } catch (err) {
          const message = err.message.replace(/\n/g, '\n\t\t');
          console.log(chalk.red(`NG - ${desc}`));
          console.log(chalk.red('\t', message));
        }
      };

      try {
        require(file.name);
      } catch (err) {
        console.log(chalk.red('NG - Error Loading File', file.name));
        console.log(chalk.red(err));
      }
    }
  }

  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);

    for (const file of files) {
      const filePath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filePath);

      if (stats.isFile() && file.includes('.test.js')) {
        this.testFiles.push({ name: filePath, shortName: file });
      } else if (stats.isDirectory() && !ignoreDirs.includes(file)) {
        const childFiles = await fs.promises.readdir(filePath);
        files.push(...childFiles.map((f) => path.join(file, f)));
      }
    }
  }
}

module.exports = Runner;
