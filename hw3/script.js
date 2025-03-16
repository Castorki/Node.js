const express = require('express');
const path = require('path');
const fs = require('fs');

let mainPageCount = 0;
let aboutPageCount = 0;
let countsObj = {};

const app = express();

checkJson((parsedJson) => {
    if (!parsedJson) {
        // console.log(err);
        countsObj = {
            '/': 0,
            '/about': 0
        }
        toJson(countsObj);
    } else {
        mainPageCount = parsedJson['/'];
        aboutPageCount = parsedJson['/about'];
    }
});

app.get('/', (req, res) => {
    mainPageCount++;
    countsObj[req.url] = mainPageCount;
    toJson(countsObj);
    let htmlFilePath = path.join(__dirname, 'index.html');
    fs.readFile(htmlFilePath, 'utf-8', (err, html) => {
        if (err) {
            res.status(500).send('Ошибка при чтении файла')
        } else {
            fromJson(req.url, (err, viewCount) => {
                if (err) {
                    res.status(500).send('Ошибка при чтении данных');
                } else {
                    let updateHtml = html.replace('{{viewCount}}', viewCount)
                    res.send(updateHtml);
                }
            });
        }
    })
})

app.get('/about', (req, res) => {
    aboutPageCount++;
    countsObj[req.url] = aboutPageCount;
    toJson(countsObj);
    let htmlFilePath = path.join(__dirname, 'about.html')
    fs.readFile(htmlFilePath, 'utf-8', (err, html) => {
        if (err) {
            res.status(500).send('Ошибка при чтении файла')
        } else {
            fromJson(req.url, (err, viewCount) => {
                if (err) {
                    res.status(500).send('Ошибка при чтении данных');
                } else {
                    let updateHtml = html.replace('{{viewCount}}', viewCount)
                    res.send(updateHtml);
                }
            });
        }
    })
})

function checkJson(callback) {
    fs.readFile("./data.json", { encoding: "utf-8", flag: "r" }, (err, data) => {
        if (!data) {
            callback(err);
        } else {
            const parsedJson = JSON.parse(data);
            callback(parsedJson);
        }
    })

}



function toJson(countsObj) {
    fs.writeFile('./data.json', JSON.stringify(countsObj), (err) => {
        if (err) {
            throw err;
        } else {
            console.log('writed!');
        }
    })
}

function fromJson(url, callback) {
    fs.readFile("./data.json", { encoding: "utf-8", flag: "r" }, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            const parsedJson = JSON.parse(data);
            callback(null, parsedJson[url]);
        }
    })

}

const port = 3000;

app.listen(port, () => {
    console.log('Сервер запушен!');
})