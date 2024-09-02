import { Router } from 'express';
import { UserModel } from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';

const app = Router();

app.get('/getSession', (req, res) => {
  res.json({ session: req.session });
});

app.post('/register', async (req, res) => {
  const { nombre, apellido, email, edad, password } = req.body;

  try {
    await UserModel.create({
      nombre,
      apellido,
      email,
      edad,
      password: createHash(password),
    });
    res.status(201).json({ message: 'usuario creado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el recurso' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.json({ message: 'Correo o contraseña incorrecta' });
  try {
    const user = await UserModel.findOne({ email }).lean();
    if (!user) return res.status(404).json({ message: 'Ingreso mal el mail o la constraseña' });
    if (!isValidPassword(user, password))
      return res.status(400).json({ message: 'credenciales erroneas' });

    req.session.isLog = true;
    req.session.user = {
      nombre: user.nombre,
      apellido: user.apellido,
      edad: user.edad,
    };

    res.status(200).json({ message: 'Usuario logueado' });
  } catch (e) {
    console.log('error ', e);
    res.status(500).json({ message: 'error al loguearse' });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Error al cerrar sesión' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Sesión cerrada correctamente' });
    return res.redirect('/');
  });
});

export default app;
