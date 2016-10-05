import { observer } from "mobx-react";
import React, { Component } from "react";

import { postsStoreFor } from "../stores";
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
      store: postsStoreFor(props.type, req)
    };
  }
};

export default render("post-list", PostList);
