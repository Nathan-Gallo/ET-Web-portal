import LogRepo from '../repos/logrepo';
const logRepo = new LogRepo();

export default class ErrorHelpers {
    logErrorsToConsole(err: any, req: any, res: any, next: any) {
        console.error("Log Entry: " + JSON.stringify(this.errorBuilder(err)));
        console.error("*".repeat(80));
        next(err);
    }

    logErrorsToFile(err: any, req: any, res: any, next: any) {
        const errorObject = this.errorBuilder(err);
        errorObject.requestInfo = {
            "hostname": req.hostname,
            "path": req.path,
            "app": req.app,
        };
        logRepo.write(errorObject, (data: any) => {
            console.log(data);
        }, (err: any) => {
            console.error(err);
        });
        next(err);
    }

    clientErrorHandler(err: any, req: any, res: any, next: any) {
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

    errorHandler(err: any, req: any, res: any, next: any) {
        res.status(500).json(this.errorBuilder(err));
    }

    errorBuilder(err: any) {
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

