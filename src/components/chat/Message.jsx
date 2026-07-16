import React from "react";

import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";
import ImageMessage from "./ImageMessage";

function Message(props) {
  if (props.type === "system") {
    return (
      <div
        className="mx-auto my-4 max-w-xl rounded-2xl p-4"
        style={{
          background: "#3b0d0d",
          border: "1px solid #ef4444",
          color: "#fff",
        }}
      >
        <div className="whitespace-pre-line text-sm leading-6">
          {props.text}
        </div>
      </div>
    );
  }

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