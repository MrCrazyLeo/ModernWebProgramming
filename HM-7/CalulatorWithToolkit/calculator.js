//存储最终计算结果
var result = "";

//除零错误，true表示出错
function divideZero(temp){
    if(temp == Infinity || temp == -Infinity ){
        //结果为无穷大，说明除数是0
        return true;
    }
    return false;
}

// 为省力，封装了下显示的函数。
function show(result) {
    $("#display")[0].innerHTML = result;
}

// 替换原来的window.onload()函数
$(document).ready(function(){
    $("button").click(function(){
        let val = this.innerText;
        switch(val){
            case "_":
                console.log("catch");
                if (result.length > 1) {
                    result = result.substring(0, result.length - 1);
                    show(result);
                }
                else {
                    result = "";
                    show(result);
                }
                break;
            
            case "AC":
                result="";
                show(result);  
                break;
            
            case "×":
                val = "*";
                result += val;
                show(result);
                break;
            
            case "÷":
                val = "/";
                result += val;
                show(result);
                break;

            case "=":
                if(result == '')return;
                else{
                    try{
                        result = eval(result);
                        if(divideZero(result)) show("除数不能是0");
                        else if(result == undefined) show('输入有误');
                        else show(result);
                        result = "";}
                    catch(e){
                        show('输入有误');
                        result = '';
                        console.log(e);   
                    }
                }
                break;
            default:
                    result += val;
                    show(result);
                     
        }


    });    
});
