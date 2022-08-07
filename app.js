import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import db from './models/index.js';
import userRouter from './routes/user.js';
import passportConfig from './passport/index.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';

const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

passportConfig();
app.use(morgan('dev'));
app.use(cors({
  origin: true,
  credentials: true,
}));


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(cookieParser("secret"));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: "secret" // process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());



app.use('/user', userRouter);

  
app.listen(3065, () => {
    console.log('The server is running');
  });
  