import { env } from "../env";

export default {
  morgan: "tiny",
  cors: {
    origin: [
      `http://localhost:${env("PORT")}`,
      `http://localhost:${env("CLIENT_PORT")}`
    ],
    // methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }
};
