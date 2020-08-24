// routers
import authRouter from "./auth";
import userRouter from './user';
import priceRouter from "./price";
import walletRouter from "./wallet";

// middlewares
import { auth, cors, jwt } from "./middlewares";

const loadRoutes = (app) => {
  app.use(auth(), cors());

  app.use("/auth", authRouter);
  app.use("/price", jwt(), priceRouter);
  app.use('/wallet', jwt(), walletRouter);
  app.use("/user", jwt(), userRouter);

  app.get("/health-check", (_, res) =>
    res.json({
      status: "live",
      env: process.env.NODE_ENV,
      mlab: process.env.MLAB_URI,
    })
  );
};

export default loadRoutes;
