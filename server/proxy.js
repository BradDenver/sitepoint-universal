import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer();

proxy.on("proxyReq", (proxyReq, req, res, options) => {
  // we dont want encoded responses as we
  // would just have to decode them later
  proxyReq.setHeader("accept-encoding", "");
});

export default (req, res) => {
  res.locals.proxied = true;
  proxy.web(req, res, {
    ignorePath: true,
    target: "http://localhost:3000/target"
  });
};
