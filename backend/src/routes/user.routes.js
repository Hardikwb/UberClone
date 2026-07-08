import userModel from '../models/user.models.js';
import express from 'express'
import {registerUser,loginUser,getUserProfile,logout} from '../controllers/user.controller.js';
import {authUser} from '../middleware/auth.middleware.js';
import {body} from 'express-validator'
const router = express.Router()


router.post('/register',[
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullname.firstname').isLength({min:3}).withMessage(
            'First name must be of atleast 3 characters'
        ),
        body('password').isLength({min:6}).withMessage('Password must be of atleast 6 characters')
],
    registerUser
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],loginUser)


router.get('/profile',authUser,getUserProfile)
router.get('/logout', authUser,logout)



export default router;