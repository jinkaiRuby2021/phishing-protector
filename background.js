chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == "getLocalStorage"){
    // 保存されているクレデンシャル情報を取得する
    let credentialInfo = [];
    chrome.storage.local.get(["Info"], function (value) {
      if(value.Info != undefined){
        credentialInfo = value.Info;
      }
      sendResponse(value.Info);
    });
  }else if (request.type == "sendNotice"){
    // 警告を通知する
    let options={
      type: "basic",
      title: "Phishing-Protecter",
      message: request.value,
      iconUrl: "/images/icon48.png",
      priority: 1,
      silent: true,
    };
    chrome.notifications.create(options);
  }
  return true;
});