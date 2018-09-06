// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4


// Define your ghosts here
var ghosts = [];

newGhost = function(menuOption, name, colour, character) {
  ghost = {
    menu_option: menuOption,
    name: name,
    colour: colour,
    character: character,
    edible: false
  };
  ghosts.push(ghost);
  return ghost;
};

var inky = newGhost(1, "Inky", "Red", "Shadow");
var blinky = newGhost(2, "Blinky", "Cyan", "Speedy");
var pinky = newGhost(3, "Pinky", "Pink", "Bashful");
var clyde = newGhost(4, "Clyde", "Orange", "Pokey");


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
  console.log('Score: ' + score + '     Lives: ' + lives + '\n\nPower-Pellets: ' + powerPellets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if(powerPellets > 0) {
    console.log('(p) Eat Power-Pellet')
  }
  ghosts.forEach(function(ghost) {
    if(ghost.edible === true) {
      edible = 'edible';
    } else {
      edible = 'inedible';
    };
    console.log('(' + ghost.menu_option + ') Eat ' + ghost.name + ' (' + edible + ')');
  });
  console.log('(q) Quit');
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

function eatGhost(ghost) {
  if(ghost.edible === false) {
    console.log('\n' + ghost.colour + ' ' + ghost.name + ' killed Pacman!');
    lives -= 1;
    if(lives === 0) {
      process.exit();
    }
  } else if(ghost.edible === true) {
    score += 200;
    ghost.edible = false;
    console.log('\n' + ghost.character + ' ' + ghost.name + ' was eaten!');
  };
};

function eatPowerPellet() {
  if(powerPellets > 0) {
    score += 50;
    powerPellets -= 1;
    ghosts.forEach(function(ghost) {
      ghost.edible = true;
    });
  } else {
    console.log(' No Power-Pellets Left!');
  };
};


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
      eatPowerPellet();
      break
    case '1':
      eatGhost(ghosts[0]);
      break;
    case '2':
      eatGhost(ghosts[1]);
      break;
    case '3':
      eatGhost(ghosts[2]);
      break;
    case '4':
      eatGhost(ghosts[3]);
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
