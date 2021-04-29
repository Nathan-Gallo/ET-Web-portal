"use strict";
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
const errorhelpers_js_1 = __importDefault(require("./helpers/errorhelpers.js"));
const RallyObject_1 = __importDefault(require("./repos/RallyObject"));
// Use the express Router object
const router = express_1.default.Router();
// Configure middleware to support JSON data parsing in request object
app.use(express_1.default.json());
// Configure CORS
app.use(cors_1.default());
const projectRepo = new projectrepo_1.default();
const errorHelper = new errorhelpers_js_1.default();
router.get('/projects', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield projectRepo.get();
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All projects retrieved",
        "data": data.Results
    });
}));
router.get('/projects/:userStory', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield projectRepo.getByUserStory(req.params.userStory);
    if (data.length !== 0) {
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
}));
router.get('/vendors', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield projectRepo.getVendors();
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All vendors retrieved",
        "data": data.Results
    });
}));
router.get('/usecases', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield projectRepo.getUsecases();
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All usecases retrieved",
        "data": data.Results
    });
}));
router.post('/requests', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    const nameDate = req.body.name + " " + utc;
    const notes = "Email: " + req.body.email + ", Team name: " + req.body.team;
    const rallyObject = new RallyObject_1.default(nameDate, req.body.description, notes);
    const data = yield projectRepo.create(rallyObject);
    res.status(201).json({
        "status": 201,
        "statusText": "Created",
        "message": "New Request Added",
        "data": data
    });
}));
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