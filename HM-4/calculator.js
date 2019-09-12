var result = "";

function processExpress(val) {
    if (val == "<-") {
        if (result.length > 1) {
            result = result.substring(0, result.length - 1);
            show(result);
        } 
        else {
            result = "";
            show(result);
        }}
    
    else if(val == "AC"){
        result="";
        show(result);
    }

    else if(val == "="){
        if(result == ''){
            return;
        }
        else{
          result = eval(result);
          show(result);
          result='';
        }
    }
    else{
        result += val;
        show(result);

    }

}
    

function checkOK(result) {
    //后缀表达式
    return 1;
}

function show(result) {
    document.getElementById("display").innerHTML = result;
}