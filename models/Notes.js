const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const NotesSchema = new Schema({
  title: {
      type: String,
          require: true
            },
              description: {
                  type: String,
                      require: true,
                        },
                          tag: {
                              type: String,
                                  default: ''
                                    },
                                      date: {
                                          type: Date,
                                              default: Date.now
                                                }

                                                })

                                                module.exports = mongoose.model('Notes', NotesSchema);