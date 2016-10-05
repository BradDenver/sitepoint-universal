import { storesForReq } from "./index";

export default {
  query: "client-initial-state",
  func: (node, req) => {
    node.createWriteStream({outer: true}).end(
      `<script> window.INITIAL_STATE = ${JSON.stringify(storesForReq(req))}; </script>`
    );
  },
};
