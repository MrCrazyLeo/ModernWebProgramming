window.onload = function () {

    // ****************************************************** //
    //   ***************** 迷宫部分的代码 ****************** //
    // ****************************************************** //
    var isOver = true;
    var isCheat = false;
    var result = document.getElementById("mazeResult");
    var start = document.getElementById("startBlock");
    var end = document.getElementById("endBlock");
    var map = document.getElementById("moleBody");
    var walls = document.getElementsByClassName("wall");
    const MSG_WIN = "You Win !";
    const MSG_LOSS = "You Lose !";
    const MSG_CHEAT = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";

    // 撞墙变成红色
    function touchWall(wall) {
        wall.setAttribute("red","");
    
    }

    // 重置墙的颜色
    function resetWall(wall) {
        wall.removeAttribute("red");
    }

    // 设置结果
    function setResult(message) {
        result.textContent = message;
        result.setAttribute("show", "");
    }

    // 重置结果
    function resetResult() {
        result.removeAttribute("show");
    }

    // 设置防作弊监听器
    map.addEventListener("mouseleave", function () {
        if (isOver) {
            return;
        }
        isCheat = true;
    });


    // 为墙设置碰撞监听器
    for (let wall of walls) {
        wall.addEventListener('mouseover', function () {
            if (isOver) {
                return
            }
            touchWall(this);
            setResult(MSG_LOSS);
            isOver = true;
        })
    };

    start.addEventListener('mouseover', function () {
        for (let wall of walls) {
            resetWall(wall);
        }
        resetResult();
        // 游戏开始
        isOver = false;
        isCheat = false;

    });

    end.addEventListener("mouseover", function () {
        if (isOver) {
            return;
        }
        setResult(isCheat ? MSG_CHEAT : MSG_WIN);
        isOver = true;
    });
    
    // ****************************************************** //
    //   ***************** 打地鼠部分的代码 ****************** //
    // ****************************************************** //
   
    var moleMap = document.getElementById("moleBody");
    let mole = null;

    // 初始化打地鼠的分数
    var score = document.getElementById("score");
    var count = 0;
    
    var moleResultShow = document.getElementById("moleResult");

    // “开始”标志
    var controller = document.getElementById("startOrStop");
    var status = true;
    // 为“开始”按键设置监听器
    controller.addEventListener('click', onGameStart);


    // 初始化剩余时间
    var remainTime = 30;
    var time = document.getElementById("time");
    let timer = null;

    const MSG_MOLE_START = 'Now Playing !!!';
    const MSG_MOLE_READY = 'Ready to play ~';
    const MSG_MOLE_END = 'Game Over !!!';
    const MSG_MOLE_HIT = 'Successfully Hit a Mole !';
    const MSG_MOLE_MISS = 'MISS !!! Try again !!!';

    setHole();

    // holes是所有hole的集合对象
    var holes = document.getElementsByClassName("hole")

    function setHole(){
        for(var i = 0; i < 60; i++){
            var element = document.createElement("div");
            element.setAttribute("id", i);
            element.className = "hole";
            // 每个洞注册监听器
            element.addEventListener("click", onBeat);
            map.appendChild(element);
        }
    }

    function setTime(){
        if(!timer){
            remainTime = 30;
        }
        else{
            remainTime--;
            if(remainTime <=  0){
                remainTime = 0;
                time.innerHTML = remainTime;
                status = false;
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
        if(status){
            status = false;
            mole.className = "hole";
            clearInterval(timer);
            timer = null;
            setMoleResult(MSG_MOLE_READY);
            count = 0;
            setScore(0);
            setTime();    
            return;
        }

        status = true;
        // mole在holes产生之后才定义。
        mole = holes[Math.ceil((holes.length-1) * Math.random())];
        mole.className = "mole";
        setMoleResult(MSG_MOLE_START);
        count = 0;
        setScore(0);
        setTime();
        timer = setInterval(setTime, 1000); // 1秒调用一次setTime()函数
    }

    function onBeat(event){
        if(!status){
            return;
        }

        const { id } = event.target.dataset;
        if (id != mole.dataset.id) {
            setScore(--count);
            return;
        }
      
        let index;
      
        do {
            index = Math.ceil((holes.length - 1) * Math.random());
          } while (index === parseInt(mole.dataset.id));
      
        mole.className = "hole";
        mole = holes[index];
        mole.className = "mole";
      
        setScore(++count);

    }


};

