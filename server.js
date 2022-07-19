const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

const app = express();

https
    .createServer(
        {
            key: fs.readFileSync('../../ssl_config/dev.dataseers.in.key'),
            cert: fs.readFileSync('../../ssl_config/dev.includesprivatekey.pem'),
            passphrase: 'D@t@S33r$'
        },
        app
    )
    .listen(PORT, function () {
        console.log('App listening at https://%s:%s', '127.0.0.1', PORT);
    });

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, './build/index.html'));
    });
