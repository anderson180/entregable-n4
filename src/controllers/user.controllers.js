const catchError = require('../utils/catchError');
const User = require('../models/User');
//{importaciones de librerias} npm i bcrypt => Encriptar las contraseñas
const bcrypt = require('bcrypt');
//{importaciones de librerias} npm i jsonwebtoken -E => Para manejar tokens en node
const jwt = require('jsonwebtoken'); 
const Post = require('../models/Post');

const getAll = catchError(async (req, res) => {
    const results = await User.findAll({ include: [Post] });
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const { password } = req.body
    const hashedPassword = await bcrypt.hash(req.body.password, 10)// .
    const result = await User.create({ ...req.body, password: hashedPassword });
    return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id, { include: [Post] });
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: { id } });
    if (!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;

    delete req.body.password //Evitar la actualizacion de estos datos
    delete req.body.email //Evitar la actualizacion de estos datos

    const result = await User.update(
        req.body,
        { where: { id }, returning: true }
    );
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const isValid = bcrypt.compareSync(password, user.password)
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' })
    delete user.dataValues.password
//Para contraseñas incriptadas seiempre debemos generar un token con la libreria: JWT
    const token = jwt.sign(
        { user },
        process.env.TOKEN_SECRET,
        { expiresIn: '1d' }
    )

    return res.status(201).json({user, token})
});

const getMe = catchError(async (req, res) => {
    const user = req.user
    return res.json(user)
});

const setPosts = catchError(async (req, res) => {
    const { id } = req.params
    //Localizacion del usuario con id
    const user = await User.findByPk(id)
    if (!user) return res.sendStatus()
    //setear post al usuario
    await user.setPosts(req.body)
    //extracion de los post asignados
    const post = user.getPosts
    //Retornando vista
    return res.json(post)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    getMe,
    setPosts
}