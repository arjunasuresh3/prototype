#!/usr/bin/env nodejs
var express = require('express'),
url  = require('url'),
app = express();
app.use(express.bodyParser());

app.use({
            handle:function (req, res, next) {
                var q = req.query,
                fn = req.path.substr(1).replace(/\W/g,'_') + '_' + q.action;

                delete q.action;
                if (fn in this) {
                    this[fn](res, q, req.body);
                } else {
                    next();
                }
            },
            memresults_read: function (res, q) {
                console.log('memresults read');
                // console.log(res);
                // console.log(q);
                var myArray = [
                    {MemberId: 1, Name:'pecan pie', DOB: '01/02/1985'},
                    {MemberId: 2, Name:'apple pie', DOB: '01/02/1986'},
                    {MemberId: 3, Name:'cheasecake', DOB: '01/02/1987'}
                ]; 
                res.send(myArray);
            },
            memresults_create: function (res, q) {
                console.log('memresults read');
                console.log(res);
                // console.log(q);
                var myArray = [
                    {MemberId: 1, Name:'pecan pie', DOB: '01/02/1985'},
                    {MemberId: 2, Name:'apple pie', DOB: '01/02/1986'},
                    {MemberId: 3, Name:'cheasecake', DOB: '01/02/1987'}
                ]; 
                res.send(myArray);
            },
            ModelRoot_read: function(res, q) {
                console.log('ModelRoot read', q.patientId);
                res.send({patientId: q.patientId, fname: 'Pepe ' + q.patientId, lname: 'Pérez ' + q.patientId});
            },
            ModelRoot_delete: function (res, q) {
                console.log('ModelRoot delete', q.patientId);
                res.send(200);
            },
            ModelRoot_create: function (res, q, body) {
                console.log('ModelRoot create', body);
                res.send({patientId: count++});
            },
            ModelRoot_update: function (res, q, body) {
                console.log('ModelRoot update', body);
                res.send({});
            },
            ModelListRoot_read: function (res, q) {
                console.log('ModelListRoot read');
                res.send([
                             {MemberId: 1, Name:'pecan pie', DOB: '01/02/1985'},
                             {MemberId: 2, Name:'apple pie', DOB: '01/02/1986'},
                             {MemberId: 3, Name:'cheasecake', DOB: '01/02/1987'}
                         ]);
            }
        });

app.get('/', function (req, res) {
    console.log('sending index.html');
    res.sendfile('index.html');
});

// app.get('/memresults', function (req, res) {
//             var bakery = {
//                 1: {MemberId: 1, Name:'pecan pie', DOB: '01/02/1985'},
//                 2: {MemberId: 2, Name:'apple pie', DOB: '01/02/1986'},
//                 3: {MemberId: 3, Name:'cheasecake', DOB: '01/02/1987'}
//             }, myArray = [];
//             for (var i in bakery) {
//                 console.log(bakery[i]);
//                 myArray.push(bakery[i]);
//             }
//             // res.writeHead(200, { 'Content-Type': 'application/json' });
//             // res.write(JSON.stringify(myArray));    
//             // res.end();
//             res.send(myArray);    
//         });
app.get('*', function (req, res) {
    console.log('*', req.path);
    res.sendfile('.' + req.path);
});
app.listen(12000);
console.log('Listening on port 12000');