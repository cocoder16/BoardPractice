import express from 'express';
import path from 'path';
import multer from 'multer';

import UserController from './controllers/UserController';

const router = express.Router();
const upload = multer();

//html file
const index = path.resolve(__dirname, '../../dist/index.html');

router.get('/check/overlapid/:id', async (req, res) => {
    const result = await UserController.checkOverlap({id: req.params.id});
    console.log(result);
    res.send(result);
})

router.get('/check/overlapnickname/:nickname', async (req, res) => {
    const result = await UserController.checkOverlap({nickname: req.params.nickname});
    res.send(result);
})

router.post('/send/signupform', upload.none(), (req, res) => {
    console.log('routes');
    const result = UserController.testFormAndCreateUser(req.body);
    res.send(result);
})

router.get('*', (req, res) => {
    res.sendFile(index);
})

module.exports = router;