"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logrepo_1 = __importDefault(require("../repos/logrepo"));
const logRepo = new logrepo_1.default();
class ErrorHelpers {
    logErrorsToConsole(err, req, res, next) {
        console.error("Log Entry: " + JSON.stringify(this.errorBuilder(err)));
        console.error("*".repeat(80));
        next(err);
    }
    logErrorsToFile(err, req, res, next) {
        const errorObject = this.errorBuilder(err);
        errorObject.requestInfo = {
            "hostname": req.hostname,
            "path": req.path,
            "app": req.app,
        };
        logRepo.write(errorObject, (data) => {
            console.log(data);
        }, (err) => {
            console.error(err);
        });
        next(err);
    }
    clientErrorHandler(err, req, res, next) {
        if (req.xhr) {
            res.status(500).json({
                "status": 500,
                "statusText": "Internal Server Error",
                "message": "XMLHttpRequest error",
                "error": {
                    "errno": 0,
                    "call": "XMLHttpRequest Call",
                    "code": "INTERNAL_SERVER_ERROR",
                    "message": "XMLHttpRequest error"
                }
            });
        }
        else {
            next(err);
        }
    }
    errorHandler(err, req, res, next) {
        res.status(500).json(this.errorBuilder(err));
    }
    errorBuilder(err) {
        return {
            "status": 500,
            "statusText": "Internal Server Error",
            "message": err.message,
            "error": {
                "errno": err.errno,
                "call": err.syscall,
                "code": "INTERNAL_SERVER_ERROR",
                "message": err.message
            },
            "requestInfo": {
                "hostname": "",
                "path": "",
                "app": ""
            }
        };
    }
}
exports.default = ErrorHelpers;
//# sourceMappingURL=errorhelpers.js.map