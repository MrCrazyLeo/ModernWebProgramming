$(document).ready(function(){
    // ****************************************************** //
    //   ***************** 迷宫部分的代码 ****************** //
    // ****************************************************** //
    var isOver = true;
    var isCheat = false;
    var result = $("#mazeResult");
    var start = $("#startBlock");
    var end = $("#endBlock");
    var map = $("#mazeContainer");
    // var map = document.getElementById("mazeContainer");
    var walls = $(".wall");
    // var walls = document.getElementsByClassName("wall");
    const MSG_WIN = "You Win !";
    const MSG_LOSS = "You Lose !";
    const MSG_CHEAT = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";



    function mazeGameStart(){
        // 初始化
        resetWall();
        resetResult();
        // 游戏开始
        isOver = false;
        isCheat = false;
    }

    function mazeGameOver(){
        if (isOver) {
            return;
        }
        setResult(isCheat ? MSG_CHEAT : MSG_WIN);
        isOver = true;
    }

    // 撞墙变成红色
    function touchWall(wall) {
        wall.setAttribute("red","");

    }

    // 重置墙的颜色
    function resetWall() {
        for (let i = 0;  i < walls.length; i += 1 ) {
            walls[i].removeAttribute("red");
        }
    }

    // 设置结果
    function setResult(message) {
        result[0].textContent = message;
        result[0].setAttribute("show", "");
    }

    // 重置结果
    function resetResult() {
        result[0].removeAttribute("show");
    }

    //作弊判断
    function IsCheated(){
        
        if (isOver) {
            return;
        }
        isCheat = true;  
        console.log("作弊了，老铁"); 
    }  

    // 为游戏区域设置监听器，当鼠标脱离游戏区域时判为作弊
    map.mouseleave(IsCheated); 

    // 为墙体设置碰撞监听器。
    function mapCollision(){
        if(isOver)return;
        touchWall(this);
        setResult(MSG_LOSS);
        isOver = true;
    }

    walls.mouseover(mapCollision);
        
    //开始按键
    start.mouseover(mazeGameStart);

    //结束按键
    end.mouseover(mazeGameOver);


    // ****************************************************** //
    //   ***************** 打地鼠部分的代码 ****************** //
    // ****************************************************** //

    var moleMap = $("#moleBody");
    let mole = null;

    // 初始化打地鼠的分数
    var score = $("#score")[0];
    var count = 0;
    
    var moleResultShow = $("#moleResult")[0];

    // “开始”标志
    var controller = $("#startOrStop");
    var MoleStartStatus = false;
    


    // 初始化剩余时间
    var remainTime = 30;
    var time = $("#time")[0];
    let timer = null;

    const MSG_MOLE_START = 'Now Playing !';
    const MSG_MOLE_READY = 'Ready to play ~';
    const MSG_MOLE_END = 'Game Over !';
    const MSG_MOLE_HIT_1 = 'Successfully Hit !';
    const MSG_MOLE_HIT_2 = 'Good !';
    const MSG_MOLE_HIT_3 = 'Wonderful !!';
    const MSG_MOLE_HIT_4 = 'Excellent !!!';
    const MSG_MOLE_MISS = 'MISS...';

    var holes = $('.hole');

    function setHole(){
       for(let i = 0; i<60; i+=1){
           //console.log("hi");
           var element = document.createElement("div");
           element.setAttribute("data-id", i); //HTML5 data-*属性，用于存储私有页面的自定义数据。
           element.className = "hole"; 
           element.addEventListener("click", onBeat);
           moleMap[0].appendChild(element);
       };
    };

    setHole();
    holes.click(onBeat);

    // 为“开始”按键设置监听器
    controller.click(onGameStart);



    function setTime(){
        if(!timer){
            remainTime = 30;
        }
        else{
            remainTime--;
            if(remainTime <=  0){
                remainTime = 0;
                time.innerHTML = remainTime;
                MoleStartStatus = false;
                mole.className = "hole";
                clearInterval(timer);
                timer = null;
                setMoleResult(MSG_MOLE_END);
                count = 0;
            }
        }
        time.innerHTML = remainTime;
    }

    function setMoleResult(message){
        moleResultShow.innerHTML = message;
    }

    function setScore(count){
        score.innerHTML = count;
    }

    function onGameStart(){
        // 在游戏开始按下，判断为终止，清除掉定时器！！
        if(MoleStartStatus){
            MoleStartStatus = false;
            mole.className = "hole";
            clearInterval(timer);
            timer = null;
            setMoleResult(MSG_MOLE_READY);
            count = 0;
            setScore(0);
            setTime();    
            return;
        }

        MoleStartStatus = true;
        // mole在holes产生之后才定义。
        holes = $(".hole");        
        mole = holes[Math.ceil((holes.length-1) * Math.random())];
        mole.className = "mole";
        setMoleResult(MSG_MOLE_START);
        count = 0;
        setScore(0);
        setTime();
        timer = setInterval(setTime, 1000); // 1秒调用一次setTime()函数
    }

    var cheer = 1;
    var MSG_MOLE_HIT = MSG_MOLE_HIT_1;
    function CheerUp(){
        if(cheer == 5){
            cheer = 1;
        }
        switch(cheer){
            case 2:
                MSG_MOLE_HIT = MSG_MOLE_HIT_2;break;
            case 3:
                MSG_MOLE_HIT = MSG_MOLE_HIT_3;break;  
            case 4:
                MSG_MOLE_HIT = MSG_MOLE_HIT_4;break;
            default:
                MSG_MOLE_HIT = MSG_MOLE_HIT_1; 
        }
        cheer ++;
        return MSG_MOLE_HIT;
    }

    function onBeat(event){
        //console.log('OnBeat');
        if(!MoleStartStatus){
            return;
        }

        const { id } = event.target.dataset;
        if (id !== mole.dataset.id) {
            console.log("MISS...");
            setScore(--count);
            setMoleResult(MSG_MOLE_MISS);
            return;
        }
      
        let index = 0;
        console.log("Beat one!");
        do {
            index = Math.ceil((holes.length - 1) * Math.random());
          } while (index === parseInt(mole.dataset.id));// 如果随机生成的id恰好等于原本的id，则循环代码块随机再生成一个id，直到跟原本id不同为止
      
        mole.className = "hole";
        mole = holes[index];
        mole.className = "mole";
      
        setScore(++count);
        setMoleResult(CheerUp());

    }
});




