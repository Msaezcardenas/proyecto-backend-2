import express from 'express';
import { create } from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { __dirname } from './utils.js';

const hbs = create();
const app = express();

app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://molusaezcardenas:tSUzZOhFjzWqQmid@ecommerce.cxnn6t9.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce',
      dbName: 'ecommerce-session',
      ttl: 15,
    }),
    secret: 'secrethash',
    resave: true,
    saveUninitialized: true,
    // cookie: { httpOnly: true, secure: true }, // httpOnly en true no va a poder acceder desde el cliente, secure en true solo se puede acceder desde https
    cookie: { maxAge: 120000 },
  }),
);

app.listen(8080, () => {
  console.log('Corriendo en puerto 8080');
});
