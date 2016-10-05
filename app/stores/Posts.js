import fetch from "isomorphic-fetch";
import { action, observable, runInAction } from "mobx";
import sn from "selectn";

import hasDocument from "../tools/hasDocument";

const base = "https://silly-api-mwwrappnbn.now.sh";

export default class Posts {
  type;
  @observable loading = false;
  @observable posts = [];
  pollLength = 1000 * 60 * 5;
  primed = false;

  constructor (type = "Normal") {
    this.type = type;
    (hasDocument) ? this.loadClientInitial() : this.loadPoll();
  }

  loadPoll () {
    this.load();
    setTimeout(::this.loadPoll, this.pollLength);
  }

  @action load () {
    if( hasDocument || !this.primed ) this.loading = true;

    fetch(`${base}/api/posts/${this.type}`)
      .then((res) => res.json())
      .then((res) => {
        runInAction(() => {
          this.posts = res;
          this.loading = false;
          this.primed = true;
        });
      })
      .catch((err) => console.log(err));
  }

  @action loadClientInitial () {
    const { posts } = sn(`INITIAL_STATE.posts.${this.type}`, window) || [];
    this.posts = posts;

    if (!posts.length) this.load();
  }

};
