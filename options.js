$(function(){
  // 保存されているクレデンシャル情報を取得する
  let credentialInfo;
  chrome.storage.local.get(["Info"], function (value) {
    // グローバル変数にデータを格納して，HTML上に表示
    credentialInfo = value.Info;
    printCredentialTable(credentialInfo);

    // デバッグ
    console.log(credentialInfo);
  });

  // クレデンシャル情報の追加ボタンがクリックされた時にイベントが発火
  $('#addButton').click(function(e) {
    // submitの効果を無くす
    e.preventDefault();

    // 必須事項が入力されていなかった場合
    if($('#inputData').val() == ''){
      // addできたことを伝えるアラートを表示
      printAlert("danger", "Failed to add because <strong>required fields</strong> were not filled in. Please check.");
    } else {
      // 入力フォームの値を配列にしてcredentialInfo(2次元配列の形式)に追加
      let addInfo = {data: $('#inputData').val(), tag: $('#inputTag').val(), comment: $('#inputComment').val()};
      credentialInfo.push(addInfo);
  
      // localStorageに保存
      chrome.storage.local.set({"Info": credentialInfo}, function(){});
      //localStorage.setItem("Info", JSON.stringify(credentialInfo));
  
      // HTMLのTableに追加
      addCredentialTable(credentialInfo.length-1, addInfo);
  
      // addできたことを伝えるアラートを表示
      printAlert("primary", "Credential information was <strong>added</strong> correctly.");
    }

    // デバッグ
    console.log(credentialInfo);
  });

  // 登録済みクレデンシャル情報の削除ボタンがクリックされた時にイベントが発火
  $('#infoTable-body').on('click', 'i[id^="deleteButton"]', function(e) {
    // deleteButtonに付与するindex番号を抽出
    let itemId = $(this).attr('id').substr(12);

    // 該当するデータをcredentialInfoから削除してlocalStorageにも反映
    credentialInfo.splice(itemId, 1);
    chrome.storage.local.set({"Info": credentialInfo}, function(){});
    //localStorage.setItem("Info", JSON.stringify(credentialInfo));

    // HTMLのTableを全てクリアして再描画(微妙な実装)
    clearCredentialTable();
    printCredentialTable(credentialInfo);

    // deleteできたことを伝えるアラートを表示
    printAlert("primary", "The specified credential information was <strong>deleted</strong> correctly.");

    // デバッグ
    console.log(credentialInfo);
  });

  // 登録済みクレデンシャル情報の編集ボタンがクリックされた時にイベントが発火
  $('#infoTable-body').on('click', 'i[id^="editButton"]', function(e) {
    // deleteButtonに付与するindex番号を抽出
    let itemId = $(this).attr('id').substr(10);

    // tableItemの子要素を削除してedit用の子要素を追加
    $('#tableItem' + itemId).empty();
    addEditItem(itemId, credentialInfo[itemId]);
  });

  // 編集状態のクレデンシャル情報の戻るボタンがクリックされた時にイベントが発火
  $('#infoTable-body').on('click', 'i[id^="editCompleteButton"]', function(e) {
    // editBackButtonに付与するindex番号を抽出
    let itemId = $(this).attr('id').substr(18);

    // credentialInfo内のデータを変更
    let editedInfo = {data: credentialInfo[itemId].data, tag: $('#editTag' + itemId).val(), comment: $('#editComment' + itemId).val()};
    credentialInfo[itemId] = editedInfo;
    chrome.storage.local.set({"Info": credentialInfo}, function(){});

    // tableItemの子要素を削除してデータ表示用の子要素を追加
    $('#tableItem' + itemId).empty();
    addTableItem(itemId, credentialInfo[itemId]);

    printAlert("primary", "The specified credential information was <strong>edited</strong> correctly.");
  });

  // 編集状態のクレデンシャル情報の戻るボタンがクリックされた時にイベントが発火
  $('#infoTable-body').on('click', 'i[id^="editBackButton"]', function(e) {
    // editBackButtonに付与するindex番号を抽出
    let itemId = $(this).attr('id').substr(14);

    // tableItemの子要素を削除してデータ表示用の子要素を追加
    $('#tableItem' + itemId).empty();
    addTableItem(itemId, credentialInfo[itemId]);
  });

  // 全てのクレデンシャル情報をTableに表示する
  function printCredentialTable(info) {
    $.each(info, function(index, val) {
      addCredentialTable(index, val);
    });
  }

  // 全てのクレデンシャル情報をTableから削除する
  function clearCredentialTable() {
    $('#infoTable-body').empty();
  }

  // 全てのクレデンシャル情報のテーブルセルをTableに追加する
  function addCredentialTable(index, val) {
    $('#infoTable-body').append('<tr id="tableItem'+ index +'"></tr>');
    addTableItem(index, val);
  }

  // 指定されたクレデンシャル情報のセルをTableに追加する
  function addTableItem(index, val) {
    $('#tableItem' + index).append('<td class="align-middle"><span class="badge badge-success">' + val.tag + '</span></td>' +
                                   '<td class="align-middle">' + val.data + '</td>' + 
                                   '<td class="align-middle">' + val.comment + '</td>' + 
                                   '<td class="align-middle"><i class="fas fa-edit" id="editButton'+ index +'"></i></td>' + 
                                   '<td class="align-middle"><i class="fas fa-trash" id="deleteButton'+ index +'"></i></td>');
  }

  // 指定されたクレデンシャル情報のセル(編集バージョン)をTableに追加する
  function addEditItem(index, val) {
    $('#tableItem' + index).append('<td class="align-middle">' + createSelectedForm(index, val.tag) + '</td>' + 
                                   '<td class="align-middle">' + val.data + '</td>' + 
                                   '<td class="align-middle"><input type="text" class="form-control" id="editComment' + index + '" value=' + val.comment +'></td>' + 
                                   '<td class="align-middle"><i class="fas fa-check" id="editCompleteButton'+ index +'"></i></td>' + 
                                   '<td class="align-middle"><i class="fas fa-times" id="editBackButton'+ index +'"></i></td>');
  }

  // selectの入力フォームを作成する
  function createSelectedForm(index, val) {
    let selecter = ["CreditCard", "Name", "Address", "Etc"];
    let str = '<select class="form-control" id="editTag' + index +'">';
    $.each(selecter, function(i, value) { 
      if(val == value) {
        str = str + '<option selected>' + value + '</option>'
      } else {
        str = str + '<option>' + value + '</option>'
      }
    });
    str = str + '</select>';
    return str;
  }

  // 引数で指定されたAlertを作成する
  function printAlert(kind, sentence){
    $('#alert-div').empty();
    $('#alert-div').append('<div class="alert alert-' + kind + '" role="alert">' + sentence + 
                           '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' + 
                           '<span aria-hidden="true">&times;</span>' + 
                           '</button></div>');
  }

});
