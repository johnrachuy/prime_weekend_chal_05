var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pg = require('pg');
var connectionString = require('./modules/connection');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/post_fav', function(req, res) {
    //console.log(req);

    var addEntry = {
        name: req.body.name.$t,
        image: req.body.media.photos.photo[2].$t,
        description: req.body.description.$t.substring(0, 99),
        type: req.body.animal.$t,
        deleted: "FALSE"
    };

    pg.connect(connectionString, function(err, client, done) {
        client.query("INSERT INTO animal (name, image, description, type, deleted) VALUES ($1, $2, $3, $4, $5)",
            [addEntry.name, addEntry.image, addEntry.description, addEntry.type, addEntry.deleted],
            function (err, result) {
                done();
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            });
    });
});

app.get('/get_fav', function(req, res) {
    var results = [];

    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM animal WHERE deleted = FALSE');

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // close connection
        query.on('end', function() {
            done();
            //console.log(results);
            return res.json(results);

        });

        if(err) {
            console.log(err);
        }
    });
});

app.put('/remove_fav', function(req, res) {
    console.log(req.body.id);

    var updateEntry = {
        id: req.body.id
    };

    pg.connect(connectionString, function(err, client, done) {
        client.query("UPDATE animal SET deleted = NOT deleted WHERE id = ($1)",
            [updateEntry.id],
            function (err, result) {
                done();
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            });
    });
});

// Serve back static files
app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});