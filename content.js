$(function(){
    //inputタグに文字が入力されるたびにイベントが発火
    $("body").on('input', "input", function(event){
        //入力値のハッシュと，保存されているクレデンシャルのハッシュを比較

        //一致したらアラートを出す
        if(false){
           alert("保存されたクレデンシャル情報と入力値が一致しました．"); 
        }
    
    });

    //Todo:動的に生成されたIframe中のイベントを取得する
    /*
    $("iframe").on('load', function(){
        const jsInitCheckTimer = setInterval(jsLoaded, 1000);
        function jsLoaded() {
            if ($("body").contents().find("iframe").find("input") == null) {
                clearInterval(jsInitCheckTimer);
            }
            console.log($("body").contents().find("iframe").find("input"));
        }
//        console.log($("body").contents().find("div").find("input"));
    });*/

    
    var flag = false;
    //inputタグに文字が入力され，フォーカスが外れたタイミングでイベントが発火
    $("body").on('change', "input", function(event) {
        //アラートは一つのページで一度しか表示しない
        if(!flag){
             //入力されたクレデンシャル情報を格納
            let credentials = [];

            //type="password"のinputタグに入力されたクレデンシャル情報を収集
            $('input[type="password"]:enabled').each(function(index,element){
                if(element.value){
                    credentials.push("password:" +element.value);
                }
            });

            //type="email"のinputタグに入力されたクレデンシャル情報を収集
            $('input[type="email"]:enabled').each(function(index,element){
                if(element.value){
                    credentials.push("email:" +element.value);
                }
            });

            //type="text","number","tel"のinputタグに入力されたクレデンシャル情報を収集
            $('input[type="text"],[type="number"],[type="tel"]:enabled').each(function(index,element){
                let name = element.name;
                if(element.value){
                    //name属性からクレデンシャル情報の属性を抽出                    
                    if(name.match(/^[\w/:%#\$&\?\(\)~\.=\+\-]*name[\w/:%#\$&\?\(\)~\.=\+\-]*$/)!=null){
                        credentials.push("name:"+element.value);
                    }
                    else if(name.match(/^[\w/:%#\$&\?\(\)~\.=\+\-]*email[\w/:%#\$&\?\(\)~\.=\+\-]*$/)!=null){
                        credentials.push("email:" + element.value);
                    }
                    else if(name.match(/^[\w/:%#\$&\?\(\)~\.=\+\-]*address[\w/:%#\$&\?\(\)~\.=\+\-]*$/)!=null){
                        credentials.push("address:" + element.value);
                    }
                    else if(name.match(/^[\w/:%#\$&\?\(\)~\.=\+\-]*phone[\w/:%#\$&\?\(\)~\.=\+\-]*$/)!=null){
                        credentials.push("phone number:" + element.value);
                    }
                    else if(name.match(/^[\w/:%#\$&\?\(\)~\.=\+\-]*credit( ?card)?[\w/:%#\$&\?\(\)~\.=\+\-]*$/)!=null){
                        credentials.push("credit card:" + element.value);
                    }
                }
            });

            //クレデンシャル情報が入力されているのを確認出来たら，アラートを表示する
            if(credentials.length){
                alert("以下のクレデンシャル情報を入力しようとしています．\n"+credentials);
                
                flag = true;
            }
        }
    });
});