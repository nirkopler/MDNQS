//test
let moreBtn = 0;
let globalData;

//get data from background.js and display in popup.html when CLICK ON ICON
window.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['query'], (res) => {
        //send massege to background.js
        chrome.runtime.sendMessage({query: res.query}, (res) => {
        //callback when get results
        console.log(res.data);
        //add data to global data
        globalData = res.data;
        //create divs
        createResultContainer(res.data)
        });
    });
});

//create divs of results
function createResultContainer(data) {
    // get container
    const container = document.getElementById('container');
    //if container with content
    (container.children.length != 0) ? container.innerHTML = "" : null;
    //create resDiv For Each Result
    data.forEach((r, i) => {
        //if(i < 3) {createResDiv(r, i)}
        switch (moreBtn) {
            case 0 :
                if(i < 3) {createResDiv(r, i)};
                break;
            
            case 1 :
                if(3 <= i && i < 6) {createResDiv(r, i)};
                break;

            case 2 :
                if(6 <= i && i < 9) {createResDiv(r, i)};
                break;
            
            default :
                if(i < 3) {createResDiv(r, i)};
        }
    });

    //add MORE button inside a div
    const moreButton = document.createElement('a');
    moreButton.setAttribute('id', 'moreBtn');
    moreButton.innerText = 'MORE';
    const moreButtonDiv = document.createElement('div');
    moreButtonDiv.setAttribute('id', 'moreButtonDiv');
    moreButtonDiv.onclick = () => {moreButtonAction()};
    container.appendChild(moreButtonDiv);
    moreButtonDiv.appendChild(moreButton);
}

//create result div and apppend to container
function createResDiv(r, i) {
    //create result Div
    const resDiv = document.createElement('div');
    resDiv.setAttribute('id', "res-" + i);
    resDiv.setAttribute('class', 'resDiv');

    //create the title Div
    const titleDiv = document.createElement('div');
    titleDiv.setAttribute('class', 'titleDiv');
    titleDiv.onclick = () => {toggleSummary(i)}; //adding toggle divs//
    resDiv.appendChild(titleDiv);

    //create the summary Div
    const summaryDiv = document.createElement('div');
    summaryDiv.setAttribute('class', 'summaryDiv');
    resDiv.appendChild(summaryDiv);

    // add h1 to titleDiv
    const title = document.createElement('h1');
    title.setAttribute('class', 'title');
    title.setAttribute('id', "title-" + i);
    title.innerText = r.title;
    titleDiv.appendChild(title);

    // add button to titleDiv
    const button = document.createElement('a');
    button.setAttribute('class', 'btn');
    button.setAttribute('target', '_blank');
    button.innerText = "MDN";
    button.href = r.url;
    titleDiv.appendChild(button);

    // add p to summaryDiv
    const summary = document.createElement('p');
    summary.setAttribute('class', 'summary');
    summary.setAttribute('id', "summary-" + i);
    (i != 0) ? summary.style.display = 'none' : null;
    summary.innerText = r.summary;
    summaryDiv.appendChild(summary);

    //add each result to container
    container.appendChild(resDiv);
}

//toggle results
function toggleSummary(id) {
    const s = document.getElementById("summary-" + id);
    const containerCount = document.getElementById("container").childElementCount;
    //closes all results != current result
    for (let res = 0; res < containerCount; res++) {
        if(res != id) {
            document.getElementById("summary-" + res).style.display = "none";
            s.style.display = "none";
        }
    }
    //toggle current result by click
    (s.style.display === "none") ? s.style.display = "block" : s.style.display = "none";
}

//control results pages
function moreButtonAction() {
    if (moreBtn < 2) {
        moreBtn ++;
        createResultContainer(globalData);
    } else {
        moreBtn = 0;
        createResultContainer(globalData);
    }
}