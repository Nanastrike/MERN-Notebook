const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')


// @desc: get all notes
// @route: get / notes
// @access private

const getAllNotes = asyncHandler(async(req,res)=>{
    //get all notes
    const notes = await Note.find().lean()

    //if no notes
    if(!notes?.length){
        return res.status(400).json({ message: 'No notes found' })
    }

    //add username to each note before sending a response
    const notesWithUser = await Promise.all(notes.map(async(note)=>{
        const user = await User.findById(note.user).lean().exec()
        return { ...note, username: user.username}
    }))
    res.json(notesWithUser)
})

// @desc: create a notes
// @route: create / notes
// @access private

const createNewNote = asyncHandler(async(req,res)=>{
    const {user, title, text} = req.body

    //confirm data
    if(!user || !title || !text){
        return res.status(400).json({ message: 'All fields are required' })
    }

    //check duplicate title
    const duplicate = await Note.findOne({ title }).lean().exec()

    if(duplicate){
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    //create and store the new user
    const note = await Note.create({ user,title,text })

    if(note){
        //created
        return res.status(201).json({ message:'New note created' })
    }else{
        return res.status(400).json({ message: 'Invalid note data received' })
    }
})

// @desc: update a notes
// @route: update / notes
// @access private

const updateNote = asyncHandler(async(req,res)=>{
    const { id, user, title, text, completed } = req.body
    //confirm data
    if(!id || !user || !title || !text || typeof completed !== 'boolean'){
        return res.status(400).json({ message: 'All fields are required'})
    }

    //confirm note exists to update
    const note = await Note.findById(id).exec()

    if(!note){
        return res.status(400).json({ message: 'Note not found'})
    }

    //check for duplicate title
    const duplicate = await Note.findOne({ title }).lean().exec()
    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({ message:'Duplicate note title' })
    }

    note.user = user
    note.title = title
    note.text = text
    note.completed = completed

    const updatedNote = await note.save()
    res.json(`${updatedNote.title} updated`)
})

// @desc: delete a notes
// @route: delete / notes
// @access private

const deleteNote = asyncHandler(async(req,res)=>{
    const { id } = req.body

    //confirm data
    if(!id){
        return res.status(400).json({ message: 'Note ID required'})
    }

    //confirm note exists
    const note = await Note.findById(id).exec()
    if(!note){
        return res.status(400).json({ message:'Note not found' })
    }

    const result = await note.deleteOne()

    const reply = `Note '${note.title}' with ID ${note._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}