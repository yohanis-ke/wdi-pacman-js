// Setup initial game stats
var score = 0;
var lives = 2;
var pellets = 4;


// Define your ghosts here

var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};
// replace this comment with your four ghosts setup as objects

var ghosts = [inky,blinky,pinky,clyde];

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');
  console.log('(d) Eat Dot');
  if (pellets > 0) console.log('(p) Eat Power-Pellet');
  console.log('(1) Eat Inky ' + change(inky.edible));
  console.log('(2) Eat Blinky '+ change(blinky.edible));
  console.log('(3) Eat Pinky '+ change(pinky.edible));
  console.log('(4) Eat Clyde '+ change(clyde.edible));
  console.log('(q) Quit');
}

function change(type) {
  if (type) {
    return '(edible)'
  }else {
    return '(inedible)'
  }
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function GameOver(lives) {
  if (lives < 0) {
    return process.exit();
  }
}

function eatPellet() {
  if (pellets < 1) return console.log('\nNo more pellets');
  score += 50;
  ghosts.forEach(function(ghost) {
    ghost.edible = true;
  })
  pellets -- ;
}

function eatGhost(ghost) {
  if (ghost.edible){
    console.log('\n'+ ghost.name +' eaten ');
    score += 200
    ghost.edible = false
  }
  else{
    console.log('\nLife lost');
    lives--;
    GameOver(lives)
  }
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      eatPellet();
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
