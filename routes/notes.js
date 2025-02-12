const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
  res.send('i Am notes')
  })

  module.exports = router