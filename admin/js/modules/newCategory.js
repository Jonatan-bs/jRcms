import newFieldSteps from "../helpers/newFieldSteps.js";

let events = [];
export { events };

// ADD FIELD POPUP

const addFieldEvent = {
  element: "#addField",

  function(e) {
    newFieldSteps();
  }
};
events.push(addFieldEvent);
