import * as formHelper from "../helpers/form.js";

// Events
let events = [];

// Add user
const addUser = {
  element: "#jRsignup button",
  target: "#jRsignup",
  function(e) {
    e.preventDefault();
    const form = document.querySelector(this.target);
    const jsonBody = formHelper.JSONstring(form);
    fetch("http://localhost:3000/users/add/", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonBody
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

events.push(addUser);

export { events };
