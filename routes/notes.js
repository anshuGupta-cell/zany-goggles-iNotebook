const express = require('express')
const router = express.Router()
const fetchuser = require("../middleware/fetchuser")
const Note = require("../models/Note")
const {body, validationResult} = require("express-validator")

// 1. Get /api/notes/fetchallnotes 
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
try {
  const notes = await Note.find({user: req.id})
  res.json(notes)
} catch (error) {
  res.status(500).send("Internal server error")
}
})

// 2. Post /api/notes/addnote
router.post('/addnote', fetchuser,
  [
    body('title').isLength({min: 3}),
    body('description').isLength({min: 3})
  ]
  , async (req, res) => {
  try {
  const result = validationResult(req)
  if(!result.isEmpty()){
    return res.status(400).json({error: result.array()})
  }

  const {title, description, tag} = req.body

  const note = new Note({
    user: req.id, title, description, tag
  })

  const savedNote = await note.save()
  res.send(savedNote)
  } catch (error) {
    res.status(500).send("Internal server error")
  }

})

//3. PUT update note api/notes/updatenote
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  try {
  const{ title, description, tag} = req.body
  const newNote = {}
  if(title){newNote.title = title}
  if(description){newNote.description = description}
  if(tag){newNote.tag = tag}

  let note = await Note.findById(req.params.id)
  if(!note){
    return res.status(404).send("Not found")
  }
console.log(req.id,"<--")
console.log(note.user, "<- note")
  if(note.user.toString() !== req.id){
    return res.status(401).send("Not allowed")
  }

  note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
  res.json(note)
} catch (error) {
  res.status(500).send("Internal server error")
}
})

// 4. DELETE delete note /api/notes/deletenote
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    
  
  
  let note = await Note.findById(req.params.id)
  if(!note){
    return res.status(404).send("not Found")
  }
  if(note.user.toString() !== req.id){
    return res.status(401).send("Not allowed")
  }
  console.log(note)
  note = await Note.findByIdAndDelete(req.params.id);

  res.json({"success":"deleted",note: note})
} catch (error) {
  res.status(500).send("Internal server error")
}
})

module.exports = router;
