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
    console.log('#### get /check/overlap ####');
    let result;
    if (req.query.id) result = await UserController.checkOverlap({id: req.query.id, is_deleted: false});
    else if (req.query.nickname) result = await UserController.checkOverlap({nickname: req.query.nickname, is_deleted: false});
    res.status(result.status).send(result.data);
})

router.post('/user', upload.none(), async (req, res) => {
    console.log('#### post /user ####');
    const result = await UserController.testFormAndCreateUser(req.body);
    res.status(result.status).send();
})

router.put('/user', upload.none(), async (req, res) => {
    console.log('#### put /user ####');
    const result = await UserController.testFormAndUpdateUser(req.body, req.session);
    res.status(result.status).send();
})

router.delete('/user', upload.none(), async (req, res) => {
    console.log('#### delete /user ####');
    const result = await UserController.deleteUser(req.body, req.session);
    res.status(result.status).send(result.data);
})

router.post('/session/login', upload.none(), async (req, res) => {
    console.log('#### post /user ####');
    const result = await UserController.logInDataCheck(req, req.body);
    res.status(result.status).send(result.data);
})

router.delete('/session/logout', async (req, res) => {
    console.log('#### delete /session/logout ####');
    const result = await UserController.logOut(req);
    res.status(result.status).send();
})

router.get('/userinfo', async (req, res) => {
    console.log('#### get /userinfo ####');
    const result = await UserController.getUserInfo(req);
    res.status(result.status).send(result.data);
})

router.get('/userwrote', async (req, res) => {
    console.log('#### get /userwrote ####');
    const result = await UserController.getUserWrote(req);
    res.status(result.status).send(result.data);
})

router.post('/help/pwreset/authemail', upload.none(), async (req, res) => {
    console.log('#### post /help/pwreset/authemail ####');
    const result = await UserController.sendPwAuthEmail(req.body.id);
    res.status(result.status).send(result.data);
})

router.post('/help/pwreset/issue', async (req, res) => {
    console.log('#### post /help/pwreeset/issue ####');
    const id = req.body.id;
    const token = req.body.token;
    const result = await UserController.issueNewPw(id, token);
    console.log(result);
    res.status(result.status).send(result.data);
})

router.post('/upload/test', upload.single('upload'), (req, res) => {  
    console.log('#### post /upload/test ####');
    console.log(path.resolve(__dirname, `../../public/uploads/${req.file.filename.toLowerCase()}`));
    res.status(201).send({
        "uploaded": true,
        "url": `${process.env.DEV_DOMAIN}/uploads/${req.file.filename.toLowerCase()}`
    })
})

router.get('/post/:num', async (req, res) => {
    console.log('#### get /poset/:num ####');
    const result = await PostController.getArticle(req.params.num, req.session, req.query.newGet);
    res.status(result.status).send(result.data);
})

router.get('/post', async (req, res) => {
    console.log('#### get /post ####');
    const result = await PostController.getPosts(req.query);
    res.status(result.status).send(result.data);
})

router.get('/search', async (req, res) => {
    console.log('#### get /search ####');
    const result = await PostController.getPosts(req.query);
    res.status(result.status).send(result.data);
})

router.post('/post', upload.none(), async (req, res) => {
    console.log('#### post /post ####');
    const result = await PostController.createPost(req.body, req.session);
    res.status(result.status).send(result.data);
})

router.put('/post', upload.none(), async (req, res) => {
    console.log('#### put /post ####');
    const result = await PostController.updatePost(req.body, req.session);
    res.status(result.status).send(result.data);
})

router.delete('/post', async (req, res) => {
    console.log('#### delete /post ####');
    const result = await PostController.deletePost(req.query.id, req.query.category, req.session);
    res.status(result.status).send(result.data);
})

router.get('/info*', (req, res) => {
    console.log('#### get /info* ####');
    if (!req.session.userid) res.redirect('/');
    else res.sendFile(index);
})

router.get('/modify/:num', async (req, res) => {
    console.log('#### get /modify/:num ####');
    const result = await PostController.authModify(req.params.num, req.session);
    if (result.status != 200) res.status(result.status).redirect(result.data.url);
    else res.status(result.status).sendFile(index);
})

router.post('/reply', upload.none(), async (req, res) => {
    console.log('#### post /reply ####');
    const result = await ReplyController.createReply(req.body, req.session);
    res.status(result.status).send();
})

router.get('/reply', async (req, res) => {
    console.log('#### get /reply ####');
    const result = await ReplyController.getReplies(req.query.post_id, req.session);
    res.status(result.status).send(result.data);
})

router.put('/reply', upload.none(), async (req, res) => {
    console.log('#### put /reply ####');
    const result = await ReplyController.updateReply(req.body, req.session);
    res.status(result.status).send();
})

router.delete('/reply', async (req, res) => {
    console.log('#### delete /reply ####');
    const result = await ReplyController.deleteReply(req.query, req.session);
    res.status(result.status).send();
})

router.get('/recentposts', async (req, res) => {
    console.log('#### get /recentposts ####');
    const posts = await PostController.recentPosts();
    res.status(200).send(posts);
})

router.get('/login', (req, res) => {
    console.log('#### get /login ####');
    if (req.session.userid) res.redirect('/');
    else res.sendFile(index);
})

router.get('/signup', (req, res) => {
    console.log('#### get /signup ####');
    if (req.session.userid) res.redirect('/');
    else res.sendFile(index);
})

router.get('/modify*', (req, res) => {
    console.log('#### get /modify* ####');
    res.redirect('/');
})

router.get('/write*', (req, res) => {
    console.log('#### get /write* ####');
    res.redirect('/');
})

router.get('/delete*', (req, res) => {
    console.log('#### get /delete* ####');
    res.redirect('/');
})

router.get('*', (req, res) => {
    console.log('#### get * ####');
    res.sendFile(index);
})

export default router;