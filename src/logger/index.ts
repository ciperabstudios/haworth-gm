import { createLogger, format, transports } from "winston";


export const logger = createLogger({
    level: "debug",
    format: format.combine(
        format.timestamp({ format: "YY-MM-DD HH:mm:ss" }),
        format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`),
    ),
    transports: [
        new transports.Console({ format: format.colorize({ all: true }) })
    ],
});