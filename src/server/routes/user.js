import UserController from '../controllers/UserController';

export default function (router, upload) {
    router.get('/is-overlap', async (req, res) => {
        console.log('#### get /is-overlap ####');
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
    
    router.post('/session/user', upload.none(), async (req, res) => {
        console.log('#### post /session/user ####');
        const result = await UserController.logInDataCheck(req, req.body);
        res.status(result.status).send(result.data);
    })
    
    router.delete('/session/user', async (req, res) => {
        console.log('#### delete /session/user ####');
        const result = await UserController.logOut(req);
        res.status(result.status).send();
    })
    
    router.get('/userinfo', async (req, res) => {
        console.log('#### get /userinfo ####');
        console.log('#### session')
        console.log(req.session);
        const result = await UserController.getUserInfo(req);
        res.status(result.status).send(result.data);
    })
    
    router.get('/userwrote', async (req, res) => {
        console.log('#### get /userwrote ####');
        const result = await UserController.getUserWrote(req);
        res.status(result.status).send(result.data);
    })
    
    router.post('/authemail', upload.none(), async (req, res) => {
        console.log('#### post /authemail ####');
        const result = await UserController.sendPwAuthEmail(req.body.id);
        res.status(result.status).send(result.data);
    })
    
    router.post('/newpw', upload.none(), async (req, res) => {
        console.log('#### post /newpw ####');
        console.log(req.body);
        const id = req.body.id;
        const token = req.body.token;
        const result = await UserController.issueNewPw(id, token);
        res.status(result.status).send(result.data);
    })
}