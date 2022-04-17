const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Users = require('./model/model')

mongoose.connect('mongodb://localhost:27017/users')
app.use(express.json());
app.use(cors());


app.post('/insert', async (req, res) => {
    const Fname = req.body.Fname;
    const Lname = req.body.Lname;
    const Age = req.body.Age;

    const users = new Users({
        Firstname: Fname,
        Lastname: Lname,
        Age: Age
    })
    try {
        await users.save();
        res.send("Inserted")
    } catch (err) {
        console.log(err)
    }
})
app.get('/read', async (req, res) => {
    Users.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })

})
app.put('/update', async (req, res) => {
    const UpdatedFirst = req.body.UpdatedFirst;
    const UpdatedLast = req.body.UpdatedLast;
    const UpdatedAge = req.body.UpdatedAge;
    const id = req.body.id;
    try {
        await Users.findById(id, (err, updateddata) => {
            updateddata.Firstname = UpdatedFirst;
            updateddata.Lastname = UpdatedLast;
            updateddata.Age = UpdatedAge;
            updateddata.save();
            res.send('updated')
        })
    } catch (err) {
        console.log(err)
    }
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    await Users.findByIdAndRemove(id).exec()
    res.send('Delete')
})

app.listen(3001, () => console.log("Running on port 3001"));