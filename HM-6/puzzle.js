$(function(){
    for(let i=0;i<16;i++){
        $("#map").append("<div></div>");
        $("#map").find("div")[i].id = i;
    };

    

    // ********************* 初始化相关 *************************** //
    var PicId = 1;
    var imagePath =  'image/'+ PicId + '.jpg';

    // 画表格map
    var createMap = function(){ 
        for(let i=0; i<4; i= i+1){
            for(let j=0; j<4; j=j+1){
                let id = i*4+j;
                if(id === 15){
                    break;
                }
                //console.log('id: ',id);
                pox_x = i*100;
                pox_y = j*100;
               // console.log(pox_y);
                $(`#${id}`).css({'background-image' : `url(${imagePath})`,'background-position':`${-pox_y}px ${-pox_x}px`}).attr('class','grid');
            }
        };   
    }
    createMap();

    // 重置map
    var resetMap = function(){
        $('#map').empty();
        for(let i=0;i<16;i++){
            $("#map").append("<div></div>");
            $("#map").find("div")[i].id = i;
        };
        createMap();
    }

    // 重置游戏
    var resetGame = function(PicId = 1){
        imagePath =  'image/'+ PicId + '.jpg';
        resetMap();
    }
    
    var gameOver = true; // 一开始“游戏结束”设置为true

    var steps = 0; // 记录操作的次数
    var str_steps = "Step: " + steps;

    var changeSteps = function(flag = 1 ){
        if(flag == 1){
            steps++;}
        else{steps = 0;}
        str_steps = "Step: " + steps;
        $("#steps").text(str_steps);
    }


    // 滑块方向有关的函数
    var down = function(){
        indexBlank = $("#15").index();
        if(Math.floor(indexBlank/4) === 0){
            return;
        }
        $('#map').children()[indexBlank-3].before($('#map').children()[indexBlank]); 
        $('#map').children()[indexBlank].after($('#map').children()[indexBlank-4]);
        changeSteps();
        win();
    }

    var up =function(){
        indexBlank = $("#15").index(); 
        //console.log(indexBlank);
        if(Math.floor(indexBlank/4) === 3){
            return;
        }
        $('#map').children()[indexBlank+3].after($('#map').children()[indexBlank]);
        $('#map').children()[indexBlank].before($('#map').children()[indexBlank+4]);
        changeSteps();
        win();
    }


    var right = function(){
        indexBlank = $("#15").index(); 
        if(indexBlank % 4 === 0){
            return;
        }
        //console.log(indexBlank);
        $('#map').children()[indexBlank-1].before($('#map').children()[indexBlank]);
        changeSteps();
        win();
    }

    var left = function(){
        indexBlank = $("#15").index(); 
        if((indexBlank+1) % 4 === 0){
            return;
        }
        $('#map').children()[indexBlank+1].after($('#map').children()[indexBlank]);
        changeSteps();
        win();
    }

    var min = 0;
    var sec = 0;
    var hour = 0;
    var str_sec = '0';
    var str_min = '0';
    var str_hour = '0';
    var str_time = "Time: 00:00:00";
    var onlyTimer = null; // 全局唯一计时器

    var changeTime = function(){
        str_sec = sec;
        str_min = min;
        str_hour = hour;
         //formatting
        if (sec < 10) {
            str_sec = "0" + sec;
        }
        if (min < 10) {
            str_min = "0" + min;
        }
        if (hour < 10) {
            str_hour = "0" + hour;
        }
        str_time = "Time: " + str_hour + ":" + str_min + ":" + str_sec;
        //console.log(str_time);
        $("#timer").text(str_time);
        sec++;
        if (sec > 59) {
        sec = 0;
        min++;
        }
        if (min > 59) {
        min = 0;
        hour++;
        }

    }

    var timer = function(){
        return setInterval(changeTime, 1000)}; //timer()会开始计时

    var resetTime = function(){
        clearInterval(onlyTimer);
        sec = 0;
        min = 0;
        hour = 0;
        changeTime();
    }

    var randomChoose = function(){
        return Math.floor(Math.random()*15);
    }
    var randomShuffle = function(){
        for(let i =0;i<16;i++){
            random_item = randomChoose();
            console.log(random_item);
            $(`#${i}`).after($(`#${random_item}`)); 
        }
  
    }


    // ****************** 按钮回调函数 *************************** //
    // 更改图片
    var choosePicture = function(){
        if(gameOver === true){
            PicId += 1;
            if(PicId<1 || PicId > 3){
                PicId = 1;
            }
            imagePath = 'image/'+ PicId + '.jpg';
            return imagePath;
        }
        alert("请先“结束游戏”再点击“换个图案”按钮");
        return imagePath;
    }
    
    $("#change").click(function(){
        imagePath = choosePicture();
        if(gameOver == true)resetMap();
    });

    // 游戏开始
    $("#gameStart").click(function(){
        if(gameOver == false){
            return;
        }
        gameOver = false;
        alert("游戏开始，键盘↑↓←→控制滑块，也可以用鼠标控制滑块移动");
        changeSteps(0);
        randomShuffle();
        onlyTimer = timer();
        

    })

    // 游戏终止
    $("#gameOver").click(function(){
        if(gameOver == true){
            return;
        }
        gameOver = true;
        resetGame(PicId);
        resetTime();
        setTimeout(alert, 200, "游戏结束");
        changeSteps(0);
        

    })

    $(document).keydown(function(event){
        if(gameOver === false){
            var keyNum = event.which;   //获取键值
            switch(keyNum){  //判断按键
            case 37: left();break;
            case 38: up();break;
            case 39: right();break;
            case 40: down();break;
            default:
                break;
        
            }
        }
        return; 
    });
    
    // 鼠标控制
    var clickGrid = function(){
        // 获取当前空白块的位置
        indexBlank = $("#15").index();
        var gridID = $(this).attr("id");
        console.log(gridID);
        var currentIndex = $(`#${gridID}`).index();
        switch(currentIndex){  //判断按键
            case indexBlank + 1: left();break;
            case indexBlank + 4: up();break;
            case indexBlank - 1: right();break;
            case indexBlank - 4: down();break;
            default:
                break;
        
            }
    }

    $(".grid").click(clickGrid);

    var check = function(){
        for(let i = 0; i < 16; i++){
            if($(`#${i}`).index() !== i)return false;
        }
        return true;
    }
    
    var win = function(){
        if(check() === true){
            setTimeout(alert, 200, "你赢了，恭喜");
            gameOver = true;
            resetGame(PicId);
            resetTime();
            changeSteps(0);
        }
    }
});


