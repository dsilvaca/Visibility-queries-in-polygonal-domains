/* eslint-disable no-undef, no-unused-vars */

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.mark = false;
  }

  isMarked() {
    return this.mark;
  }
}
//game segment
let HITBOX = 10;
let game = false;
let gif = null;
let frogGif = null;
let princCoord = [];
let frogCoord = [];
let angle = 0;
let points = [];
let frame = [];
let polygons = [];
let polygonsSave = [];
let POS = 10;
let SIZE = 700;
let quicksortPoint = null;
let segments = [];
let interFrame = [];
let bridges = [];
let lineCross = [];
let segToRemove = [];
let sound1 = null;
let sound2 = null;
let alertSound = null;
let visibleFrog = false;
let victorySound = null;
let gameLevel = -1;
let victoryGif1 = null;
let victoryGif2 = null;
let victoryGif3 = null;
let gifTimer = 0;
let victoryText = "";
let levelSwitch = false;
let font = null;
let cadre = null;

//end game segment

//test segment
let usablePoint = null;
let visibility = [];
let tg = [];
let oldquick = [];
let inprog = false;
let free = false;
let segList = [];
let countation = 0;
let tempSeg = [];
//end test segment

//prerender segment
let firstDemo = true;
let stepText = "";
let polygonsObstacles = [];
let polygoneObs1 = [];
let polygoneObs2 = [];
let polygoneObs3 = [];
let triangulation = false;
let triangu = [];
let firstDualGraph = [];
let secondDualGraph = [];
let firstDual = false;
let secondDual = false;
let thirdDual = false;
let thirdDualGraph = [];
let onlyJunction = false;
let shortestPath = false;

//end prerender

//console.log = function () {};

function setup() {
  createCanvas(windowWidth, windowHeight);

  fill("black");
  textSize(40);

  sound2 = new Audio("/ressources/muzike6.mp3");
  sound1 = new Audio("/ressources/marais.mp3");
  alertSound = new Audio("/ressources/alert.mp3");
  victorySound = new Audio("/ressources/victory2.mp3");

  font = loadFont("ressources/BALTH.TTF");

  triangbox = createCheckbox("Triangulation", false);
  triangbox.position(POS + SIZE, POS);
  triangbox.style("color", "White");
  triangbox.changed(switchTriangu);

  dualFirstButton = createButton("First dual");
  dualFirstButton.position(POS + SIZE + 120 + 10, POS);
  dualFirstButton.size(80, 25);
  dualFirstButton.mousePressed(firstDualB);

  dualSecondButton = createButton("Second dual");
  dualSecondButton.position(POS + SIZE + 100 + 100 + 20, POS);
  dualSecondButton.size(100, 25);
  dualSecondButton.mousePressed(secondDualB);

  juctionBox = createCheckbox("Junction Triangles", false);
  juctionBox.position(POS + SIZE, POS + 30);
  juctionBox.style("color", "White");
  juctionBox.changed(switchJunction);

  dualThirdButton = createButton("Third dual");
  dualThirdButton.position(POS + SIZE + 140 + 10, POS + 30);
  dualThirdButton.size(80, 25);
  dualThirdButton.mousePressed(thirdDualB);

  hourGlassButton = createButton("Shortest paths");
  hourGlassButton.position(POS + SIZE + 80 + 140 + 20, POS + 30);
  hourGlassButton.size(80 + 20, 25);
  hourGlassButton.mousePressed(shortest);

  clearButton = createButton("Clear");
  clearButton.position(POS + SIZE, POS + 30 + 30);
  clearButton.size(80, 25);
  clearButton.mousePressed(clearPolygons);

  gameButton = createButton("Free Game");
  gameButton.position(POS + SIZE + 80 + 10, POS + 30 + 30);
  gameButton.size(80, 25);
  gameButton.mousePressed(startGame);

  gameButton = createButton("Stop Game");
  gameButton.position(POS + SIZE + 80 + 20 + 80, POS + 30 + 30);
  gameButton.size(80, 25);
  gameButton.mousePressed(stopGame);

  level1Button = createButton("Level 1");
  level1Button.position(POS + SIZE, POS + 30 + 30 + 30);
  level1Button.size(80, 25);
  level1Button.mousePressed(level1);

  level2Button = createButton("Level 2");
  level2Button.position(POS + SIZE + 80 + 20, POS + 30 + 30 + 30);
  level2Button.size(80, 25);
  level2Button.mousePressed(level2);

  level2Button = createButton("Level 3");
  level2Button.position(POS + SIZE + 80 + 30 + 80, POS + 30 + 30 + 30);
  level2Button.size(80, 25);
  level2Button.mousePressed(level3);

  gif = loadImage("ressources/principal.gif");
  frogGif = loadImage("ressources/frog.gif");
  victoryGif1 = loadImage("ressources/frogVictory.gif");
  cadre = loadImage("ressources/cadre.png");
  gif.play();
  frogGif.play();
  princCoord.push(100, 100);
  frogCoord.push(500, 500);
  imageMode(CENTER);
  angleMode(DEGREES);
  frame.push(new Point(POS, POS));
  frame.push(new Point(POS, SIZE + POS));
  frame.push(new Point(SIZE + POS, SIZE + POS));
  frame.push(new Point(SIZE + POS, POS));
  polygoneObs1 = [
    [8, 3],
    [3, 8],
    [3, 14],
    [5, 17],
    [2, 20],
    [5, 23],
    [2, 27],
    [9, 29],
    [12, 25],
    [7, 25],
    [8, 23],
    [6, 20],
    [8, 19],
    [13, 20],
    [14, 17],
    [12, 15],
    [6, 16],
    [5, 13],
    [7, 10],
    [9, 11],
    [13, 6]
  ];
  polygoneObs2 = [
    [17, 6],
    [17, 12],
    [21, 13],
    [24, 15],
    [21, 17],
    [17, 17],
    [23, 27],
    [33, 27],
    [33, 22],
    [30, 22],
    [31, 25],
    [26, 25],
    [22, 19],
    [29, 15],
    [21, 9],
    [23, 5],
    [19, 5]
  ];
  polygoneObs3 = [
    [34, 6],
    [32, 8],
    [35, 15],
    [34, 18],
    [31, 18],
    [30, 16],
    [26, 19],
    [29, 19],
    [27, 22],
    [31, 20],
    [36, 20],
    [37, 19],
    [37, 6]
  ];
  triangu = [
    [
      [0, 0],
      [3, 8],
      [8, 3]
    ],
    [
      [0, 0],
      [3, 8],
      [3, 14]
    ],
    [
      [0, 0],
      [2, 20],
      [3, 14]
    ],
    [
      [5, 17],
      [2, 20],
      [3, 14]
    ],
    [
      [0, 40],
      [2, 20],
      [2, 27]
    ],
    [
      [0, 40],
      [9, 29],
      [23, 27]
    ],
    [
      [0, 40],
      [23, 27],
      [33, 27]
    ],
    [
      [40, 40],
      [33, 27],
      [33, 22]
    ],
    [
      [40, 40],
      [33, 22],
      [36, 20]
    ],
    [
      [40, 40],
      [36, 20],
      [37, 19]
    ],
    [
      [40, 0],
      [37, 6],
      [37, 19]
    ],
    [
      [0, 0],
      [8, 3],
      [19, 5]
    ],
    [
      [0, 0],
      [19, 5],
      [23, 5]
    ],
    [
      [0, 0],
      [23, 5],
      [34, 6]
    ],
    [
      [0, 0],
      [34, 6],
      [37, 6]
    ],
    [
      [13, 6],
      [19, 5],
      [17, 6]
    ],
    [
      [13, 6],
      [17, 6],
      [9, 11]
    ],
    [
      [9, 11],
      [17, 12],
      [12, 15]
    ],
    [
      [7, 10],
      [5, 13],
      [12, 15]
    ],
    [
      [17, 12],
      [13, 20],
      [21, 13]
    ],
    [
      [21, 13],
      [21, 17],
      [17, 17]
    ],
    [
      [17, 17],
      [23, 27],
      [13, 20]
    ],
    [
      [8, 19],
      [6, 20],
      [23, 27]
    ],
    [
      [8, 23],
      [12, 25],
      [23, 27]
    ],
    [
      [23, 5],
      [21, 9],
      [32, 8]
    ],
    [
      [32, 8],
      [29, 15],
      [30, 16]
    ],
    [
      [32, 8],
      [31, 18],
      [34, 18]
    ],
    [
      [29, 15],
      [26, 19],
      [22, 19]
    ],
    [
      [26, 19],
      [27, 22],
      [26, 25]
    ],
    [
      [27, 22],
      [31, 25],
      [30, 22]
    ],
    [
      [31, 20],
      [30, 22],
      [33, 22]
    ]
  ];
  firstDualGraph = [
    [
      [183, 483],
      [240, 507]
    ],
    [
      [240, 507],
      [429, 564]
    ],
    [
      [429, 564],
      [541, 459]
    ],
    [
      [541, 459],
      [557, 425]
    ],
    [
      [557, 425],
      [568, 370]
    ],
    [
      [568, 370],
      [589, 298]
    ],
    [
      [589, 298],
      [577, 136]
    ],
    [
      [577, 136],
      [498, 52]
    ],
    [
      [498, 52],
      [482, 87]
    ],
    [
      [482, 87],
      [365, 79]
    ],
    [
      [365, 79],
      [451, 105]
    ],
    [
      [451, 105],
      [392, 120]
    ],
    [
      [392, 120],
      [421, 172]
    ],
    [
      [421, 172],
      [465, 199]
    ],
    [
      [465, 199],
      [476, 206]
    ],
    [
      [476, 206],
      [492, 214]
    ],
    [
      [492, 214],
      [516, 214]
    ],
    [
      [516, 214],
      [516, 214]
    ],
    [
      [465, 199],
      [439, 253]
    ],
    [
      [439, 253],
      [388, 274]
    ],
    [
      [388, 274],
      [383, 324]
    ],
    [
      [383, 324],
      [406, 330]
    ],
    [
      [406, 330],
      [420, 310]
    ],
    [
      [406, 329],
      [425, 369]
    ],
    [
      [425, 369],
      [450, 352]
    ],
    [
      [450, 351],
      [450, 329]
    ],
    [
      [450, 329],
      [479, 327]
    ],
    [
      [479, 327],
      [508, 320]
    ],
    [
      [508, 320],
      [556, 424]
    ],
    [
      [364, 78],
      [287, 72]
    ],
    [
      [287, 72],
      [163, 54]
    ],
    [
      [163, 54],
      [62, 62]
    ],
    [
      [62, 62],
      [40, 112]
    ],
    [
      [40, 112],
      [35, 187]
    ],
    [
      [35, 187],
      [55, 263]
    ],
    [
      [34, 187],
      [19, 352]
    ],
    [
      [19, 352],
      [34, 398]
    ],
    [
      [34, 398],
      [57, 358]
    ],
    [
      [33, 397],
      [39, 475]
    ],
    [
      [39, 475],
      [182, 483]
    ],
    [
      [163, 53],
      [205, 83]
    ],
    [
      [205, 83],
      [262, 91]
    ],
    [
      [262, 91],
      [207, 119]
    ],
    [
      [207, 119],
      [227, 155]
    ],
    [
      [227, 155],
      [198, 201]
    ],
    [
      [198, 201],
      [146, 183]
    ],
    [
      [146, 183],
      [131, 201]
    ],
    [
      [131, 202],
      [119, 232]
    ],
    [
      [197, 201],
      [222, 235]
    ],
    [
      [222, 235],
      [266, 230]
    ],
    [
      [266, 230],
      [264, 260]
    ],
    [
      [264, 260],
      [300, 246]
    ],
    [
      [300, 246],
      [338, 236]
    ],
    [
      [264, 258],
      [253, 302]
    ],
    [
      [253, 302],
      [209, 322]
    ],
    [
      [209, 322],
      [185, 335]
    ],
    [
      [185, 335],
      [185, 355]
    ],
    [
      [185, 355],
      [184, 372]
    ],
    [
      [148, 376],
      [184, 372]
    ],
    [
      [184, 372],
      [202, 394]
    ],
    [
      [202, 394],
      [182, 483]
    ]
  ];
  secondDualGraph = [
    [
      [68, 480],
      [173, 486]
    ],
    [
      [173, 486],
      [217, 411]
    ],
    [
      [217, 411],
      [207, 380]
    ],
    [
      [207, 380],
      [204, 359]
    ],
    [
      [204, 359],
      [205, 341]
    ],
    [
      [205, 341],
      [226, 334]
    ],
    [
      [226, 334],
      [269, 312]
    ],
    [
      [269, 312],
      [261, 263]
    ],
    [
      [261, 263],
      [260, 230]
    ],
    [
      [260, 230],
      [224, 230]
    ],
    [
      [224, 230],
      [198, 201]
    ],
    [
      [198, 201],
      [220, 153]
    ],
    [
      [220, 153],
      [204, 118]
    ],
    [
      [204, 118],
      [259, 94]
    ],
    [
      [259, 94], //
      [202, 79]
    ],
    [
      [202, 79],
      [132, 47]
    ],
    [
      [132, 47],
      [63, 67]
    ],
    [
      [63, 67],
      [38, 113]
    ],
    [
      [38, 113],
      [32, 170]
    ],
    [
      [32, 170],
      [20, 288]
    ],
    [
      [20, 288],
      [32, 426]
    ],
    [
      [32, 426],
      [67, 480]
    ],
    [
      [132, 47],
      [298, 78]
    ],
    [
      [298, 78],
      [424, 86]
    ],
    [
      [424, 86],
      [488, 90]
    ],
    [
      [423, 85],
      [451, 105]
    ],
    [
      [487, 90],
      [544, 40]
    ],
    [
      [544, 40],
      [581, 109]
    ],
    [
      [581, 109],
      [588, 303]
    ],
    [
      [588, 303],
      [563, 350]
    ],
    [
      [563, 350],
      [535, 352]
    ],
    [
      [535, 352],
      [524, 430]
    ],
    [
      [524, 430],
      [347, 541]
    ],
    [
      [347, 541],
      [262, 482]
    ],
    [
      [262, 482],
      [172, 487]
    ],
    [
      [450, 106],
      [398, 123]
    ],
    [
      [397, 122],
      [440, 185]
    ],
    [
      [440, 185],
      [461, 205]
    ],
    [
      [461, 205],
      [437, 254]
    ],
    [
      [437, 254],
      [389, 276]
    ],
    [
      [389, 276],
      [383, 328]
    ],
    [
      [383, 328],
      [404, 343]
    ],
    [
      [404, 343],
      [429, 367]
    ],
    [
      [429, 367],
      [453, 354]
    ],
    [
      [453, 352],
      [452, 327]
    ],
    [
      [452, 327],
      [479, 327]
    ],
    [
      [479, 327],
      [507, 321]
    ],
    [
      [507, 321],
      [535, 351]
    ]
  ];
}

function switchTriangu() {
  if (this.checked()) {
    triangulation = true;
    stepText =
      "This is the first step of the optimised algorithm : \n Triangulating the free space (the space between the obstacles)";
  } else {
    triangulation = false;
  }
}

function firstDualB() {
  stepText =
    "After the triangulation, we need to take the dual planar graph of the triangulation";
  if (!firstDual) {
    firstDual = true;
    secondDual = false;
    thirdDual = false;
    shortestPath = false;
  }
}

function secondDualB() {
  stepText =
    "The second dual is obtained by recursivly removing all the vertices that are degree 1 in the dual planar graph of the triangulation";
  if (!secondDual) {
    firstDual = false;
    secondDual = true;
    thirdDual = false;
    shortestPath = false;
  }
}

function thirdDualB() {
  stepText =
    "The third dual is obtained by removing all vertices of degree 2 from the second dual and replace it by a single edge between the two neighbours";
  if (!thirdDual) {
    firstDual = false;
    secondDual = false;
    thirdDual = true;
    shortestPath = false;
  }
}

function shortest() {
  stepText =
    'The hourglasses are found by taking the vertices of the obstacles that are part of a junction triangle,\n once we have this set of vertices, we connect the vertices from this set that are on the same obstacle  using a shortest path. \nIf we remove the junction triangles, we have the free space divided in multiple subpolygons, \n the ones between the obstacles are called "hourglasses" and the ones between the obstacles \n and the boundaries of the free space are part of the ocean M';
  if (!shortestPath) {
    firstDual = false;
    secondDual = false;
    thirdDual = false;
    shortestPath = true;
  }
}

function switchJunction() {
  if (this.checked()) {
    stepText =
      "Now, we have the junction triangles, these triangles are the ones from the first triangulation in which there is still a vertex (when looking at the third dual) \n PS : you need to disable the triangulation to saw them";
    onlyJunction = true;
  } else {
    onlyJunction = false;
  }
}

function clearPolygons() {
  game = false;
  stopGame();
  firstDemo = true;
  firstDual = false;
  secondDual = false;
  thirdDual = false;
  shortestPath = false;
  polygons = [];
  princCoord = [];
  frogCoord = [];
  angle = 0;
  points = [];
  frame = [];
  polygons = [];
  polygonsSave = [];
  quicksortPoint = null;
  segments = [];
  interFrame = [];
  bridges = [];
  lineCross = [];
}

function RndNmb(a, b) {
  let min = Math.ceil(a);
  let max = Math.floor(b);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGame() {
  stepText =
    "Put minimum 4 points with your mouse (in counter clockwise order) to create a convex polygon. \n Then press the escape button to confirm it, the visibility of the fly will be reduce by the polygon. \n If the fly do not see the frog the frog do not appeared (you can place as many polygons as you like) \n You can move the fly with the arrow keys ";
  nenuphars = [];
  gameLevel = 0;
  visibleFrog = false;
  sound1.play();
  if (!levelSwitch) {
    sound2.play();
    sound2.loop = true;
  }
  sound1.loop = true;
  game = true;
  firstDemo = false;
  POS = 10;
  SIZE = 700;
  frame = [];
  princCoord = [];
  frogCoord = [];
  frogCoord.push(500, 500);
  princCoord.push(100, 100);
  frame.push(new Point(POS, POS));
  frame.push(new Point(POS, SIZE + POS));
  frame.push(new Point(SIZE + POS, SIZE + POS));
  frame.push(new Point(SIZE + POS, POS));
  polygons = [];
  polygons.push([
    new Point(POS + 1, POS + 1),
    new Point(POS + 1, POS + RndNmb(35, 45)),
    new Point(POS + RndNmb(35, 45), POS + RndNmb(35, 45)),
    new Point(POS + RndNmb(35, 45), POS + 1)
  ]);
  polygons.push([
    new Point(POS + 1, POS + SIZE - 1),
    new Point(POS + 1, POS + SIZE - RndNmb(35, 45)),
    new Point(POS + RndNmb(35, 45), POS + SIZE - RndNmb(35, 45)),
    new Point(POS + RndNmb(35, 45), POS + SIZE - 1)
  ]);
  polygons.push([
    new Point(POS + SIZE - 1, POS + SIZE - 1),
    new Point(POS + SIZE - 1, POS + SIZE - RndNmb(35, 45)),
    new Point(POS + SIZE - RndNmb(35, 45), POS + SIZE - RndNmb(35, 45)),
    new Point(POS + SIZE - RndNmb(35, 45), POS + SIZE - 1)
  ]);
  polygons.push([
    new Point(SIZE + POS - 1, POS + 1),
    new Point(POS + SIZE - RndNmb(35, 45), POS + 1),
    new Point(POS + SIZE - RndNmb(35, 45), POS + RndNmb(35, 45)),
    new Point(POS + SIZE - 1, POS + RndNmb(35, 45))
  ]);
}

function level1() {
  startGame();
  stepText = "";
  gameLevel = 1;
  frogCoord = [500, 500];
  let tempoly = [
    [
      [314, 232],
      [229, 351],
      [369, 457],
      [449, 335]
    ],
    [
      [100, 297],
      [53, 370],
      [117, 426],
      [161, 354]
    ],
    [
      [600, 289],
      [536, 345],
      [576, 427],
      [650, 352]
    ],
    [
      [365, 531],
      [308, 602],
      [364, 668],
      [421, 602]
    ],
    [
      [316, 69],
      [265, 133],
      [333, 186],
      [373, 119]
    ]
  ];
  let temp = [];
  for (let poly = 0; poly < tempoly.length; poly++) {
    temp = [];
    for (let point = 0; point < tempoly[poly].length; point++) {
      temp.push(new Point(tempoly[poly][point][0], tempoly[poly][point][1]));
    }
    polygons.push(temp.slice());
  }
}

function level2() {
  startGame();
  stepText = "";
  gameLevel = 2;
  frogCoord = [690, 300];
  princCoord = [30, 100];
  let tempoly = [
    [
      [308, 197],
      [217, 298],
      [345, 415],
      [424, 285]
    ],
    [
      [97, 253],
      [46, 322],
      [111, 390],
      [152, 315]
    ],
    [
      [595, 215],
      [545, 293],
      [593, 369],
      [657, 287]
    ],
    [
      [394, 446],
      [351, 516],
      [420, 569],
      [443, 507]
    ],
    [
      [559, 500],
      [606, 563],
      [653, 505],
      [604, 427]
    ],
    [
      [483, 337],
      [445, 395],
      [492, 447],
      [529, 390]
    ],
    [
      [187, 380],
      [139, 435],
      [194, 482],
      [237, 426]
    ],
    [
      [257, 482],
      [226, 530],
      [264, 566],
      [283, 522]
    ],
    [
      [97, 463],
      [54, 530],
      [105, 575],
      [144, 521]
    ],
    [
      [190, 119],
      [154, 196],
      [197, 223],
      [230, 166]
    ],
    [
      [485, 108],
      [444, 158],
      [496, 206],
      [536, 156]
    ],
    [
      [334, 47],
      [302, 100],
      [349, 148],
      [385, 92]
    ],
    [
      [603, 40],
      [565, 87],
      [609, 132],
      [633, 77]
    ],
    [
      [99, 57],
      [57, 112],
      [105, 144],
      [142, 93]
    ]
  ];
  let temp = [];
  for (let poly = 0; poly < tempoly.length; poly++) {
    temp = [];
    for (let point = 0; point < tempoly[poly].length; point++) {
      temp.push(new Point(tempoly[poly][point][0], tempoly[poly][point][1]));
    }
    polygons.push(temp.slice());
  }
}

function level3() {
  startGame();
  stepText = "";
  gameLevel = 3;
  frogCoord = [610, 400];
  princCoord = [30, 100];
  let tempoly = [
    [
      [233, 238],
      [220, 435],
      [275, 438],
      [277, 241]
    ],
    [
      [392, 246],
      [381, 441],
      [458, 431],
      [451, 247]
    ],
    [
      [247, 479],
      [244, 533],
      [423, 552],
      [425, 474]
    ],
    [
      [91, 369],
      [68, 568],
      [137, 577],
      [148, 372]
    ],
    [
      [524, 378],
      [509, 584],
      [601, 593],
      [585, 383]
    ],
    [
      [452, 169],
      [451, 222],
      [633, 227],
      [630, 159]
    ],
    [
      [50, 152],
      [65, 221],
      [209, 218],
      [177, 147]
    ],
    [
      [254, 146],
      [253, 208],
      [399, 216],
      [402, 152]
    ],
    [
      [173, 15],
      [166, 84],
      [234, 88],
      [237, 13]
    ],
    [
      [406, 13],
      [397, 81],
      [475, 78],
      [471, 13]
    ],
    [
      [523, 274],
      [518, 321],
      [657, 320],
      [656, 270]
    ],
    [
      [378, 615],
      [527, 619],
      [520, 670],
      [362, 664]
    ],
    [
      [117, 614],
      [116, 669],
      [265, 665],
      [258, 608]
    ],
    [
      [27, 270],
      [26, 328],
      [145, 320],
      [139, 275]
    ],
    [
      [547, 42],
      [542, 126],
      [590, 124],
      [589, 37]
    ],
    [
      [71, 50],
      [70, 127],
      [121, 123],
      [122, 49]
    ],
    [
      [636, 403],
      [636, 469],
      [705, 472],
      [702, 401]
    ]
  ];
  let temp = [];
  for (let poly = 0; poly < tempoly.length; poly++) {
    temp = [];
    for (let point = 0; point < tempoly[poly].length; point++) {
      temp.push(new Point(tempoly[poly][point][0], tempoly[poly][point][1]));
    }
    polygons.push(temp.slice());
  }
}

function stopGame() {
  stepText = "";
  gifTimer = 0;
  visibleFrog = false;
  levelSwitch = false;
  sound1.pause();
  sound1.currentTime = 0;
  sound2.pause();
  sound2.currentTime = 0;
  victorySound.pause();
  victorySound.currentTime = 0;
  alertSound.pause();
  alertSound.currentTime = 0;
  polygons = [];
  game = false;
  firstDemo = true;
  princCoord = [];
  angle = 0;
  points = [];
  frame = [];
  polygons = [];
  polygonsSave = [];
  POS = 10;
  SIZE = 700;
  quicksortPoint = null;
  segments = [];
  interFrame = [];
  bridges = [];
  lineCross = [];
  princCoord.push(100, 100);
}

function createLinePoly(poly) {
  for (let i = 0; i < poly.length; i++) {
    line(
      poly[i][0] * 15 + 10,
      poly[i][1] * 15 + POS,
      poly[(i + 1) % poly.length][0] * 15 + POS,
      poly[(i + 1) % poly.length][1] * 15 + POS
    );
  }
}

function createTriangulation(triangl) {
  noFill();
  stroke("red");
  for (let i = 0; i < triangl.length; i++) {
    triangle(
      triangl[i][0][0] * 15 + POS,
      triangl[i][0][1] * 15 + POS,
      triangl[i][1][0] * 15 + POS,
      triangl[i][1][1] * 15 + POS,
      triangl[i][2][0] * 15 + POS,
      triangl[i][2][1] * 15 + POS
    );
  }
  fill("black");
  stroke("black");
}

function createAShort(short) {
  for (let i = 0; i < short.length; i++) {
    line(
      short[i][0][0] * 15 + POS,
      short[i][0][1] * 15 + POS,
      short[i][1][0] * 15 + POS,
      short[i][1][1] * 15 + POS
    );
  }
}

function draw() {
  background("#c0c2c4");
  if (game) {
    fill("#255773");
    rect(POS, POS, 700, 700);
    fill("black");
  }
  if (firstDemo) {
    SIZE = 600;
    frame = [];
    frame.push(new Point(POS, POS));
    frame.push(new Point(POS, SIZE + POS));
    frame.push(new Point(SIZE + POS, SIZE + POS));
    frame.push(new Point(SIZE + POS, POS));
    createLinePoly(polygoneObs1);
    createLinePoly(polygoneObs2);
    createLinePoly(polygoneObs3);
    if (triangulation) {
      createTriangulation(triangu);
      createLinePoly(polygoneObs1);
      createLinePoly(polygoneObs2);
      createLinePoly(polygoneObs3);
    }
    if (firstDual) {
      stroke("green");
      for (let i = 0; i < firstDualGraph.length; i++) {
        line(
          firstDualGraph[i][0][0],
          firstDualGraph[i][0][1],
          firstDualGraph[i][1][0],
          firstDualGraph[i][1][1]
        );
        ellipse(firstDualGraph[i][0][0], firstDualGraph[i][0][1], 3);
        ellipse(firstDualGraph[i][1][0], firstDualGraph[i][1][1], 3);
      }
      stroke("black");
    } else if (secondDual) {
      stroke("green");
      for (let i = 0; i < secondDualGraph.length; i++) {
        line(
          secondDualGraph[i][0][0],
          secondDualGraph[i][0][1],
          secondDualGraph[i][1][0],
          secondDualGraph[i][1][1]
        );
        ellipse(secondDualGraph[i][0][0], secondDualGraph[i][0][1], 3);
        ellipse(secondDualGraph[i][1][0], secondDualGraph[i][1][1], 3);
      }
      stroke("black");
    } else if (thirdDual) {
      stroke("green");
      for (let i = 0; i < secondDualGraph.length; i++) {
        line(
          secondDualGraph[i][0][0],
          secondDualGraph[i][0][1],
          secondDualGraph[i][1][0],
          secondDualGraph[i][1][1]
        );
        ellipse(534, 350, 5);
        ellipse(133, 47, 5);
        ellipse(424, 84, 5);
        ellipse(172, 485, 5);
      }
      stroke("black");
    }

    if (onlyJunction) {
      stroke("red");
      noFill();
      triangle(POS, SIZE + POS, 345 + POS, 405 + POS, 135 + POS, 435 + POS);
      triangle(
        33 * 15 + POS,
        22 * 15 + POS,
        36 * 15 + POS,
        20 * 15 + POS,
        SIZE + POS,
        SIZE + POS
      );
      triangle(
        19 * 15 + POS,
        5 * 15 + POS,
        8 * 15 + POS,
        3 * 15 + POS,
        POS,
        POS
      );
      triangle(
        34 * 15 + POS,
        6 * 15 + POS,
        POS,
        POS,
        23 * 15 + POS,
        5 * 15 + POS
      );
      fill("black");
      stroke("black");
    }
    if (shortestPath) {
      let short1 = [
        [
          [8, 3],
          [13, 6]
        ],
        [
          [13, 6],
          [14, 17]
        ],
        [
          [14, 17],
          [13, 20]
        ],
        [
          [13, 20],
          [12, 25]
        ],
        [
          [12, 25],
          [9, 29]
        ]
      ];
      let short2 = [
        [
          [19, 5],
          [17, 6]
        ],

        [
          [17, 6],
          [17, 12]
        ],
        [
          [17, 12],
          [17, 17]
        ],
        [
          [17, 17],
          [23, 27]
        ]
      ];
      let short3 = [
        [
          [23, 5],
          [29, 15]
        ],
        [
          [29, 15],
          [26, 19]
        ],
        [
          [26, 19],
          [27, 22]
        ],
        [
          [27, 22],
          [30, 22]
        ],
        [
          [30, 22],
          [33, 22]
        ]
      ];
      let short4 = [
        [
          [34, 6],
          [32, 8]
        ],
        [
          [32, 8],
          [30, 16]
        ],

        [
          [30, 16],
          [26, 19]
        ],
        [
          [26, 19],
          [27, 22]
        ],
        [
          [27, 22],
          [36, 20]
        ]
      ];

      let short5 = [
        [
          [8, 3],
          [3, 8]
        ],
        [
          [3, 8],
          [3, 14]
        ],

        [
          [3, 14],
          [2, 20]
        ],
        [
          [2, 20],
          [2, 27]
        ],
        [
          [2, 27],
          [9, 29]
        ]
      ];

      let short6 = [
        [
          [34, 6],
          [37, 6]
        ],
        [
          [37, 6],
          [37, 19]
        ],

        [
          [37, 19],
          [36, 20]
        ]
      ];
      let short7 = [
        [
          [23, 27],
          [33, 27]
        ],
        [
          [33, 27],
          [33, 22]
        ]
      ];

      let short8 = [
        [
          [19, 5],
          [23, 5]
        ]
      ];

      stroke("blue");
      createAShort(short1);
      stroke("orange");
      createAShort(short2);
      stroke("green");
      createAShort(short3);
      stroke("grey");
      createAShort(short4);
      stroke("brown");
      createAShort(short5);
      stroke("purple");
      createAShort(short6);
      stroke("pink");
      createAShort(short7);
      stroke("cyan");
      createAShort(short8);

      stroke("black");
    }
  }

  if (game) {
    //////////////////////////////////////////////////////GAME PART
    let goRight = false;
    let goLeft = false;

    angle = 0;
    if (
      keyIsDown(LEFT_ARROW) &&
      !isInsideApolygon(new Point(princCoord[0] - 5 - HITBOX, princCoord[1])) &&
      isInsideFrame(new Point(princCoord[0] - 5 - HITBOX, princCoord[1])) &&
      !isInPerimeterOfAPoint(princCoord[0] - 5, princCoord[1])
    ) {
      princCoord[0] -= 5;
      angle = 270;
      goLeft = true;
    }
    if (
      keyIsDown(RIGHT_ARROW) &&
      !isInsideApolygon(new Point(princCoord[0] + 5 + HITBOX, princCoord[1])) &&
      isInsideFrame(new Point(princCoord[0] + 5 + HITBOX, princCoord[1])) &&
      !isInPerimeterOfAPoint(princCoord[0] + 5, princCoord[1])
    ) {
      princCoord[0] += 5;
      angle = 90;
      goRight = true;
    }
    if (
      keyIsDown(UP_ARROW) &&
      !isInsideApolygon(new Point(princCoord[0], princCoord[1] - 5 - HITBOX)) &&
      isInsideFrame(new Point(princCoord[0], princCoord[1] - 5 - HITBOX)) &&
      !isInPerimeterOfAPoint(princCoord[0], princCoord[1] - 5)
    ) {
      princCoord[1] -= 5;
      angle = 0;
      if (goRight) {
        angle = 45;
      } else if (goLeft) {
        angle = 315;
      }
    }
    if (
      keyIsDown(DOWN_ARROW) &&
      !isInsideApolygon(new Point(princCoord[0], princCoord[1] + 5 + HITBOX)) &&
      isInsideFrame(new Point(princCoord[0], princCoord[1] + 5 + HITBOX)) &&
      !isInPerimeterOfAPoint(princCoord[0], princCoord[1] + 5)
    ) {
      princCoord[1] += 5;
      angle = 180;
      if (goRight) {
        angle = 135;
      } else if (goLeft) {
        angle = 225;
      }
    }
    if (keyIsDown(ESCAPE) && points.length >= 4) {
      polygons.push(points);
      displayPolygon();
      points = [];
    }

    if (!inprog)
      computeVisibilityPolygon(new Point(princCoord[0], princCoord[1]));

    push();
    translate(princCoord[0], princCoord[1]);
    rotate(angle);
    image(gif, 0, 0, 32, 32);
    pop();
    if (polygons.length !== 0) {
      for (poly in polygons) {
        drawPolygon(polygons[poly], "#232f30", "rock");
      }
    }
    if (points.length > 2) {
      drawPolygon(points);
    } else if (points.length > 1) {
      ellipse(points[0].x, points[0].y, 3);
      ellipse(points[1].x, points[1].y, 3);
      line(points[0].x, points[0].y, points[1].x, points[1].y);
    } else if (points.length === 1) {
      ellipse(points[0].x, points[0].y, 3);
    }
    drawPolygon(frame);
    if (
      isInsidePolygon(visibility, new Point(frogCoord[0], frogCoord[1])) &&
      polygonBefore(
        100010001000,
        new Point(princCoord[0], princCoord[1]),
        visibility,
        new Point(frogCoord[0], frogCoord[1])
      ) === null
    ) {
      if (!visibleFrog) {
        visibleFrog = true;
        alertSound.play();
      }
      push();
      translate(frogCoord[0], frogCoord[1]);
      rotate(angle);
      image(frogGif, 0, 0, 32, 32);
      pop();
    } else {
      visibleFrog = false;
    }
    drawPolygon(visibility, "black", "light");
    if (infrogPerimeter()) {
      if (gameLevel === 1) {
        victoryText = "Level 1 completed";
        sound2.pause();
        levelSwitch = true;
        victorySound.play();
        gifTimer = Date.now();
        gameLevel = 2;
        victoryGif1.play();
        level2();
      } else if (gameLevel === 2) {
        sound2.pause();
        levelSwitch = true;
        victorySound.play();
        gifTimer = Date.now();
        victoryText = "Level 2 completed";
        gameLevel = 3;
        victoryGif1.play();
        level3();
      } else if (gameLevel === 3) {
        levelSwitch = true;
        victoryText = "Level 3 completed\n \nYou are now in free mode";
        gifTimer = Date.now();
        sound2.pause();
        victorySound.play();
        gameLevel = 0;
        victoryGif1.play();
        startGame();
      } else {
        levelSwitch = false;
        startGame();
      }
    }
    if (gifTimer !== 0 && Math.floor((gifTimer - Date.now()) / 1000) >= -4) {
      fill(147, 137, 137, 87);
      rect(POS + 25, POS + 50, 650, 500);
      image(cadre, POS + 350, POS + 300);
      textFont(font);
      textSize(54);
      //textFont("Helvetica");

      fill("#c5cbc5");
      text("Victory", POS + 260, POS + 150);
      text(victoryText, POS + 170, POS + 470);
      textSize(40);

      image(victoryGif1, POS + 350, POS + 300);
    } else {
      gifTimer = 0;
      victoryGif1.pause();
      sound2.play();
      sound2.loop = true;
    }
  }
  if (!game) drawPolygon(frame);
  noStroke();
  fill("White");
  textFont("Helvetica");
  textSize(14);
  text(stepText, 720, 150);
  stroke("Black");
}

function drawPolygon(polygon, color = "black", filling = "Nan") {
  stroke(color);
  if (filling === "Nan") noFill();
  else if (filling === "light") {
    fill(252, 237, 71, 50);
    noStroke();
  } else if (filling === "rock") {
    fill(35, 47, 48, 85);
    //noFill()
  }
  beginShape();
  for (let indexP = 0; indexP < polygon.length; indexP++) {
    //ellipse(polygon[indexP].x, polygon[indexP].y, 3);
    //line(polygon[indexP].x,polygon[indexP].y,polygon[(indexP + 1) % polygon.length].x,polygon[(indexP + 1) % polygon.length].y);
    vertex(polygon[indexP].x, polygon[indexP].y);
  }
  endShape(CLOSE);
  fill("black");
  stroke("black");
}

function mousePressed() {
  if (
    mouseX >= POS &&
    mouseY >= POS &&
    mouseY < SIZE + POS - 1 &&
    mouseX < SIZE + POS - 1 &&
    gameLevel === 0
  ) {
    //can't draw point behind buttons
    points.push(new Point(mouseX, mouseY));
  }
}

function displayPolygon() {
  let string = "[";
  for (let i = 0; i < points.length; i++) {
    string +=
      "[" + points[i].x.toString() + "," + points[i].y.toString() + "],";
  }
  string += "]";
  //console.log(string);
}

// This Redraws the Canvas when resized

function isInPerimeterOfAPoint(posix, posiy) {
  for (let point = 0; point < visibility.length; point++) {
    if (distance(visibility[point], new Point(posix, posiy)) < HITBOX) {
      return true;
    }
  }
  return false;
}

function infrogPerimeter() {
  let res = false;
  if (
    distance(
      new Point(frogCoord[0], frogCoord[1]),
      new Point(princCoord[0], princCoord[1])
    ) <
    HITBOX * 2.5
  )
    res = true;
  return res;
}

function placeNenu(number) {}

function distance(a, b) {
  let res = 0;
  res = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  return res;
}

function intersection(va, vb, a, b) {
  let vB = 0;
  let vA = 0;
  let A = 0;
  let B = 0;
  let x = 0;
  let y = 0;
  if (a.x !== b.x && vb.x !== va.x) {
    vA = (vb.y - va.y) / (vb.x - va.x);
    vB = va.y - vA * va.x;
    A = (b.y - a.y) / (b.x - a.x);
    B = a.y - A * a.x;
    x = (vB - B) / (A - vA);
    y = A * x + B;
  } else if (a.x === b.x) {
    vA = (vb.y - va.y) / (vb.x - va.x);
    vB = va.y - vA * va.x;
    x = a.x;
    y = vA * x + vB;
  } else if (va.x === vb.x) {
    A = (b.y - a.y) / (b.x - a.x);
    B = a.y - A * a.x;
    x = va.x;
    y = A * x + B;
  }
  return new Point(x, y);
}

function aSleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms)); //thanks to Dan Dascalescu @ https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
}

function computeVisibilityPolygon(q) {
  inprog = true;
  segments = [];
  interFrame = [];
  tg = [];
  visibility = [];
  let vis = [];
  bridges = [];
  let tempbridge = [];
  let hitting = [];
  let hitt2 = null;
  let dista = 0;
  let intersec = null;
  for (let poly = 0; poly < polygons.length; poly++) {
    hitting = [];
    hitt2 = null;
    for (let pIndex = 0; pIndex < polygons[poly].length; pIndex++) {
      hitt2 = null;
      usablePoint = polygons[poly][pIndex];
      hitting = hitPolygon(polygons[poly], q, polygons[poly][pIndex]);
      if (
        hitting.length !== 0 &&
        (hitting[0] === polygons[poly][pIndex] || //do we hit the polygon and if yes is it the good vertex
          hitting[1] === polygons[poly][pIndex]) &&
        hitting[0].x !== -1 &&
        hitting[0].x !== -1
      ) {
        if (crossPoly(q, polygons[poly][pIndex], poly) === -1) {
          vis.push(polygons[poly][pIndex]);
        }
      } else if (
        hitting.length === 0 &&
        crossPoly(q, polygons[poly][pIndex], poly) === -1
        //&& !crossOwnpol(q, polygons[poly][pIndex], polygons[poly])
      ) {
        tempbridge = [];
        tempbridge.push(polygons[poly][pIndex]);
        vis.push(polygons[poly][pIndex]);
        hitt2 = polygonBefore(100000000000, q, polygons[poly][pIndex]);
        if (hitt2 !== null) {
          intersec = intersection(
            hitt2[0],
            hitt2[1],
            q,
            polygons[poly][pIndex]
          );
          segments.push([hitt2[0], hitt2[1], intersec]);
          vis.push(intersec);
          tempbridge.push(intersec);
          bridges.push(tempbridge.slice());
        } else {
          hitt2 = hitPolygon(frame, q, polygons[poly][pIndex], false);
          intersec = intersection(
            hitt2[0],
            hitt2[1],
            q,
            polygons[poly][pIndex]
          );
          vis.push(intersec);
          interFrame.push(intersec);
          tempbridge.push(intersec);
          bridges.push(tempbridge.slice());
        }
      }
    }
  }
  let backup = lighCopy(polygons);
  addIntersectToPoly();

  quicksortPoint = q;
  vis.sort(customQuicksort);
  oldquick = vis.slice();

  let counter = 0;
  if (
    !areOntheSamePolygon(vis[1], vis[0]) &&
    (vis[0].x === SIZE + POS ||
      vis[0].x === POS ||
      vis[0].y === POS + SIZE ||
      vis[0].y === POS) &&
    (vis[vis.length - 2].x === SIZE + POS ||
      vis[vis.length - 2].x === POS ||
      vis[vis.length - 2].y === POS + SIZE ||
      vis[vis.length - 2].y === POS)
  ) {
    [vis[vis.length - 2], vis[vis.length - 1]] = [
      vis[vis.length - 1],
      vis[vis.length - 2]
    ];
    counter = 1;
  }

  if (
    areOntheSamePolygon(vis[vis.length - 2], vis[vis.length - 1]) &&
    areOntheSamePolygon(vis[1], vis[vis.length - 1]) &&
    (vis[0].x === SIZE + POS ||
      vis[0].x === POS ||
      vis[0].y === POS + SIZE ||
      vis[0].y === POS)
  ) {
    [vis[0], vis[1]] = [vis[1], vis[0]];
  }
  let bridgeIndex = null;
  let targetBridge = null;
  let firstRes = 0;
  let result = null;
  let used = [];
  let count = 0;
  for (let index = 0; index < vis.length; index++) {
    firstRes = areOntheSamePolygon(vis[index], vis[(index + 1) % vis.length]);
    result = isOnATunnel(index, vis);
    if (result !== null) {
      targetBridge = result;
      bridgeIndex = null;
      if (targetBridge != null) {
        for (let index2 = index + 1; index2 < vis.length; index2++) {
          if (
            vis[index2].x === targetBridge.x &&
            vis[index2].y === targetBridge.y
          ) {
            bridgeIndex = index2;
          }
        }
        if (bridgeIndex !== null) used.push(bridgeIndex);
        vis = swap(vis, index, bridgeIndex);
      }
    } else if (
      firstRes === 0 ||
      (firstRes === 1 &&
        !isAdjacentTo(vis[index], vis[(index + 1) % vis.length])) ||
      (firstRes === 2 &&
        !isAdjacentTo(vis[index], vis[(index + 1) % vis.length]))
    ) {
      count = 2;
      result = 0;
      let adja = false;
      while ((result === 0 || !adja) && count < vis.length) {
        result = areOntheSamePolygon(
          vis[index],
          vis[(index + count) % vis.length]
        );
        adja = isAdjacentTo(vis[index], vis[(index + count) % vis.length]);
        if (result !== 0) {
        }
        count++;
      }
      count--;
      if (result === 0) {
      } else if (result === 1 || (result === 2 && counter < 1)) {
        if (!((index + count) % vis.length <= index)) {
          vis = swap(vis, index, index + count);
        } else {
        }

        if (result === 2) {
          counter++;
        } else if (result === 1) {
          counter = 0;
        }
      }
    } else if (firstRes !== 2) counter = 0;
    else counter++;
  }
  visibility = vis;
  inprog = false;
  polygons = backup.slice();
  //removeIntersectToPoly(); //marche pas
}

function lighCopy(polygon) {
  let newpoly = [];
  let temp = [];
  for (let poly = 0; poly < polygon.length; poly++) {
    temp = [];
    for (let point = 0; point < polygon[poly].length; point++) {
      temp.push(new Point(polygon[poly][point].x, polygon[poly][point].y));
    }
    newpoly.push(temp);
  }
  return newpoly;
}

function swap(list, index, empl) {
  list1 = list.slice();
  let brIndex = empl;
  while (brIndex !== index + 1 && brIndex !== null) {
    [list1[brIndex], list1[brIndex - 1]] = [list1[brIndex - 1], list1[brIndex]];
    brIndex--;
  }
  return list1;
}

function isOnATunnel(index, vis) {
  tempbridge = [];
  targetBridge = null;
  for (let bridge = 0; bridge < bridges.length; bridge++) {
    if (
      (bridges[bridge][0].x === vis[index].x &&
        bridges[bridge][0].y === vis[index].y) ||
      (bridges[bridge][1].x === vis[index].x &&
        bridges[bridge][1].y === vis[index].y)
    ) {
      tempbridge = bridges[bridge];
      if (
        bridges[bridge][0].x === vis[index].x &&
        bridges[bridge][0].y === vis[index].y
      ) {
        targetBridge = bridges[bridge][1];
      } else {
        targetBridge = bridges[bridge][0];
      }
    }
  }
  if (targetBridge !== null) {
    for (let ind = 0; ind < index; ind++) {
      if (vis[ind].x === targetBridge.x && vis[ind].y === targetBridge.y) {
        targetBridge = null;
        break;
      }
    }
  }

  return targetBridge;
}

function isAdjacentTo(a, b) {
  res = false;
  for (let poly = 0; poly < polygons.length; poly++) {
    for (let index = 0; index < polygons[poly].length; index++) {
      if (
        areSamePoint(polygons[poly][index], a) &&
        (areSamePoint(polygons[poly][(index + 1) % polygons[poly].length], b) ||
          areSamePoint(
            polygons[poly][mod(index - 1, polygons[poly].length)],
            b
          ))
      ) {
        res = true;
      }
    }
  }
  if (
    res === false &&
    ((roundAppl(a.x) === POS && roundAppl(b.x) === POS) ||
      (roundAppl(a.x) === POS + SIZE && roundAppl(b.x) === POS + SIZE) ||
      (roundAppl(a.y) === POS && roundAppl(b.y) === POS) ||
      (roundAppl(a.y) === POS + SIZE && roundAppl(b.y) === POS + SIZE))
  ) {
    res = true;
    let ax = roundAppl(a.x);
    let ay = roundAppl(a.y);
    let by = roundAppl(b.y);
    let bx = roundAppl(b.x);
    let segx = 0;
    let segy = 0;
    for (let seg = 0; seg < interFrame.length; seg++) {
      segx = roundAppl(interFrame[seg].x);
      segy = roundAppl(interFrame[seg].y);
      if (
        (((ax === POS && segx === POS) ||
          (ax === POS + SIZE && segx === POS + SIZE)) &&
          ((ay < segy && segy < by) || (ay > segy && segy > by))) ||
        (((ay === POS && segy === POS) ||
          (ay === POS + SIZE && segy === POS + SIZE)) &&
          ((ax < segx && segx < bx) || (ax > segx && segx > bx)))
      ) {
        res = false;
      }
    }
  }
  return res;
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function addIntersectToPoly() {
  segToRemove = segments.slice();
  let toplace = [];
  let tempPoly = [];
  for (let poly = 0; poly < polygons.length; poly++) {
    tempPoly = polygons[poly].slice();
    for (let index = 0; index < polygons[poly].length; index++) {
      toplace = [];
      for (let seg = 0; seg < segments.length; seg++) {
        if (
          (areSamePoint(segments[seg][0], polygons[poly][index]) &&
            areSamePoint(
              segments[seg][1],
              polygons[poly][(index + 1) % polygons[poly].length]
            )) ||
          (areSamePoint(segments[seg][1], polygons[poly][index]) &&
            areSamePoint(
              segments[seg][0],
              polygons[poly][(index + 1) % polygons[poly].length]
            ))
        ) {
          toplace.push(seg);
        }
      }
      if (toplace.length > 1) {
        quicksortPoint = index;
        toplace.sort(distanceSort);
        for (let place = 0; place < toplace.length; place++) {
          tempPoly.splice(
            (index + 1) % polygons[poly].length,
            0,
            segments[toplace[place]][2]
          );
        }
      } else if (toplace.length > 0) {
        tempPoly.splice(
          (index + 1) % polygons[poly].length,
          0,
          segments[toplace[0]][2]
        );
      }
    }

    polygons[poly] = tempPoly.slice();
  }
}

function removeIntersectToPoly() {
  let toremove = [];
  for (let poly = 0; poly < polygons.length; poly++) {
    toremove = [];
    for (let index = 0; index < polygons[poly].length; index++) {
      for (let seg = 0; seg < segToRemove.length; seg++) {
        if (areSamePoint(segToRemove[seg][2], polygons[poly][index])) {
          toremove.push(seg);
        }
      }
    }
    removeVertices(toremove, poly);
  }
}

function removeVertices(toremove, poly) {
  if (toremove.length > 0) {
    let targ = 0;
    for (let index = 0; index < polygons[poly].length; index++) {
      if (areSamePoint(segToRemove[toremove[0]][2], polygons[poly][index])) {
        targ = index;
      }
    }
    polygons[poly].splice(targ, 1);
    removeVertices(toremove.slice(1), poly);
  }
}

function distanceSort(a, b) {
  //trie en distance d??croissante
  if (distance(quicksortPoint, a) > distance(quicksortPoint, b)) {
    return -1;
  } else return 1;
}

function areSamePoint(a, b) {
  return a.x === b.x && a.y === b.y;
}

function computeAngle(pmiddle, p, roof = false, floor = false) {
  let x = 0;
  let y = 0;
  x = pmiddle.x - p.x;
  y = pmiddle.y - p.y;

  let angle = Math.atan2(y, x);
  if (angle <= 0) {
    angle += 2 * Math.PI;
  }
  return angle;
}

function polygonBefore(distances, q, v) {
  distMax = distances;
  tempHit = null;
  hitt2 = null;
  for (let polyg = 0; polyg < polygons.length; polyg++) {
    //we test if we cross another polygon before
    tempHit = hitPolygon(polygons[polyg], q, v);
    if (tempHit.length > 0 && distMax >= distance(q, tempHit[0])) {
      hitt2 = tempHit;
      distMax = distance(tempHit[0], q);
    }
  }
  return hitt2;
}

function crossPoly(a, b, polynumb = 0) {
  let ans = -1;
  for (let polyg = 0; polyg < polygons.length; polyg++) {
    for (let pIndex = 0; pIndex < polygons[polyg].length; pIndex++) {
      if (
        polyg !== polynumb &&
        intersect(
          a,
          b,
          polygons[polyg][pIndex],
          polygons[polyg][(pIndex + 1) % polygons[polyg].length]
        )
      ) {
        ans = polyg;
      }
    }
  }
  return ans;
}

function crossOwnpol(a, b, polyg) {
  let ans = false;
  for (let pIndex = 0; pIndex < polyg.length; pIndex++) {
    if (
      intersect(a, b, polyg[pIndex], polyg[(pIndex + 1) % polyg.length]) &&
      polyg[pIndex] !== b &&
      polyg[(pIndex + 1) % polyg.length] !== b
    ) {
      ans = true;
    }

    return ans;
  }
}

function areOntheSamePolygon(pa, pb) {
  let ans = 0;
  let count = 0;
  let ret = null;
  for (let polyg = 0; polyg < polygons.length; polyg++) {
    count = 0;
    ans = 0;
    for (let pIndex = 0; pIndex < polygons[polyg].length; pIndex++) {
      ret = checkPolygApp(polygons[polyg], pIndex, pa, pb);
      if (ret > 0) {
        count += ret;
        if (count > 1) {
          ans = 1;
          break;
        }
      }
    }
    if (ans === 1) break;
  }
  if (!ans) {
    if (
      (roundAppl(pa.y) === POS && roundAppl(pb.y) === POS) ||
      (roundAppl(pa.y) === SIZE + POS && roundAppl(pb.y) === SIZE + POS) ||
      (roundAppl(pa.x) === POS && roundAppl(pb.x) === POS) ||
      (roundAppl(pa.x) === POS + SIZE && roundAppl(pb.x) === POS + SIZE)
    ) {
      ans = 2;
    }
  }
  return ans;
}

function checkPolygApp(polyg, pIndex, pa, pb) {
  let pafound = 0;
  let pbfound = 0;
  let exact = false;
  if (polyg[pIndex].x === pa.x && polyg[pIndex].y === pa.y && !exact) {
    pafound = 1;
    exact = true;
  }
  if (polyg[pIndex].x === pb.x && polyg[pIndex].y === pb.y && !exact) {
    exact = true;
    pbfound = 1;
  }
  if (
    onTheSameSegment(polyg[pIndex], pa, polyg[(pIndex + 1) % polyg.length]) &&
    !pafound
  ) {
    pafound = 1;
  }
  if (
    onTheSameSegment(polyg[pIndex], pb, polyg[(pIndex + 1) % polyg.length]) &&
    !pbfound
  ) {
    pbfound = 1;
  }
  return pbfound + pafound;
}

function onTheSameSegment(a, c, b) {
  let res = false;
  if (
    isRightTurn(a, c, b, false) === 2 &&
    ((a.x < c.x && c.x < b.x) || (a.x > c.x && c.x > b.x)) &&
    ((a.y < c.y && c.y < b.y) || (a.y > c.y && c.y > b.y))
  ) {
    res = true;
  }
  if (!res && segments.length > 0) {
    for (let tuple = 0; tuple < segments.length; tuple++) {
      if (
        (segments[tuple][0].x === a.x &&
          segments[tuple][0].y === a.y &&
          segments[tuple][1].x === b.x &&
          segments[tuple][1].y === b.y &&
          segments[tuple][2].x === c.x &&
          segments[tuple][2].y === c.y) ||
        (segments[tuple][0].x === b.x &&
          segments[tuple][0].y === b.y &&
          segments[tuple][1].x === a.x &&
          segments[tuple][1].y === a.y &&
          segments[tuple][2].x === c.x &&
          segments[tuple][2].y === c.y)
      ) {
        res = true;
      }
    }
  }
  return res;
}

///////////////OLD STUFF////////////////////////////////////////////////////////
function computeDet(a, b, c) {
  //compute det
  let det = a.x * (b.y - c.y) - a.y * (b.x - c.x) + (b.x * c.y - c.x * b.y);
  return det;
}

function isRightTurn(a, b, c, round = true) {
  let res = false;
  let det = computeDet(a, b, c);
  if (Math.abs(det) < Number.EPSILON) {
    if (!round) {
      res = 2;
    } else {
      res = true;
    }
  } else if (det < 0) res = true;
  else if (det > 0) res = false;
  return res;
}

function hitPolygon(poly, a, b, obstacle = true) {
  let abind = null;
  let abind1 = null;
  let point = false;
  let segment = false;
  let before = null;

  let hittingPair = [];
  let hitCount = 0;
  for (let index = 0; index < poly.length; index++) {
    if (vectorHit(a, b, poly[index], poly[(index + 1) % poly.length])) {
      abind = isRightTurn(a, b, poly[index], false);
      abind1 = isRightTurn(a, b, poly[(index + 1) % poly.length], false);
      if (hitCount === 0) {
        if (abind === 2) {
          point = true;
          before = poly[index];
        } else if (abind1 === 2) {
          point = true;
          before = poly[(index + 1) % poly.length];
        } else {
          segment = true; //si on croise un segment c'est qu'on est ok de toute fa??on
          hitCount = 10;
        }
        hitCount++;
      } else if (hitCount > 0) {
        if (
          (abind === 2 && point && before !== poly[index]) ||
          (abind1 === 2 &&
            point &&
            before !== poly[(index + 1) % poly.length]) ||
          (abind !== 2 && abind1 !== 2)
        ) {
          hitCount++;
        }
      }
      if (hittingPair.length > 0) {
        if (
          intersectBefore(
            a,
            b,
            poly[index],
            poly[(index + 1) % poly.length],
            hittingPair[0],
            hittingPair[1]
          ) ||
          b === poly[index] ||
          b === poly[(index + 1) % poly.length]
        ) {
          hittingPair = [poly[index], poly[(index + 1) % poly.length]];
        }
      } else {
        hittingPair = [poly[index], poly[(index + 1) % poly.length]];
      }
    }
  }
  if (obstacle) {
    //ne doit pas ??tre vu si segment devant
    for (let index = 0; index < poly.length; index++) {
      if (
        intersect(a, b, poly[index], poly[(index + 1) % poly.length], true) &&
        poly[index] !== hittingPair[0] &&
        poly[(index + 1) % poly.length] !== hittingPair[1]
      ) {
        hittingPair = [new Point(-1, -1), new Point(-1, -1)];
      }
    }
  }
  if (hitCount <= 1 && obstacle) {
    hittingPair = [];
  }
  return hittingPair;
}

function buildSegment(a) {
  let minMax = [];
  minMax[0] = POS - 5;
  minMax[1] += SIZE + POS + 5;
  return minMax;
}

function isInsideApolygon(pa) {
  res = false;
  for (let poly = 0; poly < polygons.length; poly++) {
    if (isInsidePolygon(polygons[poly], pa)) {
      res = true;
    }
  }
  return res;
}

function isInsideFrame(pa) {
  if (pa.x > POS && pa.x < POS + SIZE && pa.y > POS && pa.y < POS + SIZE) {
    return true;
  } else return false;
}

function isInsidePolygon(poly, a) {
  let ins = "";
  let segment = buildSegment(a);
  let p1 = new Point(segment[0], a.y);
  let p2 = new Point(a.x, a.y);
  lineCross = [];
  lineCross.push(p1);
  lineCross.push(p2);
  let inside = false;
  let turn = 0;
  let int1 = false;
  let int2 = false;
  for (let index = 0; index < poly.length; index++) {
    int1 = intersectSpecial(
      p1,
      p2,
      poly[index],
      poly[(index + 1) % poly.length]
    );
    int2 = intersectSpecial(
      p1,
      p2,
      poly[index],
      poly[(index + 1) % poly.length],
      true
    );
    if (int1) {
      turn++;
    } else if (int2) {
      turn++;
    }
  }
  if (turn % 2 === 1) {
    inside = true;
  }
  return inside;
}

function intersectSpecial(a, b, c, d, strict = false) {
  let ans = false;
  let ans2 = true;
  if (
    strict &&
    (isRightTurn(a, b, d, false) === 2 ||
      isRightTurn(a, b, c, false) === 2 ||
      isRightTurn(c, d, a, false) === 2 ||
      isRightTurn(c, d, b, false) === 2)
  ) {
    ans2 = false;
  }

  ans =
    isRightTurnSpecial(a, b, d) ^ isRightTurnSpecial(a, b, c) &&
    isRightTurnSpecial(c, d, a) ^ isRightTurnSpecial(c, d, b);
  return ans && ans2;
}

function isRightTurnSpecial(a, b, c, round = true) {
  let res = false;
  let det = computeDet(a, b, c);
  if (Math.abs(det) < Number.EPSILON) {
    if (!round) {
      res = 2;
    } else {
      res = false;
    }
  } else if (det < 0) res = true;
  else if (det > 0) res = false;
  return res;
}

function lineHit(a, b, c, d) {
  return isRightTurn(a, b, d) ^ isRightTurn(a, b, c);
}

function Order(c, d) {
  let res = [];
  if (c.x === d.x) {
    if (c.y > d.y) {
      res.push(c);
      res.push(d);
    } else {
      res.push(d);
      res.push(c);
    }
  } else {
    if (c.x > d.x) {
      res.push(c);
      res.push(d);
    } else {
      res.push(d);
      res.push(c);
    }
  }
  return res;
}

function goLeft(a, b, ord) {
  //goRight and goLeft are Reversed
  return isRightTurn(ord[0], a, b) && !isRightTurn(ord[1], a, b);
}

function goRight(a, b, ord) {
  return !isRightTurn(ord[0], a, b) && isRightTurn(ord[1], a, b);
}

function isAtRight(ord, a) {
  return isRightTurn(ord[0], ord[1], a) && !isRightTurn(ord[1], ord[0], a);
}

function isAtLeft(ord, a) {
  return !isRightTurn(ord[0], ord[1], a) && isRightTurn(ord[1], ord[0], a);
}

function vectorHit(a, b, c, d) {
  ans = false;
  if (lineHit(a, b, c, d)) {
    ord = Order(c, d);
    if (
      (goLeft(a, b, ord) && isAtLeft(ord, a)) ||
      (goRight(a, b, ord) && isAtRight(ord, a))
    ) {
      ans = true;
    }
  }
  return ans;
}

function intersect(a, b, c, d, strict = false) {
  let ans = 0;
  let ans2 = true;
  if (
    strict &&
    (isRightTurn(a, b, d, false) === 2 ||
      isRightTurn(a, b, c, false) === 2 ||
      isRightTurn(c, d, a, false) === 2 ||
      isRightTurn(c, d, b, false) === 2)
  ) {
    ans2 = false;
  }

  ans =
    isRightTurn(a, b, d) ^ isRightTurn(a, b, c) &&
    isRightTurn(c, d, a) ^ isRightTurn(c, d, b);
  return ans && ans2;
}

function isSegEFatLeft(ordEF, c, d) {
  let rtToRoundd = isRightTurn(ordEF[0], ordEF[1], d, false);
  let rtToRoundc = isRightTurn(ordEF[0], ordEF[1], c, false);
  if (rtToRoundd === 2) rtToRoundd = false;
  if (rtToRoundc === 2) rtToRoundc = false; //si rt ===0 est consider?? comme bon,alors jamais seg peut ??tre a gauche
  return !rtToRoundd && !rtToRoundc;
}

function isSegEFatRight(ordEF, c, d) {
  return (
    isRightTurn(ordEF[0], ordEF[1], c) && isRightTurn(ordEF[0], ordEF[1], d)
  );
}

function intersectBefore(a, b, c, d, e, f) {
  rep = false;
  if (vectorHit(a, b, c, d) && vectorHit(a, b, e, f)) {
    ordEF = Order(e, f);
    order = Order(c, d);
    if (
      (isSegEFatLeft(ordEF, c, d) && goLeft(a, b, ordEF)) ||
      (isSegEFatRight(ordEF, c, d) && goRight(a, b, ordEF))
    ) {
      rep = true;
    }
  } else if (vectorHit(a, b, c, d)) {
    rep = true;
  }
  return rep;
}

function customQuicksort(a, b) {
  //en cas de null ==> -1
  res = 0;
  let angle1 = computeAngle(quicksortPoint, a);
  let angle2 = computeAngle(quicksortPoint, b);
  if (
    Math.round((angle2 + Number.EPSILON) * 100) / 100 ===
    Math.round((angle1 + Number.EPSILON) * 100) / 100
  ) {
    if (distance(quicksortPoint, a) < distance(quicksortPoint, b)) {
      //si b plus loin que a
      if (
        Math.floor(a.x) === POS ||
        Math.floor(a.x) === POS + SIZE ||
        Math.floor(a.y) === POS ||
        Math.floor(a.y) === POS + SIZE
      ) {
        res = -1; //1
      } else {
        res = 1; //-1
      }
      //1
    } else {
      if (
        Math.floor(b.x) === POS ||
        Math.floor(b.x) === POS + SIZE ||
        Math.floor(b.y) === POS ||
        Math.floor(b.y) === POS + SIZE
      ) {
        res = 1; //1
      } else {
        res = -1; //-1
      }
    }
  } else if (angle1 > angle2) {
    res = -1;
  } else if (angle1 < angle2) {
    res = 1;
  }
  return res;
}

function roundAppl(a, nb = 0) {
  let round = Math.pow(10, nb);
  return Math.round((a + Number.EPSILON) * round) / round;
}

windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};
