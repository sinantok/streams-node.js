const fs = require('fs');
const file = 'old.txt';

const reading = fs.createReadStream(file);
const writing = fs.createWriteStream('new.txt');
let progress = 0;

fs.stat(file, (err,data) => {

    const total = data.size;
    console.log(total);

    reading.on('data', (chunk) => {

        progress += chunk.length;
        //console.log(chunk.length);
        console.log(Math.round ((100 * progress)/total) + '%');
    });

    reading.pipe(writing);
    writing.on('finish', () => {
        console.log('file written');
    });
});