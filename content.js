$(function(){
    //type="submit"のinputタグがクリックされたときにイベントが発火
    $('input[type="submit"]').on('click', function(event) {
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

        //type="tel"のinputタグに入力されたクレデンシャル情報を収集
        $('input[type="tel"]:enabled').each(function(index,element){
            if(element.value){
                credentials.push("phone number:" +element.value);
            }
        });

        //type="text","number"のinputタグに入力されたクレデンシャル情報を収集
        $('input[type="text"],[type="number"]:enabled').each(function(index,element){
            if(element.value){
                //name属性からクレデンシャル情報の属性を抽出
                //ToDo:正規表現に変える
                if(element.name == "name" || element.name == "fname" || element.name == "mname" || element.name == "lname"){
                    credentials.push("name:"+element.value);
                }
                else if(element.name == "email"){
                    credentials.push("email:" + element.value);
                }
                else if(element.name == "address" || element.name == "city"){
                    credentials.push("address:" + element.value);
                }
                else if(element.name == "phone" || element.name == "mobile" || element.name == "country-code" || element.name == "area-code" ){
                    credentials.push("phone number:" + element.value);
                }
                else if(element.name == "ccname" || element.name == "cardnumber" || element.name == "cvc" || element.name == "ccmonth" || element.name == "ccyear" || element.name == "exp-date" || element.name == "card-type"){
                    credentials.push("credit card:" + element.value);
                }
                else if(element.name == "username"){
                    credentials.push("username:" + element.value);
                }

            }
        });

        //クレデンシャル情報が入力されているのを確認出来たら，アラートを表示する
        if(credentials.length){
            alert("The following credential information was entered.\n"+credentials);
        }
        
    });    
    
    
});