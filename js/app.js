let collision = 0;
let level = 0;
let levelCounter = document.querySelector('.level');
const life = document.querySelectorAll(".fa-heart");
// Get the modal
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
let highLevel = document.querySelector(".highLevel");
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //reset position of enemy for when they go off canvas.
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 400);
    }
    // Check for collision between player and enemies and keep collision count.
    if (player.x < this.x + 50 && player.x + 50 > this.x && player.y < this.y + 25 && 25 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
        collision++;
        // console.log(level);
        if (collision == 1) {
            life[2].style.color = "#000000FF";
        }
        if (collision == 2) {
            life[1].style.color = "#000000FF";
        }
        if (collision == 3) {
            life[0].style.color = "#000000FF";
            modal.style.display = "block";
            collision = 0;
            levelCounter.innerHTML = "Level : " + level;
            document.getElementById("highLevel").innerHTML = level;
            for (let i = 0; i < 3; i++) {
                life[i].style.color = "#FF000E";
            }
            level = 0;
            levelCounter.innerHTML = "Level : " + level;
        }
    }
};
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.player = 'images/char-boy.png';
}
Player.prototype.update = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.y > 380) {
        this.y = 380;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    // Check if player reached top of the canvas
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
        level++;
        levelCounter.innerHTML = "Level : " + level;
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyPosition = [60, 140, 220];
enemyPosition.forEach(function(locY) {
    enemy = new Enemy(0, locY, 150 + Math.floor(Math.random() * 700));
    allEnemies.push(enemy);
});
var player = new Player(200, 380);
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    }
    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    }
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    }
    if (this.y < 0) {
        setTimeout(function() {
            this.x = 200;
            this.y = 402;
        }, 600);
    }
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});