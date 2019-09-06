let express = require('express');


let router = require('./router');
var bodyParser = require('body-parser')

let app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.engine('html', require('express-art-template'));

app.use('/public', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));

app.use(router);

app.listen(3000, () => {
    console.log('running...');
})

// {
//     "student":[
//         {"id":0,"name":"lisi","sex":"男","age":"18","class":"201"}
//     ]
// }