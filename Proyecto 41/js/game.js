class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();
                 image(back_img, 0, 0, 1000, 800);
                 var x =100;
                 var y=200;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500-allPlayers[plr].distance;
                     y=500;
                     
                     players[index -1].x = x;
                     players[index - 1].y = y;
                       
                     if(index === player.index){
                         
                       //add code to display the player's name on the respective basket.
                       fill("#00FF00");
                       textSize(25);
                       strokeWeight(5);
                       stroke("black");
                       text(allPlayers[plr].name, x - 40, y + 30);
                     }
                     else {
                        fill("#FF0000");
                        textSize(25);
                        strokeWeight(5);
                        stroke("black");
                        text(allPlayers[plr].name, x - 40, y + 30);
                     }
                    
                      
                 
                 }
                
                
                 

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
                 if (frameCount % 20 === 0) {
                     fruits = createSprite(random(100, 1000), 0, 100, 100);
                     fruits.velocityY = 6;
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit1", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit1", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit1", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit1", fruit5_img);
                         break;
                     }
                     fruitGroup.add(fruits);
                     
                 }
                 
                  if (player.index !== null) {
                    for (var i = 0; i < fruitGroup.length; i++) {
                        if (fruitGroup.get(i).isTouching(players)) {
                            var index = 0;
                            for (var plr in allPlayers) {
                                index = index + 1;
                                if (players[index - 1].isTouching(fruitGroup) && index == player.index) {
                                    player.score += 10;
                                    player.update();
                                }
                                fill("blue");
                                strokeWeight(3);
                                stroke("black");
                            }
                            fruitGroup.get(i).destroy();
                            
                        }
                    }
                    fill("#00FF00");
                    var p1score;
                    var Player1ScoreRef = database.ref("players/player1/score");
                    Player1ScoreRef.on("value", (data)=> {
                        p1score = data.val();
                    });
                    var p1name;
                    var Player1NameRef = database.ref("players/player1/name");
                    Player1NameRef.on("value", (data)=> {
                        p1name = data.val();
                    });

                    var p2score;
                    var Player2ScoreRef = database.ref("players/player2/score");
                    Player2ScoreRef.on("value", (data)=> {
                        p2score = data.val();
                    });
                    var p2name;
                    var Player2NameRef = database.ref("players/player2/name");
                    Player2NameRef.on("value", (data)=> {
                        p2name = data.val();
                    });
                    fill("blue");
                    textSize(30);
                    strokeWeight(5);
                    stroke("Black");
                    text(p1name + " : " + p1score, 100, 100);
                    text(p2name + " : " + p2score, 100, 200);
                    if (p1score >= 500) {
                        game.update(2);
                        gameState = 2;
                        winner = p1name;
                        var Player1ScoreRef = database.ref("players/player2");
                        Player1ScoreRef.update({
                            score: 500
                        });
                    }
                    else if (p2score >= 500) {
                        game.update(2);
                        gameState = 2;
                        winner = p2name;
                        var Player2ScoreRef = database.ref("players/player2");
                        Player2ScoreRef.update({
                            score: 500
                        });
                    }
                  }
                

         
         
        
         

    }

    end(){
       console.log("Game Ended");
       textSize(30);
       fill("yellow");
       noStroke();
       textAlign(CENTER);
       text("Game Over, winner is " + winner, camera.position.x, displayHeight / 4);
    }
}
