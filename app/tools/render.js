import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";

import hasDocument from "./hasDocument";
import clientInitialState from "../stores/clientInitialState";

let __tags = [];
let __id = 0;

export default function render (tag, Comp) {
  if (hasDocument) {
    document.createElement(tag);

    const nodes = Array.from(document.getElementsByTagName(tag));
    nodes.map((node, i) => renderNode(tag, Comp, node, i));
  } else {
    __tags = [...__tags, {
      query: tag,
      func: (node, req) => serverRenderNode(tag, Comp, node, req)
    }];
  }

  return Comp;
}

function renderNode (tag, Comp, node, i) {
  let attrs = Array.prototype.slice.call(node.attributes);
  let props = {
    key: `${ tag }-${ i }`,
  };

  attrs.map((attr) => props[attr.name] = attr.value);

  if (typeof Comp.propsFn === "function") props = {
    ...props,
    ...Comp.propsFn(props, i),
  };

  if (!!props.class) {
    props.className = props.class;
    delete props.class;
  }

  ReactDOM.render(
    <Comp { ...props }/>,
    node
  );
}

function serverRenderNode (tag, Comp, node, req) {
  let props = node.getAttributes();
  __id++;

  if (typeof Comp.propsFn === "function") props = {
    ...props,
    ...Comp.propsFn(props, __id, req),
  };

  if (!!props.class) {
    props.className = props.class;
    delete props.class;
  }

  const shouldServerRenderStatic = (typeof Comp.shouldServerRenderStatic === "function")
    ? Comp.shouldServerRenderStatic(props, req)
    : false;

  const renderTo = (shouldServerRenderStatic)
    ? "renderToStaticMarkup"
    : "renderToString";

  const nodeStream = node.createStream({outer: shouldServerRenderStatic});

  try {
    const html = ReactDOMServer[renderTo](
      <Comp { ...props }/>
    );

    nodeStream.end(html);
  } catch (err) {
    nodeStream.end();

    console.log("Rendered tag failed", tag, err);
  };
}

export function knownTags() {
  return __tags.concat(clientInitialState);
}
