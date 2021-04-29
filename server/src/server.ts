// Bring in the express server and create application
import express from 'express'
const app = express();
import cors from 'cors'
import ProjectRepo from './repos/projectrepo';
import ErrorHelpers from './helpers/errorhelpers';
import RallyObject from './repos/RallyObject';

// Use the express Router object
const router = express.Router();

// Configure middleware to support JSON data parsing in request object
app.use(express.json());

// Configure CORS
app.use(cors());

const projectRepo: ProjectRepo = new ProjectRepo();
const errorHelper: ErrorHelpers = new ErrorHelpers();

router.get('/projects', async (req, res, next) => {
    const data = await projectRepo.get()
    console.log(data.Results[0])
    let projects: Array<RallyObject> = [];
    let length = data.Results.length


    for (let i = 0; i < length; i++) {
        let project: RallyObject = new RallyObject(data.Results[i].Name, data.Results[i].Description, data.Results[i].Notes, data.Results[i].FormattedID, data.Results[i].Tags._tagsNameArray, data.Results[i].c_Comment, data.Results[i].c_EmergingTechPOCPipeline);
        projects.push(project);
    }

    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All projects retrieved",
        "data": projects
    });
});

router.get('/projects/:userStory', async (req, res, next) => {
    const data = await projectRepo.getByUserStory(req.params.userStory);

    let project: RallyObject = new RallyObject(data.Results[0].Name, data.Results[0].Description, data.Results[0].Notes, data.Results[0].FormattedID, data.Results[0].Tags._tagsNameArray, data.Results[0].c_Comment, data.Results[0].c_EmergingTechPOCPipeline);

    if (data.length !== 0) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "The user story: '" + req.params.userStory + "' retrieved",
            "data": project
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

router.get('/vendors', async (req, res, next) => {
    const data = await projectRepo.getVendors();
    let vendors: Array<RallyObject> = [];
    let length = data.Results.length


    for (let i = 0; i < length; i++) {
        let vendor: RallyObject = new RallyObject(data.Results[i].Name, data.Results[i].Description, data.Results[i].Notes, data.Results[i].FormattedID, data.Results[i].Tags._tagsNameArray, data.Results[i].c_Comment, data.Results[i].c_EmergingTechPOCPipeline);
        vendors.push(vendor);
    }
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All vendors retrieved",
        "data": vendors
    });
});

router.get('/usecases', async (req, res, next) => {
    const data = await projectRepo.getUsecases();
    let usecases: Array<RallyObject> = [];
    let length = data.Results.length

    for (let i = 0; i < length; i++) {
        let usecase: RallyObject = new RallyObject(data.Results[i].Name, data.Results[i].Description, data.Results[i].Notes, data.Results[i].FormattedID, data.Results[i].Tags._tagsNameArray, data.Results[i].c_Comment, data.Results[i].c_EmergingTechPOCPipeline);
        usecases.push(usecase);
    }
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All usecases retrieved",
        "data": usecases
    });
});

router.post('/requests', async (req, res, next) => {
    const utc: string = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    const nameDate: string = req.body.name + " " + utc;
    const notes: string = "Email: " + req.body.email + ", Team name: " + req.body.team;

    const submission: RallyObject = new RallyObject(nameDate, req.body.description, notes)
    console.log(submission);
    const data = await projectRepo.create(submission);

    res.status(201).json({
        "status": 201,
        "statusText": "Created",
        "message": "New Request Added",
        "data": data
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
const server = app.listen(8081, () => {
    console.log('Node server is running on http://localhost:8081..');
});

