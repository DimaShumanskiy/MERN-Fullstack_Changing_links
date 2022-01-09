const express = require('express')//require - скрипт-загрузчик
const config = require('config')
const mongoose = require('mongoose')
// const path = require('path')

const app = express()

//миделВэер
app.use(express.json({ extended: true}))
// порты для обработки фронта (middleware)
app.use('/api/auth', require('./routes/auth.routes')) // авторизация
app.use('/api/link', require('./routes/link.routes'))// изменение ссылки
app.use('/t/', require('./routes/redirect.routes'))

// if (process.env.NODE_ENV === 'production'){
//     app.use('/', express.static(path.join(__dirname, 'client', '/client/build')))// при запросе в корень проекта
//
//     //при других запросах
//     app.get('*', (req,res) =>{
//         res.sendFile(path.resolve(__dirname, 'client', 'build', '/client/public/index.html'))
//     })
// }

const PORT = config.get('port') || 5000

async function start() {//обертка для метода connect
    try {
        await mongoose.connect(config.get('mongoUri'), { // connect - возвращает промис
            // пораметры для успешной работы конеск
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`)) // настройка сервера
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)// в случае ошибки будет произведет выход
    }
}

start()
