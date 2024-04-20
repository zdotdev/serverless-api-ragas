const express = require('express')
const AuthorModel = reuqire('../models/author')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const authors = await AuthorModel.find()
    res.json(authors)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
router.get('/:id', getAuthor, (req, res) => {
  res.json(res.author)
})
router.post('/', async (req, res) => {
  try {
    if (!req.body.name || !req.body.age) {
      return res.status(400).json({ message: 'Name and Age are required' })
    }
    const existingAuthor = await AuthorModel.findOne({ name: req.body.name })
    if (existingAuthor) {
      return res.status(400).json({ message: 'Author already exists' })
    }
    const author = new AuthorModel(req.body)
    const newAuthor = await author.save()

    res.status(201).json({ message: 'Author created', author: newAuthor })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
router.patch('/:id', getAuthor, async (req, res) => {
  try {
    if (req.body.name != null) {
      res.author.name = req.body.name
    }
    const updateAuthor = await res.author.save()
    res.json(updateAuthor)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
router.put('/:id', getAuthor, async (req, res) => {
  try {
    const updateAuthor = await AuthorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updateAuthor)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
router.delete('/:id', getAuthor, async (req, res) => {
  try {
    await AuthorModel.findByIdAndDelete(req.params.id)
    res.json({ message: 'Author deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
async function getAuthor (req, res, next) {
  try {
    const author = await AuthorModel.findById(req.params.id)
    if (!author) {
      return res.status(404).json({ message: 'Author not found' })
    }
    res.author = author
    next()
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}
module.exports = router
