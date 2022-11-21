//readFile
const { readFile } = require('fs').promises;
//express
const express = require('express');

const app = express();

async function test() {
    const file = await readFile('hello.txt', 'utf8');
    console.log(file);
}


app.get('/', (request, response) => {
    readFile('hello.txt', 'utf8'), (err, html) => {
        if (err) {
            response.status(500).send('sorry, error');
        }
        response.send(html);
    };
})

app.listen(process.env.PORT || 8000, () => console.log("app available on localhost:8000"));