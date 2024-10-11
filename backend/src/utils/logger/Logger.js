import winston from "winston";

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const Logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.timestamp(), customFormat),
  transports: [
    new winston.transports.Console(), // Output ke console
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

export default Logger;
