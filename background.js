let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

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
      iconUrl: "/images/get_started48.png",
      priority: 1,
      silent: true,
    };
    chrome.notifications.create(options);
  }
  return true;
});