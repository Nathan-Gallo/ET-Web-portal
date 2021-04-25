// Bring in the express server and create application
let express = require('express');
let app = express();
let cors = require('cors');
let ProjectRepo = require('./repos/projectrepo');
let UsecaseRepo = require('./repos/usecaseRepo');
let errorHelper = require('./helpers/errorhelpers');

// Use the express Router object
let router = express.Router();

// Configure middleware to support JSON data parsing in request object
app.use(express.json());

// Configure CORS
app.use(cors());

let projectRepo = new ProjectRepo();
let usecaseRepo = new UsecaseRepo();

router.get('/projects', async function (req, res, next) {
    let data = await projectRepo.get()
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All projects retrieved",
        "data": data.Results
    });
});

router.get('/projects/:userStory', async function (req, res, next) {
    let data = await projectRepo.getByUserStory(req.params.userStory);
    if (data.length != 0) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "The user story: '" + req.params.userStory + "' retrieved",
            "data": data.Results
        });
    }
    else {
        res.status(404).json({
            "status": 404,
            "statusText": "Not Found",
            "message": "The user story '" + req.params.userStory + "' could not be found.",
            "error": {
                "code": "NOT_FOUND",
                "message": "The user story '" + req.params.userStory + "' could not be found."
            }
        });
    }

});

router.get('/vendors', async function (req, res, next) {
    let data = await projectRepo.getVendors();
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All vendors retrieved",
        "data": data.Results
    });
});

router.get('/usecases', async function (req, res, next) {
    let data = await projectRepo.getUsecases();
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All usecases retrieved",
        "data": data.Results
    });
});

/*
// Create GET/search?id=n&name=str to search for recipes by "id" and/or "name"
router.get('/search', async function (req, res, next) {
    let tag = "API_Automation"

    let data = await projectRepo.searchByTag("chatbot")
    console.log(data)
});
*/

router.post('/projects', function (req, res, next) {
    console.dir("Server.js req.body #" + req);
    console.log(req.body)
    usecaseRepo.insert(req.body, function (data) {
        res.status(201).json({
            "status": 201,
            "statusText": "Created",
            "message": "New Request Added",
            "data": data
        });
    }, function (err) {
        next(err);
    });
});

// Configure router so all routes are prefixed with /api/v1
app.use('/api/', router);

// Configure exception logger to console
app.use(errorHelper.logErrorsToConsole);
// Configure exception logger to file
app.use(errorHelper.logErrorsToFile);
// Configure client error handler
app.use(errorHelper.clientErrorHandler);
// Configure catch-all exception middleware
app.use(errorHelper.errorHandler);

app.use(express.static('public'));

// Create server to listen on port 8081
let server = app.listen(8081, function () {
    console.log('Node server is running on http://localhost:8081..');
});

