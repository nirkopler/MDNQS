//BACKGROUD JS PAGE

//get query and send results of search
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      getMDNdata(request.query)
        .then((res) => sendResponse({data: res}))
        .catch((err) => sendResponse({err}));
      return true;
  }
);

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