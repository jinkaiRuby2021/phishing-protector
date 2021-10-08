$(function(){
    var flag = false;

    //3~11行目まで追加
    let receive_data=[];
    // getLocalStorageという名前のイベントにメッセージを送る -> 宛先はbackground.js
    let request={
        type: "getLocalStorage",
        value: ""
    };
    chrome.runtime.sendMessage(request, (receive) => {
        //console.log(receive); // background.jsから返ってきた登録済み情報        
        //storageからdataだけ抜き出す
        $.each(receive, function(index, val) {
            receive_data.push(val.data);
        });
    });
        
    //inputタグに文字が入力されるたびにイベントが発火
    $("body").on('input', "input", function(event){
        if (!flag){
            let inputs = [];
            $('input:focus').each(function(index, element){            
                //入手したデータのハッシュ化
                inputs.push(hash(element.value));
                //console.log("hash: " + inputs);                        
            });
            
            //入力値のハッシュと，保存されているクレデンシャルのハッシュを比較
            //一致したらアラームを出す
            for(let i=0; i<receive_data.length; i++){
                if(receive_data[i] == inputs){
                    //console.log(event.currentTarget.value);
                    Alert("The stored personal information and the input values match."); 
                    //保存された個人情報と入力値が一致しました．
                    flag = true;
                    return false;
                }
            }
        }
        
    });

    // SHA-256のハッシュ関数
    function hash(bace){
        const shaobj = new jsSHA("SHA-256","TEXT");
        shaobj.update(bace);
        return shaobj.getHash("HEX");
    }

    
    //inputタグに文字が入力され，フォーカスが外れたタイミングでイベントが発火
    $("body").on('change', "input", function(event) {
        //アラートは一つのページで一度しか表示しない
        if(!flag){
            let type = event.currentTarget.type;
            let name = event.currentTarget.name;

            //入力されたクレデンシャル情報を格納
            let credential;

            //type="password"のinputタグに入力されたクレデンシャル情報を収集
            if(type == 'password'){
                    credential = "password";
            }

            //type="email"のinputタグに入力されたクレデンシャル情報を収集
            if(type == 'email'){
                credential = "email";
            }
            
            //type="text","number","tel"のinputタグに入力されたクレデンシャル情報を収集
            if(type == 'text' || type == 'number' || type == 'tel'){
                
                //name属性からクレデンシャル情報の属性を抽出                    
                if(name.match(/^[\w/:%#\$&\?\(\)~\.=\+\-]*name[\w/:%#\$&\?\(\)~\.=\+\-]*$/i)!=null){
                    credential= "name";
                }
                else if(name.match(/^[\w/:%#\$&\?\(\)~\.=\+\-]*email[\w/:%#\$&\?\(\)~\.=\+\-]*$/i)!=null){
                    credential = "email";
                }
                else if(name.match(/^[\w/:%#\$&\?\(\)~\.=\+\-]*address[\w/:%#\$&\?\(\)~\.=\+\-]*$/i)!=null){
                    credential = "address";
                }
                else if(name.match(/^[\w/:%#\$&\?\(\)~\.=\+\-]*phone[\w/:%#\$&\?\(\)~\.=\+\-]*$/i)!=null){
                    credential = "phone number";
                }
                else if(name.match(/^[\w/:%#\$&\?\(\)~\.=\+\-]*credit( ?card)?[\w/:%#\$&\?\(\)~\.=\+\-]*$/i)!=null){
                    credential = "credit card";
                }
            }

            //クレデンシャル情報が入力されているのを確認出来たら，アラートを表示する
            if(credential){
                Alert("You are now entering your "+credential + ".\n");
                //以下のクレデンシャル情報を入力しようとしています
                flag = true;
            }
        }
    });

    //警告を通知する
    function Alert(sentence){
        sentence = sentence + "Check the domain name and other information to make sure that the site is legitimate."
        let protocol =  $(location).attr('protocol');
        if(protocol.match(/http:/) != null){
            sentence = "Since the communication is not encrypted, there is a possibility of personal information leakage. Please refrain from entering personal information.";
            //暗号化されていない通信なので，個人情報漏えいの可能性があります．
        }
        let request={
            type: "sendNotice",
            value: sentence
        };
        chrome.runtime.sendMessage(request, (receive) => {
            //コールバック処理は現状不要
        });
    }
});