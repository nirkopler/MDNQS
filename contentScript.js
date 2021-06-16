//gets selection from user
document.addEventListener('mouseup', () => {
    const selection = document.getSelection ? document.getSelection().toString() :  document.selection.createRange().toString() ;
    if(selection != "") {
        chrome.storage.sync.set({'query': selection}, function() {
            console.log('Value is set to ' + selection);
          });
    }
  })