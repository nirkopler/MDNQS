//test

//get data from background.js and display in popup.html
document.getElementById('searchBtn').addEventListener("click", () => {
    chrome.storage.sync.get(['query'], (res) => {
        //send massege to background.js
        chrome.runtime.sendMessage({query: res.query}, (res) => {
        //callback when get results
        console.log(res.data);
        displayResults(res.data);
        });
    });
});

//create table of results
function displayResults(data) {
    const tablePlace = document.getElementById('tablePlace');
    //if table with content
    (tablePlace.children.length != 0) ? document.querySelector('tbody').remove() : null;
    //create table in tablePlace
    for (let r of data) {
        const newRow = tablePlace.insertRow();
        const resultTitle = newRow.insertCell().innerText = r.title;
        const resultSummery = newRow.insertCell().innerText = r.summary;
        const resultUrl = newRow.insertCell().innerText = r.url;
    }
}