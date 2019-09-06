let express = require('express')
let students = require('./students');
let fs = require('fs');

let router = express.Router();

router.get('/', (req, res) => {

    students.find('./public/db/db.json', function (err, student) {
        // console.log(student);
        if (!err) {
            res.render('index.html', {
                fluit: ['appay', 'orage', 'tea'],
                student
            });
        }
    })
})

router.get('/addstu', (req, res) => {
    res.render('addstu.html');
})
router.post('/addstu', (req, res) => {
    students.save('./public/db/db.json',req.body);
    res.redirect('/');
})
router.get('/edit', (req, res) => {
    students.findById('./public/db/db.json',req.query.id,(data)=>{
        res.render('edit.html',{item:[data]});
        // res.send(data);
    })
})
router.post('/edit', (req, res) => {
    students.updata('./public/db/db.json',req.query.id,req.body);
    res.redirect('/')
})
router.get('/delete', (req, res) => {
    students.dalete('./public/db/db.json',req.query.id);
    res.redirect('/');
    // res.send(req.query)
})

module.exports = router;

