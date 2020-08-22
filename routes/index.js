import passport from 'passport';

// routers
import authRouter from './auth';
import priceRouter from "./price";

// middlewares
import loadAuthMiddleware from './middlewares/auth';

const loadRoutes = (app) => {
  
  loadAuthMiddleware(app);

  app.use('/auth', authRouter);
  app.use("/price", passport.authenticate('jwt', { session: false }), priceRouter);

  app.get("/health-check", (_, res) =>
    res.json({
      status: "live",
      env: process.env.NODE_ENV,
      mlab: process.env.MLAB_URI,
    })
  );
};

export default loadRoutes;
