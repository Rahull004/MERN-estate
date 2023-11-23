import { constants } from "../constants.js";

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode ? err.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation error",
                message: err.message,
                stackTree: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not found",
                message: err.message,
                stackTree: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTree: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTree: err.stack
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "Server_error",
                message: err.message,
                stackTree: err.stack
            });
            break;
        default:
            console.log("All Good, there is no error!");
            break;
    }
}

export default errorHandler;
