const { MONGOOSE_DB_URI } = process.env;

import { logger } from "@logger";
import mongoose from "mongoose";


mongoose.connect(MONGOOSE_DB_URI ?? "")
    .then(() => logger.info("[cluster@haworth.gg] - Database connected to Cluster (AWS/USA)."))
    .catch(err => logger.error(err));


mongoose.connection.on("error", (err) => {
    logger.error("[cluster@haworth.gg] Connection error:", err);
});


mongoose.connection.on("disconnected", (err) => {
    logger.error("[cluster@haworth.gg] Disconnected.", err);
});