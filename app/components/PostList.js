import { observer } from "mobx-react";
import React, { Component } from "react";

import { storeOrState } from "../stores";
import render from "../tools/render";

@observer
export class PostList extends Component {
  render() {
    const { store } = this.props;
    const { posts, type } = store;

    return  <div>
              <h2>{type} Posts</h2>
              { posts.map((p) => <p key={p.id}><b>{p.title}</b>: {p.body}</p>) }
            </div>
  }

  static propsFn(props, key, req) {
    return {
      store: storeOrState(req).posts
    };
  }
};

export default render("post-list", PostList);
