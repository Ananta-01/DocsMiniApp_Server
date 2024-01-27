const router = require("express").Router();
const Note = require("../models/Notes")


//create notes
router.post("/addNote", async (req, res) => {
    try {
      const note = new Note({
        title: req.body.title,
        description: req.body.description,
        postedBy: req.body.postedBy,
      });
  
      const data = await note.save();
  
      res.status(200).json(data);
    } catch (e) {
      res.status(500).json(e);
    }
  });

//delete notes
router.delete("/deleteNote/:id", async (req, res) => {
    try {
      const notes = await Note.findOne({ _id: req.params.id });
      !notes &&
        res.status(400).json({ message: "note not found ", status: false });
      const note = await Note.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "note deleted successfull", status: true });
    } catch (e) {
      res.status(500).json(e);
    }
  });

module.exports = router;