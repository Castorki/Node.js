const express = require('express');
const fs = require('fs');
const joi = require('joi');

let users = [];
let uniqId = 0;


checkJson((parsedJson) => {
    console.log('check');
    if (parsedJson) {
        users = parsedJson;

        for (let i = 0; i < parsedJson.length; i++) {
            if (parsedJson[i + 1]) {
                continue;
            }else{
                uniqId = parsedJson[i].id;
            }
            
        }
    }    

});

const app = express();


const userShema = joi.object({
    firstName: joi.string().min(1).required(),
    surName: joi.string().min(1).required(),
    age: joi.number().min(0).max(1000).required()
})

app.use(express.json());


app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/users/:id', (req, res) => {
    const userId = +req.params.id;
    const user = users.find(user => user.id === userId);

    if (user) {
        res.send(user);
    } else {
        res.status(404).send('User not found');
    }
})

app.post('/users', (req, res) => {
    const validUser = userShema.validate(req.body)

    if (validUser.error) {
        return res.status(400).send(validUser.error.details);
    }

    uniqId += 1;
    console.log(uniqId);

    users.push({
        id: uniqId,
        ...req.body
    });


    res.send({ id: uniqId });
    toJSON(users);
});

app.put('/users/:id', (req, res) => {
    const validUser = userShema.validate(req.body)

    if (validUser.error) {
        return res.status(400).send(validUser.error.details);
    }

    const userId = +req.params.id;
    const user = users.find(user => user.id === userId);

    if (user) {
        user.firstName = req.body.firstName;
        user.surName = req.body.surName;
        user.age = req.body.age;
        res.send(user);
        toJSON(users);
    } else {
        res.status(404).send('User not found');
    }
});

app.delete('/users/:id', (req, res) => {
    const userId = +req.params.id;
    const user = users.find(user => user.id === userId);
    const indexOf = users.indexOf(user);

    if (user) {
        users.splice(indexOf, 1);
        res.send(user);
        toJSON(users);
    } else {
        res.status(404).send('User not found');
    }
});


function toJSON(users) {
    fs.writeFile('./data.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            throw err;
        } else {
            console.log('writed!');
        }
    })
}

function checkJson(callback) {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (!data) {
            return callback(err);
        } else {
            const parsedJson = JSON.parse(data);
            return callback(parsedJson);
        }
    })
}

app.listen(3000);

