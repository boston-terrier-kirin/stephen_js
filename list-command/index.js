const fs = require('fs');
const util = require('util');

// #2：util.promisify
// const lstat = util.promisify(fs.lstat);

// #3：promises
const lstat = fs.promises.lstat;

fs.readdir(process.cwd(), async (err, filenames) => {
  if (err) {
    console.log(err);
    return;
  }

  const statPromises = filenames.map((filename) => lstat(filename));
  const allStats = await Promise.all(statPromises);

  for (const stats of allStats) {
    const index = allStats.indexOf(stats);
    console.log(filenames[index], stats.isFile());
  }

  // 順番にlstatしていくので性能が出ない
  //   for (const filename of filenames) {
  //     try {
  //       const stats = await lstat(filename);
  //       console.log(filename, stats.isFile());
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
});

// #1：自分でpromisify
// const lstat = (filename) => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(stats);
//     });
//   });
// };
