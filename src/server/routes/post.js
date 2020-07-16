import PostController from '../controllers/PostController';

export default function (router, upload) {
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
        const result = await PostController.deletePost(req.query.id, req.session);
        res.status(result.status).send(result.data);
    })

    router.get('/modify/:num', async (req, res) => {
        console.log('#### get /modify/:num ####');
        const result = await PostController.authForModify(req.params.num, req.session);
        if (result.status != 200) res.status(result.status).redirect(result.data.url);
        else res.status(result.status).sendFile(index);
    })

    router.get('/recentposts', async (req, res) => {
        console.log('#### get /recentposts ####');
        const posts = await PostController.getRecentPosts();
        res.status(200).send(posts);
    })
}