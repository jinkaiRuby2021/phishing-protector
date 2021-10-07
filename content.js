$(function(){

    //3~11行目まで追加
    let receive_data=[];
    // getLocalStorageという名前のイベントにメッセージを送る -> 宛先はbackground.js
    chrome.runtime.sendMessage('getLocalStorage', (receive) => {
        //console.log(receive); // background.jsから返ってきた登録済み情報        
        //storageからdataだけ抜き出す
        $.each(receive, function(index, val) {
            receive_data.push(val.data);
        });
    });
        
    //inputタグに文字が入力されるたびにイベントが発火
    $("body").on('input', "input", function(event){
        // 18~41行目まで追加・変更
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
                Alert("保存されたクレデンシャル情報と入力値が一致しました．"); 
                return false;
            }
        }
    });

    // SHA-256のハッシュ関数
    function hash(bace){
        const shaobj = new jsSHA("SHA-256","TEXT");
        shaobj.update(bace);
        return shaobj.getHash("HEX");
    }

    
    var flag = false;
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
                Alert("以下のクレデンシャル情報を入力しようとしています．\n"+credential);
                flag = true;
            }
        }
    });

    function Alert(sentence){
        let protocol =  $(location).attr('protocol');
        if(protocol.match(/http:/) != null){
            sentence = sentence + "\nスキームがhttpです．";
        }
        alert(sentence);
    }
});