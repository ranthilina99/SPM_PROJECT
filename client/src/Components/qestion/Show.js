import React from "react";

function Show() {

  const val = this.props.location.questionProps.thisScore.toString();

  return (
    <div>
      <h1>{val}</h1>
    </div>
  );
}

export default Show;