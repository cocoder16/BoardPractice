import express from 'express';
import path from 'path';
import multer from 'multer';

import UserController from './controllers/UserController';
import PostController from './controllers/PostController';
import ReplyController from './controllers/ReplyController';

const router = express.Router();
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.resolve(__dirname, '../../public/uploads'));
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + path.extname(file.originalname).toLowerCase());
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }
  });

//html file
const index = path.resolve(__dirname, '../../dist/index.html');

router.get('/check/overlap', async (req, res) => {
    let result;
    if (req.query.id) result = await UserController.checkOverlap({id: req.query.id, is_deleted: false});
    else if (req.query.nickname) result = await UserController.checkOverlap({nickname: req.query.nickname, is_deleted: false});
    res.send(result);
})

router.post('/user', upload.none(), async (req, res) => {
    const result = await UserController.testFormAndCreateUser(req.body);
    res.send(result);
})

router.put('/user', upload.none(), async (req, res) => {
    const result = await UserController.testFormAndUpdateUser(req.body);
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
    const id = req.body.id;
    const token = req.body.token;
    const result = await UserController.issueNewPw(id, token);
    console.log(result);
    res.send(result);
})

router.post('/upload/test', upload.single('upload'), (req, res) => {  
    console.log(path.resolve(__dirname, `../../public/uploads/${req.file.filename.toLowerCase()}`));
    res.send({
        "uploaded": true,
        "url": `${process.env.DEV_DOMAIN}/uploads/${req.file.filename.toLowerCase()}`
    })
})

router.get('/post/:num', async (req, res) => {
    const article = await PostController.getArticle(req.params.num, req.session, req.query.newGet);
    res.send(article);
})

router.get('/post', async (req, res) => {
    console.log(req.query);
    const posts = await PostController.getPosts(req.query);
    res.send(posts);
})

router.post('/post', upload.none(), async (req, res) => {
    const result = await PostController.createPost(req.body, req.session);
    res.send(result);
})

router.put('/post', upload.none(), async (req, res) => {
    const result = await PostController.updatePost(req.body, req.session);
    res.send(result);
})

router.delete('/post', async (req, res) => {
    const result = await PostController.deletePost(req.query.id, req.query.category, req.session);
    console.log(result);
    res.send(result);
})

router.get('/info*', (req, res) => {
    if (!req.session.userid) res.redirect('/');
    else res.sendFile(index);
})

router.get('/modify/:num', async (req, res) => {
    if(!req.params || !req.session.userid) {
        res.redirect('/');
        return null;
    }
    const result = await PostController.authModify(req.params.num, req.session);
    if (!result) res.redirect('/');
})

router.post('/reply', upload.none(), async (req, res) => {
    const result = await ReplyController.createReply(req.body, req.session);
    res.send(result);
})

router.get('/reply', async (req, res) => {
    const replies = await ReplyController.getReplies(req.query.post_id, req.session);
    res.send(replies);
})

router.put('/reply', upload.none(), async (req, res) => {
    const result = await ReplyController.updateReply(req.body, req.session);
    res.send(result);
})

router.delete('/reply', async (req, res) => {
    const result = await ReplyController.deleteReply(req.query.id, req.session);
    res.send(result);
})

router.get('/search', async (req, res) => {
    const result = await PostController.search(req.query);
    res.send(result);
})

router.get('/modify*', (req, res) => {
    res.redirect('/');
})

router.get('/write*', (req, res) => {
    res.redirect('/');
})

router.get('/delete*', (req, res) => {
    res.redirect('/');
})

router.get('*', (req, res) => {
    res.sendFile(index);
})

export default router;