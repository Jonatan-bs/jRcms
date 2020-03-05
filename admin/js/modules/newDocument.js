import * as formHelper from "../helpers/form.js";

// Events
let events = [];

// Add document
const addDocEvent = {
  element: "#submitNewDocument",
  target: "#newDocumentForm",

  function(e) {
    e.preventDefault();

    const form = document.querySelector(this.target);
    let formData = new FormData(form);

    const category = formData.get("nameID");

    fetch("http://localhost:3000/admin/" + category + "/add", {
      method: "post",
      body: formData
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

events.push(addDocEvent);

export { events };
