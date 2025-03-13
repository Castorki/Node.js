const http = require('http');
let homeWatchCount = 0;
let aboutWatchCount = 0;
let notFountCount = 0;

const server = http.createServer((req, res) => {

    switch (req.url) {
        case '/':
            res.writeHead(200, {
                        'content-type': 'text/html; charset=UTF-8'
                    });
                    homeWatchCount++;
                    res.write('<a href="/about">About</a><br>');
                    res.write(`Просмотрели эту страницу: ${homeWatchCount} раз`);
                    res.end();
            break;
        case '/about':
            res.writeHead(200, {
                        'content-type': 'text/html; charset=UTF-8'
                    });
                    aboutWatchCount++;
                    res.write('<a href="/">Main page</a><br>');
                    res.write(`Просмотрели эту страницу: ${aboutWatchCount} раз`);
                    res.end();
            break;
        default:
            res.writeHead(404, {
                        'content-type': 'text/html; charset=UTF-8'
                    });
                    notFountCount++;
                    res.write('<h1>Страница не найдена</h1>');
                    res.write('<a href="/">Main page</a><br>');
                    res.write(`Просмотрели эту страницу: ${notFountCount} раз`);
                    res.end();
            break;
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});