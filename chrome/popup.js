// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */

function httpPostAsync(body, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          document.getElementById("animate").innerHTML = xmlHttp.responseText;
          // callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("POST", "https://www.googleapis.com/prediction/v1.6/projects/camel-paper/trainedmodels/final-camel/predict?key=AIzaSyAdrK88leKmMObW3J9UK0xBdAYQ1Zzxuco", true); // true for asynchronous 
    xmlHttp.send(body);
}


var request = gapi.client.request({
      'method': 'POST',
      'path': 'https://www.googleapis.com/prediction/v1.6/projects/camel-paper/trainedmodels/final-camel/predict',
      'params': {
        'input': {
          'csvInstance': [ ]
        }
      }
    });

function start() {
  // Initializes the client with the API key and the Translate API.
  gapi.client.init({
    'apiKey': 'AIzaSyAdrK88leKmMObW3J9UK0xBdAYQ1Zzxuco',
    'clientId': '2e7b991052aa2a2cbfa22940e7848482806f47a2'
  }).then(function() {
    // Executes an API request, and returns a Promise.
    // The method name `language.translations.list` comes from the API discovery.
    return request;
  }).then(function(response) {
    console.log(response.result.data);
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
};

function queryTrainedModel(query) {
  // Replace this value with the project number listed in the Google
  // APIs Console project.
  var projectNumber = 'XXXXXXXX';
  var id = 'final-camel';

  var prediction = Prediction.Trainedmodels.predict(
      {
        input:
          {
            csvInstance: [query]
          }
      },
      projectNumber,
      id);
  // Logs Language: Spanish.
  Logger.log('Language: ' + prediction.outputLabel);
}


document.addEventListener('DOMContentLoaded', () => {
  



    
  });
});


// This extension loads the saved background color for the current tab if one
// exists. The user can select a new background color from the dropdown for the
// current page, and it will be saved as part of the extension's isolated
// storage. The chrome.storage API is used for this purpose. This is different
// from the window.localStorage API, which is synchronous and stores data bound
// to a document's origin. Also, using chrome.storage.sync instead of
// chrome.storage.local allows the extension data to be synced across multiple
// user devices.
// document.addEventListener('DOMContentLoaded', () => {
//   getCurrentTabUrl((url) => {
//     var dropdown = document.getElementById('dropdown');

//     // Load the saved background color for this page and modify the dropdown
//     // value, if needed.
//     getSavedBackgroundColor(url, (savedColor) => {
//       if (savedColor) {
//         changeBackgroundColor(savedColor);
//         dropdown.value = savedColor;
//       }
//     });

//     // Ensure the background color is changed and saved when the dropdown
//     // selection changes.
//     dropdown.addEventListener('change', () => {
//       changeBackgroundColor(dropdown.value);
//       saveBackgroundColor(url, dropdown.value);
//     });
//   });
// });
