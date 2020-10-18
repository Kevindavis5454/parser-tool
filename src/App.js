import React from 'react';
import "./main.css";

class App extends React.Component {

  /* Split input at Line Breaks, Remove White Space placeholders */

  parseConfig = e => {
    e.preventDefault();
    let splitted = document.getElementById('original-config-file').value.split("\n");
    let whiteSpaceFiltered = splitted.filter(function(str) {
      return /\S/.test(str)
    })
    let commentFiltered = whiteSpaceFiltered.filter(function (item) {
      return item.indexOf("#") !== 0
    })
    this.toArray(commentFiltered)
  }
/* Format into paired useable array and trim strings */

  toArray = (commentFiltered) => {
    let finalArray = []
    for (let i = 0; i < commentFiltered.length; ++i) {
      const splitEquals = commentFiltered[i].split('=')
      let trimmedPair = []
      for (let x = 0; x < splitEquals.length; ++x) {
        const index1 = splitEquals[x].trim().toLowerCase()
        trimmedPair.push(index1)
      }
      finalArray.push(trimmedPair)
    }
    const object = Object.fromEntries(finalArray)
    this.validateObject(object)
  } 

/* Data Validation */

validateObject = (object) => {
  if (object.debug_mode !== "off" && object.debug_mode !== "on" ) {
    return document.getElementById('output-text').insertAdjacentText('beforeend', "Error! Invalid entry for debug_mode")
  }
  if (object.debug_mode == "off") {
    object.debug_mode = false
  }
  if (object.debug_mode == "on") {
    object.debug_mode = true
  }
  if (object.verbose != "true" && object.verbose != "false") {
    return document.getElementById('output-text').insertAdjacentText('beforeend', "Error! Invalid entry for verbose")
  }
  if (object.verbose === "true") {
    object.verbose = true
  } 
  if (object.verbose === "false") {
    object.verbose = false
  }
  if (object.test_mode !== "on" && object.test_mode !== "off") {
    return document.getElementById('output-text').insertAdjacentText('beforeend', "Error! Invalid entry for test_mode")
  }
  if (object.test_mode === "on") {
    object.test_mode = true
  } 
  if (object.test_mode === "off") {
    object.test_mode = false
  }
  if (object.send_notifications !== "yes" && object.send_notifications !== "no") {
    return document.getElementById('output-text').insertAdjacentText('beforeend', "Error! Invalid entry for send_notifications")
  }
  if (object.send_notifications === "yes") {
    object.send_notifications = true
  } 
  if (object.send_notifications === "no") {
    object.send_notifications = false
  }
  object.server_id = parseInt(object.server_id)
  object.server_load_alarm = parseFloat(object.server_load_alarm)
  if (isNaN(object.server_id)) {
    return document.getElementById('output-text').insertAdjacentText('beforeend', "Error! Invalid entry for server_id")
  }
  if (isNaN(object.server_load_alarm)) {
    return document.getElementById('output-text').insertAdjacentText('beforeend', "Error! Invalid entry for server_load_alarm")
  }
  return document.getElementById('output-text').insertAdjacentText('beforeend', JSON.stringify(object))
}
  
copyToClipboard = e => {
  e.preventDefault()
  let copyText= document.getElementById("output-text")
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy")
  alert("Object Copied!")
}

clearTextOutput = () => {
  const div = document.getElementById("output-text")
  while (div.firstChild) {
    div.removeChild(div.firstChild)
  }
  
}

clearTextInput = () => {
  document.getElementById("original-config-file").value = ""
}

  render () {
    return(
        <div className="main-div">
          <div className="top-wrapper">
            <div className="config-div">
              <textarea type="text" id="original-config-file"></textarea>
              <button onClick={this.parseConfig} id="parse-button">Parse</button>
              <button onClick={this.clearTextInput} id="clear-button">Clear</button>
            </div>
            <div id="output-div">
              <textarea id="output-text">
              </textarea>
                <button onClick={this.copyToClipboard} id="clipboard-button">Copy to Clipboard</button>
                <button onClick={this.clearTextOutput} id="clear-button">Clear</button>
              
            </div>
        </div>
      </div>
    )
  }
}

export default App;
