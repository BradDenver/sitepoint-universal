import { observer } from "mobx-react";
import React, { Component } from "react";

import { deregisterStore, postsStoreFor } from "../stores";
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

  static shouldServerRenderStatic(props, req) {
    const { store: { loading, posts, type } } = props;
    const hasCompleteData = posts.length && !loading;

    if (hasCompleteData) deregisterStore(`posts.${type}`, req);

    return hasCompleteData;
  }
};

export default render("post-list", PostList);
