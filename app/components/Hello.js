import React, { Component } from "react";

import render from "../tools/render";

export class Hello extends Component {
  render() {
    return <div>Hello {this.props.name}</div>
  }
};

export default render("my-example", Hello);
