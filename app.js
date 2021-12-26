
//DimaShumanskiy -- Ridan123258

const express = require('express')//require - скрипт-загрузчик
const config = require('config')
const mongoose = require('mongoose')

const app = express()

// порты для обработки фронта (middleware)
app.use('/api/auth', require('./routes/auth.routes')) // авторизация


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
