$(function(){
    //inputタグに文字が入力されるたびにイベントが発火
    $("body").on('input', "input", function(event){
        //入力値のハッシュと，保存されているクレデンシャルのハッシュを比較

        //一致したらアラートを出す
        if(false){
           alert("保存されたクレデンシャル情報と入力値が一致しました．"); 
        }
        console.log(event.currentTarget.value);
    
    });

    
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
                alert("以下のクレデンシャル情報を入力しようとしています．\n"+credential);
                flag = true;
            }
                
            
        }
    });
});