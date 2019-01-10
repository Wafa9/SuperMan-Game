var width = 400;
var height = 500;

c = document.getElementById("c");
ctx = c.getContext("2d");
c.width = width;
c.height = height;

var clear = function() {
  ctx.fillStyle = "#d0e7f9";
  ctx.beginPath();
  ctx.rect(0, 0, width, height);

  ctx.fill();
  ctx.closePath();
};

var howManyCircles = 10,
  circles = [];
for (var i = 0; i < howManyCircles; i++) {
  circles.push([
    Math.random() * width, // X axis
    Math.random() * height, // Y axis
    Math.random() * 50, // Radius
    Math.random() / 2 // Opacity
  ]);
}

var DrawCircles = function() {
  for (var i = 0; i < howManyCircles; i++) {
    ctx.fillStyle = "rgba(255, 255, 255, " + circles[i][3] + ")";
    ctx.beginPath();
    ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
};

var MoveCircles = function() {
  for (var i = 0; i < howManyCircles; i++) {
    circles[i][1] += 0.6;
    if (circles[i][1] - circles[i][2] >= height) {
      circles[i][0] = Math.random() * width;
      circles[i][2] = Math.random() * 50;
      circles[i][1] = 0 - circles[i][2];
    }
  }
  DrawCircles();
};

// Move = setInterval(MoveCircles, 40);

var player = new function() {
  var that = this;

  that.image = new Image();
  that.image.src = "superheroe.png";

  that.isjumping = false;
  that.isfaling = false;
  that.jumpspeed = 0;
  that.fallspeed = 0;

  that.width = 65;

  that.height = 95;

  that.X = 0;
  that.Y = 0;
  that.setPosition = function(x, y) {
    that.X = x;
    that.Y = y;
  };

  // window.addEventListener("mousemove", function(event) {
  //   that.X = event.offsetX - that.width / 2;
  //   that.Y = event.offsetY - that.height / 2;
  //   console.log("lknlkns");
  // });

  that.draw = function() {
    try {
      ctx.drawImage(
        that.image,
        0,
        0,
        that.width,
        that.height,
        that.X,
        that.Y,
        that.width,
        that.height
      );
    } catch (e) {}
  };
  that.jump = function() {
    if (!that.isjumping && !that.isfaling) {
      that.fallspeed = 0;
      that.isjumping = true;
      that.jumpspeed = 17;
    }
  };
  that.checkjump = function() {
    that.setPosition(that.X, that.Y - that.jumpspeed);
    that.jumpspeed--;
    if (jumpspeed == 0) {
      that.isjumping = false;
      that.isfaling = true;
      that.fallspeed = 1;
    }
  };
  that.checkfall = function() {
    if (that.Y < height - that.height) {
      that.setPosition(that.X, that.Y + that.fallspeed);
      that.fallspeed++;
    } else {
      that.fallstop();
    }
  };

  that.fallstop = function() {
    that.isfaling = false;
    that.fallspeed = 0;
    that.jump();
  };

  that.moveleft = function() {
    if (that.X > 0) that.setPosition(that.X - 5, that.Y);
  };
  that.moveraight = function() {
    if (that.X + that.width < width) {
      that.setPosition(that.X + 5, that.Y);
    }
  };
  document.onmousemove = function(e) {
    if (player.X + c.offsetLeft > e.pageX) {
      player.moveleft();
    } else if (player.X + c.offsetLeft < e.pageX) {
      player.moveraight();
    }
  };
}();
// player.setPosition(
//   ~~((width - player.width) / 2),
//   ~~((height - player.height) / 1)
// );
player.setPosition(
  ~~((width - player.width) / 2),
  ~~((height - player.height) / 2)
);
player.jump();

var GameLoop = function() {
  if (player.isJumping) player.checkjump();
  if (player.isFalling) player.checkfall();
  clear();
  MoveCircles();
  DrawCircles();
  Drawsequar();
  Movesequar();
  player.draw();
};
GameLoop();
gLoop = setInterval(GameLoop, 1000 / 60); // FPS: Frames per second

var howManysequer = 12;
sequarwidth = 60;
sequarhight = 10;
sequar = [];

for (var i = 0; i < howManysequer; i++) {
  sequar.push([
    Math.random() * width, // X axis
    Math.random() * height // Y axis
  ]);
}
function Drawsequar() {
  for (var i = 0; i < howManysequer; i++) {
    ctx.beginPath();
    ctx.fillStyle = "#deb887";
    ctx.rect(sequar[i][0], sequar[i][1], sequarwidth, sequarhight);
    ctx.closePath();
    ctx.fill();
  }
}
Drawsequar();

function Movesequar() {
  for (var i = 0; i < howManysequer; i++) {
    sequar[i][1] += 1;
    if (sequar[i][1] >= height) {
      //the sequrs here uper from bedining agian
      //sequar[i][0] = Math.random() * width;
      sequar[i][1] = 0;
    }
  }
}

// var block = function(x, y, type) {
//   var that = this;
//   that.firstcolor = "#444422";
//   that.secondcolor = "#004d00";
//   that.oncollide = function() {
//     player.fallstop();
//   };
//   if (type === 1) {
//     that.firstcolor = "#AADD00";
//     that.secondcolor = "#AADD00";
//     that.oncollide = function() {
//       player.fallstop();
//       player.jumpspeed = 50;
//     };
//   }
//   that.x = ~~x;
//   that.y = y;
//   that.type = type;

//   return that;
// };
// var howManysequer = 7;
// sequarwidth = 60;
// sequarhight = 10;
// sequar = [];
// var creatblocks = function () {
//     var poition 0,type;
//     for (var i = 0; i < howManysequer; i++){
//         type = ~~(Math.random()*5);
//         if(type === 0){
//             type = 1;
//         }else{
//           type = 0;
//         }
//     }
// }
