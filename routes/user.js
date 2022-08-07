import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { isLoggedIn, isNotLoggedIn } from './middlewares.js';
import User from '../models/user.js';

const router = express.Router();

/// Create new account
router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user/
  try {
    console.log("good")
    console.log(req.body);
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디입니다.');
    }
    console.log("here2");

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    console.log("here3");
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    console.log("good?")
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

// Get User info
router.get('/', async (req, res, next) => { // GET /user
  console.log("adfbad")
  try {
    if (req.user) {
      console.log("here????");
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        }
      })
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.log("here!!!!");

    console.error(error);
 next(error);
}
});

// Login
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        }
      })
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

/// Logout
router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

// router.patch('/nickname', isLoggedIn, async (req, res, next) => {
//   try {
//     await User.update({
//       nickname: req.body.nickname,
//     }, {
//       where: { id: req.user.id },
//     });
//     res.status(200).json({ nickname: req.body.nickname });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

export default router;
