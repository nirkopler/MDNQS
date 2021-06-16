//BACKGROUD JS PAGE

//get query and send results of search
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      getMDNdata(request.query).then( (res) => sendResponse({data: res}));
      return true;
  }
);

//open popup on click 
chrome.action.setPopup({popup: "popup.html"});

//set context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "id": "Context Manu",
    "title": "MDNQS",
    "contexts": ["selection"]
  });
});

async function getMDNdata(query) {
  const res = await fetch(`https://developer.mozilla.org/api/v1/search?q=${query}&locale=en-US`);
  const data = await res.json()

  // console.log(data);

  let ResultArray = [];
  for (let r of data.documents) {
      ResultArray.push({
          title : r.title,
          url : `https://developer.mozilla.org${r.mdn_url}`,
          summary : r.summary
      })
  }

  // console.log(ResultArray);

  return ResultArray;
}

async function displayResults(foo) {
  const tablePlace = document.getElementById('tablePlace');
  const results = await foo;
  for (let r of results) {
      const newRow = tablePlace.insertRow();
      const resultTitle = newRow.insertCell().innerText = r.title;
      const resultSummery = newRow.insertCell().innerText = r.summary;
      const resultUrl = newRow.insertCell().innerText = r.url;
  }
}

function searchBtn() {
  const tablePlace = document.getElementById('tablePlace');
  const searchInp = document.getElementById('query');
  (tablePlace.children.length != 0) ? document.querySelector('tbody').remove() : null;
  displayResults(getMDNdata(searchInp.value));
}
