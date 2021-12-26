const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    // поля для пользователя // связка моделя пользователя и базы данных
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    links:[{type: Types.ObjectId, ref: 'Link'}]
})

module.exports = model('User', schema)