import mobx, { autorun, createTransformer } from "mobx";

import hasDocument from "../tools/hasDocument";
import Posts from "./Posts";

export var storeOrState = (req) => {
  if (hasDocument || typeof req === "undefined") {
    return stores;
  } else {
    if (typeof req.SITEPOINT_state === "undefined") req.SITEPOINT_state = currentState;

    return req.SITEPOINT_state;
  }
}

const stores = mobx.observable({
  posts: new Posts()
});

let currentState;

if (!hasDocument) {
  const serializeState = createTransformer((stores) => ({
    ...mobx.toJS(stores)
  }));

  // on each change to stores save a state snapshot in `currentState`.
  autorun(() => {
    currentState = serializeState(stores);
  });
}

export default stores;
