import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { Component } from "react";

import stores from "../stores";
import render from "../tools/render";

@observer
export class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {store: stores.posts};
  }

  render() {
    const store = toJS(this.state.store);
    const { posts, type } = this.state.store;

    return  <div>
              <h2>{type} Posts</h2>
              { posts.map((p) => <p key={p.id}><b>{p.title}</b>: {p.body}</p>) }
            </div>
  }
};

export default render("post-list", PostList);
