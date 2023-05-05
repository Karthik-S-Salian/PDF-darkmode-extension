const toggleButton=document.querySelector(".btn-color-mode-switch input[type='checkbox']");

chrome.storage.local.get('pdf-mode', function(mode) {
    if (mode)
        toggleButton.checked=(mode['pdf-mode']==="dark")?true:false;
  });

toggleButton.addEventListener('change', function() {
    const mode=this.checked?"dark":"light"

    document.body.className=`${mode}-mode`;
    chrome.storage.local.set({"pdf-mode": mode});

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                "mode":mode
            },
            function(response) {
                setTimeout(()=>window.close(),400)
            }
        );
        });
  });





