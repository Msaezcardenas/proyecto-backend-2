import passport from 'passport';
import local from 'passport-local';
import { UserModel } from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';

//TODO: Aqui usamos passport con la estrategia PASSPORT-LOCAL
/* - Passport finalmente es un middleware,
- Con passport modularizamos todo el proceso de registro y Login  */

/* REGISTRO
- Recibir los datos por REQ que me los envia el cliente en un formulario;
- Validos que vengan todos los datos 
- Encrypto BYcript - encrypto la password con un salt y GUARDO la password encryptada
NOTA: Tengo que hacer previamente el proceso de encryptacion antes de guardar los datos en 
la BBDD porque si atacan mi BBDD pueden obtener usuario y contraseña real
- Creo un registro de usuario en la BBDD
- Retorno un status 201 de recurso creado */

/* LOGIN
- Recibo los datos desde el REQ, username y password
- Busco a el usuario en mi BBDD, cuando lo encuentre -> obtengo su contraseña 
- Con el password y el salt ->  comparo la clave que ingreso el cliente -> con la que tengo guardada en la BBDD 
- Finalmente guardo informacion del usuario en el session */

const localStrategy = local.Strategy;

const initPassport = () => {
  passport.use(
    'register',
    new localStrategy(
      {
        usernameField: 'email',
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const { nombre, apellido, email, edad } = req.body;
          const userFound = await UserModel.findOne({ email: username });

          if (userFound) {
            console.log('Usuario ya registrado');
            done(null, false);
          }
          const newUser = {
            nombre,
            apellido,
            email,
            edad,
            password: createHash(password),
          };

          const user = await UserModel.create(newUser);
          return done(null, user);
        } catch (error) {
          return done('Error en la BBDD');
        }
      },
    ),
  );

  passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
      },
      async (username, password, done) => {
        try {
          const userFound = await UserModel.findOne({ email: username });
          if (!userFound) return done(null, false);
          if (!isValidPassword(userFound, password)) return done(null, false);

          return done(null, userFound);
        } catch (e) {
          return done('Error en la bbdd');
        }
      },
    ),
  );

  //serializar es como compactar algo
  passport.serializeUser((user, done) => {
    done(null, user.id); //aqui en la cookie/session solo guardara el id
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    done(null, user);
  });
};

export default initPassport;
