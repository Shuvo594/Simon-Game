
var buttonColor = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userPattern = []
var level = 0
var started = false


$(document).keypress(function(e){
    if (!started){
    $("#level-title").text("Level " + level)
    nextSequence()
    
    started = true
    }
})


function nextSequence(){
    userPattern = [] // we have to make user array empty everytime we call this function
    level ++
    $("#level-title").text("Level " + level)

    var randomNumber = Math.floor(Math.random()*4)
    var randomChosenColor = buttonColor[randomNumber]
    
    gamePattern.push(randomChosenColor)

     $("#" + randomChosenColor).addClass("pressed")
    setTimeout(function(){
        $(".btn").removeClass("pressed");
        
    }, 100);  
    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play(); 

    //console.log("game" + gamePattern)

}

 
$(".btn").click(function(){
    var userChosenColor = this.id
        
    userPattern.push(userChosenColor)
   // console.log("user " + userPattern)
    
    $(this).addClass("pressed")
        setTimeout(function(){
            $(".btn").removeClass("pressed");
                
    }, 100);      
        
        
    var audio = new Audio("sounds/" + this.id + ".mp3");
        audio.play();
        
    checkAnswer(userPattern.length-1);


})
    
        
            


function checkAnswer(currentLevel) {

   // 1st if statement check the element of two array equal or not 
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {

     // console.log("success");

      // 2nd statement check length of array equal or not
      if (userPattern.length === gamePattern.length){

        // Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    }
    else {
        var audio = new Audio("sounds/" + "wrong.mp3");
        audio.play();
        $("body").addClass("game-over")
            setTimeout(function(){
                $("body").removeClass("game-over");
                
        }, 200); 
        
        $("#level-title").text("Game Over, Press any key to restart")
        startOver() 
       

      //console.log("wrong");

    }

}




function startOver(){
    level = 0
    gamePattern = []
    
    started = false
}