//test

//get data from background.js and display in popup.html when CLICK ON ICON
window.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['query'], (res) => {
        //send massege to background.js
        chrome.runtime.sendMessage({query: res.query}, (res) => {
        //callback when get results
        console.log(res.data);
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
        if(i < 6) {
            //create result Div
            const resDiv = document.createElement('div');
            resDiv.setAttribute('id', "res-" + i);
            resDiv.setAttribute('class', 'resDiv');

            //create the title Div
            const titleDiv = document.createElement('div');
            titleDiv.setAttribute('class', 'titleDiv');
            resDiv.appendChild(titleDiv);

            //create the summary Div
            const summaryDiv = document.createElement('div');
            summaryDiv.setAttribute('class', 'summaryDiv');
            resDiv.appendChild(summaryDiv);

            // add h1 to titleDiv
            const title = document.createElement('h1');
            title.setAttribute('class', 'title');
            title.setAttribute('id', "title-" + i);
            title.onclick = () => {toggleSummary(i)};
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
    });
}

function toggleSummary(id) {
    const s = document.getElementById("summary-" + id);
    const containerCount = document.getElementById("container").childElementCount;
    for (let res = 0; res < containerCount; res++) {
        if(res != id) {
            document.getElementById("summary-" + res).style.display = "none";
            s.style.display = "none";
        }
    }
    if (s.style.display === "none") {
        s.style.display = "block";
    } else {
        s.style.display = "none";

  }
}