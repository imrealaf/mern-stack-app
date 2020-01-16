import env from "../env";

export default {
  morgan: "tiny",
  cors: {
    origin: [
      `http://localhost:${env.get("PORT")}`,
      `http://localhost:${env.get("CLIENT_PORT")}`
    ],
    // methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }
};
