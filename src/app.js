import express from 'express';
import { create } from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { __dirname } from './utils.js';
import ViewsRouter from './routes/views.route.js';
import SessionRoute from './routes/sessions.route.js';
import mongoose from 'mongoose';
import passport from 'passport';
import initPassport from './config/passport.config.js';

const hbs = create();
const app = express();

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://molusaezcardenas:tSUzZOhFjzWqQmid@ecommerce.cxnn6t9.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce',
      dbName: 'users',
      ttl: 15,
    }),
    secret: 'secrethash',
    resave: true,
    saveUninitialized: true,
    // cookie: { httpOnly: true, secure: true }, // httpOnly en true no va a poder acceder desde el cliente, secure en true solo se puede acceder desde https
    cookie: { maxAge: 120000 },
  }),
);

//Passport
initPassport();
app.use(passport.initialize());
app.use(passport.session());

//Handlebars
app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', ViewsRouter);
app.use('/api/sessions', SessionRoute);

mongoose
  .connect(
    'mongodb+srv://molusaezcardenas:tSUzZOhFjzWqQmid@ecommerce.cxnn6t9.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce',
    { dbName: 'users' },
  )
  .then(() => {
    console.log('BBDD conectada');
  })
  .catch(() => {
    console.log('Error al conectarse a la BBDD');
  });

app.listen(8080, () => {
  console.log('Corriendo en puerto 8080');
});
