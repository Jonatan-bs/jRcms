import * as formHelper from "../helpers/form.js";

// Events
let events = [];

// Add field
const addFieldEvent = {
  element: "#submitNewDocument",
  target: "#newDocumentForm",

  function(e) {
    e.preventDefault();

    const form = document.querySelector(this.target);
    let formData = formHelper.JSONstring(form);
    formData = JSON.parse(formData);
    console.log(formData);

    const category = formData.nameInDoc;
    delete formData.nameInDoc;

    fetch("http://localhost:3000/admin/" + category + "/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

events.push(addFieldEvent);

export { events };
