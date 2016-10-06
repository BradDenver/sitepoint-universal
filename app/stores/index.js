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

    if (typeof req.SITEPOINT_stores === "undefined") req.SITEPOINT_stores = [];
    req.SITEPOINT_stores.push(key);

    return sn(key, req.SITEPOINT_state);
  }
}

export var deregisterStore = (key, req) => {
  if (typeof req.SITEPOINT_stores === "undefined") return;

  const i = req.SITEPOINT_stores.indexOf(key);
  if (i === -1) return;

  req.SITEPOINT_stores.splice(i, 1);
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

export var storesForReq = (req) => {
  if(typeof req.SITEPOINT_stores === "undefined") return {};

  let reqStores = Array.from(new Set(req.SITEPOINT_stores))
    .reduce((acc, key) => {
      _set(acc, key, sn(key, req.SITEPOINT_state));
      return acc;
    }, {});

  return reqStores;
}

export default stores;
