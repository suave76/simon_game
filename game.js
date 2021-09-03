var buttonColor=["green","red","yellow","blue"];
var gamePattern=[];
var userClickedPattern=[];
var keypressCount=0;
var level=0;





function newSequence(){

    level++;
    userClickedPattern=[];
    console.log("level: "+level);
    $("h1").html("level "+level); 
    

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);

    console.log("game color "+randomChosenColor+" :"+gamePattern);
    
    
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}



//fxn to play corrosponding sound
function playSound(name){
    var sound=new Audio("sounds/"+name+".mp3");
    sound.play();
}

//fxn for click animation
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}


//button click eventListener
$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log("user color "+userChosenColor+" :"+userClickedPattern);
    check(userClickedPattern.length-1);
})

//keyboardkey press listener
$(document).keydown(function(){
    if(keypressCount==0){
        keypressCount=1;
        newSequence();
        
    }
})


/*----------GAME LOGIC-----------
 fxn to check*/
function check(checkIndex){
        if(userClickedPattern[checkIndex] == gamePattern[checkIndex]){
            if(userClickedPattern.length==gamePattern.length){
                console.log("-----calling next color------");
                setTimeout(function(){newSequence();},200);
                
            }
            else{
                console.log("----waiting------");
            }
        }
        else{
            level=0;
            gamePattern=[];
            keypressCount=0;
            $("body").addClass("game-over")
            var over=new Audio("sounds/wrong.mp3");over.play();
            
            setTimeout(function(){$("body").removeClass("game-over")},300);
           
            
            $("h1").html("Game Over, Press Any Key to Restart");

        }
}





