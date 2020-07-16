import express from 'express';
import path from 'path';
import multer from 'multer';
import url from 'url';
import mime from 'mime-types';
import post from './post';
import reply from './reply';
import user from './user';

const router = express.Router();
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.resolve(__dirname, '../../../public/uploads'));
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + path.extname(file.originalname).toLowerCase());
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }
});

// get api
post(router, upload);
reply(router, upload);
user(router, upload);

//html file
let root;
if (process.env.NODE_ENV.trim() == 'development') {
    root = path.resolve(__dirname, '../../../dist');
} else if (process.env.NODE_ENV.trim() == 'production') {
    root = path.resolve(__dirname, '../../../build');
}
const index = path.join(root, 'index.html');

// router.post('/upload/test', upload.single('upload'), (req, res) => {  
//     console.log('#### post /upload/test ####');
//     console.log(path.resolve(__dirname, `../../public/uploads/${req.file.filename.toLowerCase()}`));
//     res.status(201).send({
//         "uploaded": true,
//         "url": `${process.env.DEV_DOMAIN}/uploads/${req.file.filename.toLowerCase()}`
//     })
// })

router.get('/info*', (req, res) => {
    console.log('#### get /info* ####');
    if (!req.session.userid) res.redirect('/');
    else res.sendFile(index);
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

router.get('/*.*', (req, res) => {
    const options = url.parse(req.url, true);
    res.setHeader('content-type', mime.lookup(options.pathname.split('.')[1]));
    res.sendFile(path.join(root, options.pathname));
})

router.get('*', (req, res) => {
    console.log('#### get * ####');
    res.sendFile(index);
})

export default router;