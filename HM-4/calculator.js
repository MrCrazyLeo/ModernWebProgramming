//存储最终计算结果
var result = "";

// 存储后缀表达式的临时结果
var chooseResult = '';

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
        console.log(result);
        if(result == ''){
            return;
        }
        // 输入的算式经检验没错误，可以计算
        // else if(checkOK(result)){
        //   //计算得到结果
        //   result = eval(result);
        //   //进行除零判断
        //   if(divideZero(result)){
        //       show("除数不能是0");
        //     }
        //   else{
        //       show(result);
        //     }
        //   result='';
        // }
        // else{
        //     show('输入有误');
        //     result = '';
        // }
        else{
            try{
                result = eval(result);
                if(divideZero(result)){
                    show("除数不能是0");
                }
                else{
                    show(result)
                }
                result = '';

            }
            catch(e){
                show('输入有误');
                result = '';
                console.log(e);   
            }
        }
    }
    else{
        // 先把用户输入的语句都添加进来？
        result += val;
        show(result);

    }

}


// 转为逆波兰式   
// true为表达式没问题，false为有问题
function checkOK(result) {
    var myArray = []
    //记录左右括号的flag
    var kuohaoFlag = 0;
    for(var i = 0;i<result.length;i++)
    {
        //遇到加减乘除
        if(result.charAt(i)=='+' || result.charAt(i)=='-' || result.charAt(i)=='*'  || result.charAt(i)=='/' ){
            if(myArray.length>=2){
                //弹出栈顶的两个数，进行运算
                obj1 = myArray.pop();
                obj2 = myArray.pop();
                obj = choose(result.charAt(i),obj1,obj2)
            }
            else{
                //栈里边没有2个元素，说明算式是输入错误的。
                return false;
            }
        }
        //遇到左括号
        if(result.charAt(i) == '('){
            kuohaoFlag++;
        }
        //遇到右括号
        if(result.charAt(i) == ')'){
            kuohaoFlag--;
            console.log(kuohaoFlag);
            if(kuohaoFlag<0){
                return false;
            }
        }
        //遇到小数点
        if(result.charAt(i) == '.'){
            // handleDecimal
        }
        //遇到数字
        else{
            myArray.push(result.charAt(i));
        }
    }
}



//除零错误，true表示出错
function divideZero(temp){
    if(temp == Infinity || temp == -Infinity || temp == 0){
        //结果为无穷大，说明除数是0
        return true;
    }
    return false;
}


//为省力，封装了下显示的函数。
function show(result) {
    document.getElementById("display").innerHTML = result;
}


//根据所遇运算符类型进行处理
function choose(a,b,c){
    switch(a){
        case '+':
            chooseResult = b + c;
            break;
        case '-':
            chooseResult = b - c;
            break;
        case '*':
            chooseResult = b * c;
            break;
        case '/':
            chooseResult = b / c;
            break;

    }
}


//检查输入仅有一个数的情况
function checkOneSymbol(){
    if(result.length == 1){
        if(result.charAt(0) == '+' || result.charAt(0) == '-' || result.charAt(0) == '*' || result.charAt(0) == '/' || result.charAt(0) == '.' || result.charAt(0) == '(' || result.charAt(0) == ')'){
            show("表达式非法!");
            return true;
        }
        return false;
    }
}

//处理小数点的函数
function handleDecimal(){

}


//逆波兰中处理运算符优先级的函数
function prior(opr){
    switch(opr) {
        case '+':
        case '-':
          return 1;//加减的优先级1
        case '*':
        case '/':
          return 2;//乘除的优先级2
        }
}
function cmpWeight(op1, op2){
    return prior(op1)>=prior(op2);
}