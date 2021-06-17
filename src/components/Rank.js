import React from "react";

const Rank = (props) => {
  return (
    <React.Fragment>
      <div className="white f3 .b">
        <div className="white f1 ">
          {`${props.name} ,your current entry count is`} {props.entries}
        </div>
        {props.cname
          ? `Celebrity found is ${props.cname} with an accuracy of ${props.probability}%.`
          : `Please paste the URL below`}
      </div>
    </React.Fragment>
  );
};
export default Rank;
