import { Router, type IRouter } from "express";
import healthRouter from "./health";
import dashboardRouter from "./dashboard";
import postsRouter from "./posts";
import coursesRouter from "./courses";
import libraryRouter from "./library";
import galleryRouter from "./gallery";
import timelineRouter from "./timeline";
import testimonialsRouter from "./testimonials";
import commentsRouter from "./comments";
import faqRouter from "./faq";
import settingsRouter from "./settings";

const router: IRouter = Router();

router.use(healthRouter);
router.use(dashboardRouter);
router.use(postsRouter);
router.use(coursesRouter);
router.use(libraryRouter);
router.use(galleryRouter);
router.use(timelineRouter);
router.use(testimonialsRouter);
router.use(commentsRouter);
router.use(faqRouter);
router.use(settingsRouter);

export default router;
