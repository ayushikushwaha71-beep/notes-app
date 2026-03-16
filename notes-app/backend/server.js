const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

let notes = []

app.get("/notes", (req, res) => {
  res.json(notes)
})

app.post("/notes", (req, res) => {

  const newNote = {
    id: Date.now(),
    text: req.body.text
  }

  notes.push(newNote)

  res.json({
    message: "Note added",
    notes
  })
})

app.delete("/notes/:id", (req, res) => {

  const id = Number(req.params.id)

  notes = notes.filter(note => note.id !== id)

  res.json({
    message: "Note deleted",
    notes
  })

})

app.listen(5000, () => {
  console.log("Server running on port 5000")
})