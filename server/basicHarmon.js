import harmon from "harmon";
import { Router } from "express";

const harmonRouter = Router();

// Harmon selectors are objects with a `query` css selector
// and a `func` function that is passed any found nodes
const fancyHeader = {
  query: "header",
  func: (node) => {
    node.createWriteStream().end("This is my fancy header.");
  }
};

// Harmon can modify requests and response but we will
// only be looking at the response
const reqSelectors = [];
const resSelectors = [fancyHeader];

harmonRouter.use(harmon(reqSelectors, resSelectors));

export default harmonRouter;
