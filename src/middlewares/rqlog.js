import { logger } from "../logs/logs.js";

export const reqlog = (req, res, next) => {
    logger.info(req.method, req.url);
    next();
};