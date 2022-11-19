const express = require('express');
const app = express();
const fs = require('fs');
require('./src/db/mongoose')
const Note = require('./src/models/note')
app.use(express.json())

//get notes
app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find({})
        res.send(notes)
    } catch (error) {
        res.status(500).send(error)
    }
})


// create notes
app.post('/notes', async (req, res) => {
    const note = new Note(req.body)

    try {
        await note.save()
        res.status(201).send(note)
    } catch (error) {
        res.status(400).send(error)
    }
})


//update notes
app.patch('/notes/:id', async (req, res) => {

    try {
        const note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send()
        }
        note.note = req.body.note
        await note.save()
        res.status(201).send(note)
    } catch (error) {
        res.status(404).send(error)
    }

})


//delete notes


app.delete('/notes/:id', async (req, res) => {

    try {
        const note = await Note.findByIdAndDelete(req.params.id)
        if (!note) {
            return res.status(404).send()
        }
        res.send("notet has been deleted")

    } catch (error) {
        res.status(500).send(error)
    }

})

app.listen(3000, () => {
    console.log("server is live");
});