let LogRepo = require('../repos/logrepo');
let logRepo = new LogRepo();

class ErrorHelpers {
    logErrorsToConsole(err, req, res, next) {
        console.error("Log Entry: " + JSON.stringify(errorHelpers.errorBuilder(err)));
        console.error("*".repeat(80));
        next(err);
    }

    logErrorsToFile(err, req, res, next) {
        let errorObject = this.errorBuilder(err);
        errorObject.requestInfo = {
            "hostname": req.hostname,
            "path": req.path,
            "app": req.app,
        };
        logRepo.write(errorObject, function (data) {
            console.log(data);
        }, function (err) {
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
        } else {
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
            }
        };
    }
}

module.exports = ErrorHelpers;