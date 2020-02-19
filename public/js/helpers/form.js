////////////////////
/// Get form inputs and return JSON string
/// containing 'name' and 'value'
////////////////////

export function JSONstring(form) {
  let obj = {};
  const elements = form.querySelectorAll("input, select, textarea");
  for (let i = 0; i < elements.length; ++i) {
    const element = elements[i];
    const name = element.name;
    const value = element.value;

    if (name) {
      obj[name] = value;
    }
  }

  return JSON.stringify(obj);
}

export function JSONstringCollections(form) {
  let arr = [];
  let collections = form.querySelectorAll(".collection");
  for (let i = 0; i < collections.length; i++) {
    let obj = {};
    const collection = collections[i];
    const elements = collection.querySelectorAll(
      "input, select, textarea, checkbox"
    );
    for (let i = 0; i < elements.length; ++i) {
      const element = elements[i];
      let value;
      if (element.type === "checkbox") {
        value = element.checked;
      } else {
        value = element.value;
      }
      const name = element.name;

      if (name) {
        obj[name] = value;
      }
    }
    arr.push(obj);
  }

  return arr;
}

//// convert string to Id
export function string2id(input, output) {
  let prefix = "jr_";

  output.value = input.value.replace(/\W/g, "_").toLowerCase();
  if (input === output && output.value.length < prefix.length) {
    output.value = prefix;
  } else if (output.value.substring(0, prefix.length) != prefix) {
    output.value = prefix + input.value.replace(/\W/g, "_").toLowerCase();
  }
}

// export function fixedPrefix(form) {
//   output.value = input.value.replace(/\W/g, "_").toLowerCase();
// }
