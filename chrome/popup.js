// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;
    var title = tab.title;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');
    console.assert(typeof title == 'string', 'tab.title should be a string');

    callback(url, title);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, (tabs) => {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}



function titleAnimation(repeat) {
  var title = 'checking for impostors';
  var titleRandom = '';
  var possible = "-+*/|}{[]~\\\":;?/.><=+-_)(*&^%$#@!)}";
  var i = 0;
  var id = setInterval(frame, 100);
  function frame() {
    titleRandom = title.substr(0, i);
    for( var j=i; j < title.length; j++ ) { 
      titleRandom += possible.charAt(Math.floor(Math.random() * possible.length)); 
    }
    document.getElementById("animate").innerHTML = titleRandom;
    titleRandom = '';
    if(i === title.length) {
      clearInterval(id);
      if(repeat) {
        setTimeout(titleAnimation, 2000);
      }
    }
    i++;
  }
}

// function httpPostAsync(body, callback)
// {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function() {
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
//           document.getElementById("animate").innerHTML = xmlHttp.responseText;
//           // callback(xmlHttp.responseText);
//         }
//     }
//     xmlHttp.open("POST", "https://www.googleapis.com/prediction/v1.6/projects/camel-paper/trainedmodels/final-camel/predict?key=AIzaSyAdrK88leKmMObW3J9UK0xBdAYQ1Zzxuco", true); // true for asynchronous 
//     xmlHttp.send(body);
// }


// var request = gapi.client.request({
//       'method': 'POST',
//       'path': 'https://www.googleapis.com/prediction/v1.6/projects/camel-paper/trainedmodels/final-camel/predict',
//       'params': {
//         'input': {
//           'csvInstance': [ ]
//         }
//       }
//     });

// function start() {
//   // Initializes the client with the API key and the Translate API.
//   gapi.client.init({
//     'apiKey': 'AIzaSyAdrK88leKmMObW3J9UK0xBdAYQ1Zzxuco',
//     'clientId': '2e7b991052aa2a2cbfa22940e7848482806f47a2'
//   }).then(function() {
//     // Executes an API request, and returns a Promise.
//     // The method name `language.translations.list` comes from the API discovery.
//     return request;
//   }).then(function(response) {
//     console.log(response.result.data);
//   }, function(reason) {
//     console.log('Error: ' + reason.result.error.message);
//   });
// };


document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url, title) => {
    var repeat = true;
    titleAnimation(repeat);

    // const body = {
    //   "input": {
    //     "csvInstance": [
    //       title
    //     ]
    //   }
    // }

    

    // var request = gapi.client.request({
    //   'method': 'POST',
    //   'path': 'https://www.googleapis.com/prediction/v1.6/projects/camel-paper/trainedmodels/final-camel/predict',
    //   'params': body
    // });

    // function start() {
    //   // Initializes the client with the API key and the Translate API.
    //   gapi.client.init({
    //     'apiKey': 'AIzaSyAdrK88leKmMObW3J9UK0xBdAYQ1Zzxuco',
    //     'clientId': '2e7b991052aa2a2cbfa22940e7848482806f47a2'
    //   }).then(function() {
    //     // Executes an API request, and returns a Promise.
    //     // The method name `language.translations.list` comes from the API discovery.
    //     return request;
    //   }).then(function(response) {
    //     console.log(response.result.data);
    //   }, function(reason) {
    //     console.log('Error: ' + reason.result.error.message);
    //   });
    // };

    // // Loads the JavaScript client library and invokes `start` afterwards.
    // gapi.load('client', start);

    // httpPostAsync(body, (result) => {
      // console.log(result);
    // });
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
