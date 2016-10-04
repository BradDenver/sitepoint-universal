import { Router } from "express";

const targetRouter = Router();

// a really basic target route for our proxy
// it always returns the same html page

targetRouter.use("/target", function (req, res) {
  res.send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Proxied Page</title>
  </head>
  <body>
    <header>This is my header.</header>
    <p>Some awesome content.</p>
    <my-example name="Jack"></my-example>
    <my-example name="Jill"></my-example>
    <post-list></post-list>
    <footer>It all ends here in the footer</footer>
    <script src="/webpack/bundle.js"></script>
  </body>
</html>
  `);
});

export default targetRouter;
