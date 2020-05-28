import express from 'express';
import path from 'path';
import multer from 'multer';

import UserController from './controllers/UserController';

const router = express.Router();
const upload = multer();

//html file
const index = path.resolve(__dirname, '../../dist/index.html');

router.get('/check/overlap/id/:id', async (req, res) => {
    const result = await UserController.checkOverlap({id: req.params.id, is_deleted: false});
    res.send(result);
})

router.get('/check/overlap/nickname/:nickname', async (req, res) => {
    const result = await UserController.checkOverlap({nickname: req.params.nickname});
    res.send(result);
})

router.post('/user', upload.none(), async (req, res) => {
    const result = await UserController.testFormAndCreateUser(req.body);
    res.send(result);
})

router.post('/login', upload.none(), async (req, res) => {
    const result = await UserController.logInDataCheck(req, req.body);
    res.send(result);
})

router.delete('/logout', async (req, res) => {
    const result = await UserController.logOut(req);
    res.send(result);
})

router.get('/userinfo', async (req, res) => {
    const result = await UserController.getUserInfo(req);
    res.send(result);
})

router.post('/help/pwreset/authemail', upload.none(), async (req, res) => {
    const result = await UserController.sendPwAuthEmail(req.body.id);
    res.send(result);
})

router.post('/help/pwreset/issue', async (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    const token = req.body.token;
    const result = await UserController.issueNewPw(id, token);
    console.log('####result');
    console.log(result);
    res.send(result);
})

router.get('*', (req, res) => {
    res.sendFile(index);
})

module.exports = router;