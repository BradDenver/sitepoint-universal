import harmon from "harmon";
import { Router } from "express";

import "../app";
import { knownTags } from "../app/tools/render";

const harmonRouter = Router();

const reqSelectors = [];
const resSelectors = knownTags();

harmonRouter.use(harmon(reqSelectors, resSelectors));

export default harmonRouter;
