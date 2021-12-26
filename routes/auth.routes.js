const {Router} = require('express')
const bcrypt = require('bcryptjs') // библиотека для хэширования поролей и сравнения
const config = require('config')
const jwt = require('jsonwebtoken')// библиотека jsonwebtoken - работа с токенами
const {check, validationResult} = require('express-validator') // валидатор проверки email, password на сервере
const User = require('../models/User')// подключение модели User

const router = Router()

// /api /auth /register
router.post(
    '/register',
    //validator - email, password
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    massage: 'Некорректные данные при регистрации'
                })
            }
            const {email, password} = req.body // получаем email, password с фронта


            //логика регистрации
            const candidate = await User.findOne({email})// поиск email
            if (candidate) {
                return res.status(400).json({message: 'Такой пользователь уже существует'})
            }
            const hashedPassword = await bcrypt.hash(password, 12)// хэширование пороля
            const user = new User({email, password: hashedPassword})

            // ждем сохранения поролей
            await user.save()
            res.status(201).json({message: 'Пользователь создан'})

        } catch (e) {// ошибка сервера
            res.status(500).json({message: 'Что то пошло не так, попробуйте снова'})
        }
    })
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail,
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    massage: 'Некорректные данные при входе в систему'
                })
            }
            const {email, password} = req.body//получаем логин и пароль

            const user = await User.findOne({ email })
            if(!user){// проверка на существующий email
                return res.status(400).json({message: 'Пользователь не найден'})
            }
            const isMatch = await bcrypt.compare(password, user.password)// проверка пароля хошированого с паролем user

            if(!isMatch) {
                return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
            }
            // работа с токенами
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'} // когда токен закончит свое существование
            )
                // ответ пользователю
            res.json({token, userId: user.id})

        } catch (e) {// ошибка сервера
            res.status(500).json({message: 'Что то пошло не так, попробуйте снова'})
        }
    })

module.exports = router
