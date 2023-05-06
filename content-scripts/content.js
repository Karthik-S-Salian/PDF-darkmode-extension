let cover = document.createElement("div"); 

chrome.storage.local.get('pdf-mode', function(mode) {
    if (mode)
        if (mode['pdf-mode']==="dark")
            document.body.appendChild(cover);
  });

let css = ` 
    position: fixed; 
    pointer-events: none; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%; 
    background-color: white;
    mix-blend-mode:difference;
    z-index: 1; 
` ;

cover.setAttribute("style", css);
cover.setAttribute("id","dark-mask");


chrome.storage.local.get('pdf-mode', function(mode) {
    if (mode==="dark")
    {
        document.body.appendChild(cover);
    }
  });


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    let mask=document.querySelector("#dark-mask");

    if (mask){
        if(request.mode==="light"){
            document.body.removeChild(mask);
        }
    }else{
        if(request.mode==="dark"){
            document.body.appendChild(cover);
        }
    }

    sendResponse({ fromcontent: "all set" });
});

