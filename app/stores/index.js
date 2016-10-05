import mobx, { autorun, createTransformer } from "mobx";
import sn from "selectn";
import _set from "lodash/set";

import hasDocument from "../tools/hasDocument";
import Posts from "./Posts";

export var storeOrState = (key, factory, req) => {
  if (hasDocument || typeof req === "undefined") {
     // client: create store at key or return existing
    let s = sn(key, stores);
    if (!s) _set(stores, key, factory());

    return sn(key, stores);
  } else {
    // server: get serialized state of store
    // and add to req stores set

    if (typeof req.SITEPOINT_state === "undefined") req.SITEPOINT_state = currentState;

    return sn(key, req.SITEPOINT_state);
  }
}

export var postsStoreFor = (type = "Normal", req) => {
  const key = `posts.${type}`;
  const factory = () => new Posts(type);

  return storeOrState(key, factory, req);
};

const stores = (hasDocument)
  ? mobx.observable({})
  : mobx.observable({
      posts: {
        Normal: new Posts("Normal"),
        Cats: new Posts("Cats"),
        Dogs: new Posts("Dogs"),
        Chickens: new Posts("Chickens")
      }
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
