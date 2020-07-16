import ReplyController from '../controllers/ReplyController';

export default function (router, upload) {
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
    
}