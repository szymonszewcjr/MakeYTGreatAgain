let d = document;
let isEnabled = d.getElementById("switch0");
let oldViewsAndDate = d.getElementById("switch1");
let removeCommentTeaser = d.getElementById("switch2");
let oldDescription = d.getElementById("switch3");
let seamlessSubBox = d.getElementById("switch4");
let actionsUnderscore = d.getElementById("switch5");
let legacyLoading = d.getElementById("switch6");
updateSwitches();

isEnabled.addEventListener("click",save);
oldViewsAndDate.addEventListener("click",save);
removeCommentTeaser.addEventListener("click",save);
oldDescription.addEventListener("click",save);
seamlessSubBox.addEventListener("click",save);
actionsUnderscore.addEventListener("click",save);
legacyLoading.addEventListener("click", save);


function save(data){

  chrome.storage.sync.set({switch0 : isEnabled.checked}, function() {
    console.log(data.target.id + ' is set to ' + data.target.checked);
  });

  chrome.storage.sync.set({switch1 : oldViewsAndDate.checked}, function() {
    console.log(data.target.id + ' is set to ' + data.target.checked);
  });

  chrome.storage.sync.set({switch2 : removeCommentTeaser.checked}, function() {
    console.log(data.target.id + ' is set to ' + data.target.checked);
  });

  chrome.storage.sync.set({switch3 : oldDescription.checked}, function() {
    console.log(data.target.id + ' is set to ' + data.target.checked);
  });

  chrome.storage.sync.set({switch4 : seamlessSubBox.checked}, function() {
    console.log(data.target.id + ' is set to ' + data.target.checked);
  });

  chrome.storage.sync.set({switch5 : actionsUnderscore.checked}, function() {
    console.log(data.target.id + ' is set to ' + data.target.checked);
  });

  chrome.storage.sync.set({switch6 : legacyLoading.checked}, function() {
    console.log(data.target.id + ' is set to ' + data.target.checked);
  });
}
//pull data in content.js, apply to config, and to elements

function updateSwitches(){

  chrome.storage.sync.get(null, function(result) {
  isEnabled.checked = result.switch0;
  oldViewsAndDate.checked = result.switch1;
  removeCommentTeaser.checked = result.switch2;
  oldDescription.checked = result.switch3;
  seamlessSubBox.checked = result.switch4;
  actionsUnderscore.checked = result.switch5;
  legacyLoading.checked = result.switch6;
  });

}



/*
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
*/