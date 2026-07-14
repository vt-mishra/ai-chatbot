import React from "react";

import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";
import ImageMessage from "./ImageMessage";

function Message(props) {

  if (
    props.role !== "user" &&
    props.type === "image"
  ) {
    return <ImageMessage {...props} />;
  }

  if (props.role === "user") {
    return <UserMessage {...props} />;
  }

  return <AssistantMessage {...props} />;
}

export default React.memo(Message);