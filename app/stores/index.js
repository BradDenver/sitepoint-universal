import mobx from "mobx";
import Posts from "./Posts";

const stores = mobx.observable({
  posts: new Posts()
});

export default stores;
