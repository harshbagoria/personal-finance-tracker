import { Router } from 'express';
import {Signup} from '../../Controller/AuthController.js';
import {Login} from '../../Controller/AuthController.js';
import validateSignup from '../../Middleware/ValidationSignup.js';


const router = Router();

router.post("/signup", validateSignup, Signup);
router.post("/login",Login);

export default router;