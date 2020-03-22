import * as formHelper from "../helpers/form.js";

// Events
let events = [];

// Add document
const addDocEvent = {
  element: "#submitNewDocument",
  target: "#newDocumentForm",

  function(e) {
    e.preventDefault();
    tinyMCE.triggerSave(true, true);
    const form = document.querySelector(this.target);
    let formData = new FormData(form);

    const collection = formData.get("nameID");

    fetch("http://localhost:3000/admin/" + collection + "/add", {
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

// update document
const updateDocEvent = {
  element: "#updateDocument",
  target: "#updateDocumentForm",

  function(e) {
    e.preventDefault();
    tinyMCE.triggerSave(true, true);
    const form = document.querySelector(this.target);
    let formData = new FormData(form);

    const collection = formData.get("collection");
    const id = formData.get("id");

    fetch("http://localhost:3000/admin/" + collection + "/" + id + "/update", {
      method: "post",
      body: formData
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log({ err });
      });
  }
};

events.push(addDocEvent, updateDocEvent);

export { events };
