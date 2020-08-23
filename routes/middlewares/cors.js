import cors from "cors";

export default cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const allowedOrigins =
      process.env.NODE_ENV === "production"
        ? ["https://bxb-fuzzy-trader-client.herokuapp.com"]
        : ["http://localhost:3000"];

    if (!allowedOrigins.includes(origin)) {
      return callback(new Error("blocked by CORS policy"))
    }

    return callback(null, true);
  },
});
