"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Bring in the express server and create application
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const cors_1 = __importDefault(require("cors"));
const projectrepo_1 = __importDefault(require("./repos/projectrepo"));
const errorhelpers_1 = __importDefault(require("./helpers/errorhelpers"));
const RallyObject_1 = __importDefault(require("./repos/RallyObject"));
const fs = __importStar(require("fs"));
// Use the express Router object
const router = express_1.default.Router();
// Configure middleware to support JSON data parsing in request object
app.use(express_1.default.json());
// Configure CORS
app.use(cors_1.default());
const projectRepo = new projectrepo_1.default();
const errorHelper = new errorhelpers_1.default();
router.get('/projects', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield projectRepo.get();
    const projects = [];
    const length = data.Results.length;
    for (let i = 0; i < length; i++) {
        const project = new RallyObject_1.default(data.Results[i].Name, data.Results[i].Description, data.Results[i].Notes, data.Results[i].FormattedID, data.Results[i].Tags._tagsNameArray, data.Results[i].c_Comment, data.Results[i].c_EmergingTechPOCPipeline);
        projects.push(project);
    }
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All projects retrieved",
        "data": projects
    });
}));
router.get('/projects/:userStory', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield projectRepo.getByUserStory(req.params.userStory);
    const project = new RallyObject_1.default(data.Results[0].Name, data.Results[0].Description, data.Results[0].Notes, data.Results[0].FormattedID, data.Results[0].Tags._tagsNameArray, data.Results[0].c_Comment, data.Results[0].c_EmergingTechPOCPipeline);
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
}));
router.get('/vendors', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield projectRepo.getVendors();
    const vendors = [];
    const length = data.Results.length;
    for (let i = 0; i < length; i++) {
        const vendor = new RallyObject_1.default(data.Results[i].Name, data.Results[i].Description, data.Results[i].Notes, data.Results[i].FormattedID, data.Results[i].Tags._tagsNameArray, data.Results[i].c_Comment, data.Results[i].c_EmergingTechPOCPipeline);
        vendors.push(vendor);
    }
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All vendors retrieved",
        "data": vendors
    });
}));
router.get('/usecases', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield projectRepo.getUsecases();
    const usecases = [];
    const length = data.Results.length;
    for (let i = 0; i < length; i++) {
        const usecase = new RallyObject_1.default(data.Results[i].Name, data.Results[i].Description, data.Results[i].Notes, data.Results[i].FormattedID, data.Results[i].Tags._tagsNameArray, data.Results[i].c_Comment, data.Results[i].c_EmergingTechPOCPipeline);
        usecases.push(usecase);
    }
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All usecases retrieved",
        "data": usecases
    });
}));
router.post('/requests', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    const nameDate = req.body.name + " " + utc;
    const notes = "Email: " + req.body.email + ", Team name: " + req.body.team;
    const submission = new RallyObject_1.default(nameDate, req.body.description, notes);
    const data = yield projectRepo.create(submission);
    res.status(201).json({
        "status": 201,
        "statusText": "Created",
        "message": "New Request Added",
        "data": data
    });
}));
router.get('/filenames/:id', (req, res) => {
    const walkPath = 'src/files/poc/' + req.params.id;
    const walk = (dir, done) => {
        try {
            fs.readdir(dir, (error, list) => {
                if (error) {
                    res.send(null);
                }
                else {
                    res.send(list);
                }
            });
        }
        catch (e) {
            res.send(null);
        }
    };
    walk(walkPath, (error) => {
        if (error) {
            throw error;
        }
        else {
            console.log('-------------------------------------------------------------');
            console.log('finished.');
            console.log('-------------------------------------------------------------');
        }
    });
});
router.get('/file/', (req, res) => {
    const id = req.query.id;
    const name = req.query.name;
    const filePath = "/files/poc/" + id + "/" + name;
    try {
        fs.readFile(__dirname + filePath, (err, data) => {
            res.contentType("application/pdf");
            res.send(data);
        });
    }
    catch (e) {
        res.send(null);
    }
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
app.use(express_1.default.static('public'));
// Create server to listen on port 8081
const server = app.listen(8081, () => {
    console.log('Node server is running on http://localhost:8081..');
});
//# sourceMappingURL=server.js.map