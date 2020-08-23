// routers
import authRouter from "./auth";
import priceRouter from "./price";

// middlewares
import { auth, cors, jwt } from "./middlewares";

const loadRoutes = (app) => {
  app.use(auth(), cors());

  app.use("/auth", authRouter);
  app.use("/price", jwt(), priceRouter);

  app.get("/health-check", (_, res) =>
    res.json({
      status: "live",
      env: process.env.NODE_ENV,
      mlab: process.env.MLAB_URI,
    })
  );
};

export default loadRoutes;
