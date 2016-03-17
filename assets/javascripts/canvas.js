var stage, sunShape, titleTxt // Initialize variables used in Canvas

// This function runs when body loads
function init() {
  // Init Stage
  stage = new createjs.Stage("stage-canvas")

  // Create Background
  var bg = new createjs.Shape()
  bg.graphics.beginFill("#83F52C")
  bg.graphics.drawRect(
    0,                    // x position
    0,                    // y position
    stage.canvas.width,   // width of shape (in px)
    stage.canvas.height   // height of shape (in px)
  )
  // Can only define this after shape is drawn, else no fill applies
  bg.graphics.ef()    // short for endFill()
  stage.addChild(bg)  // Add Child to Stage

  var box = new createjs.Shape();
  box.graphics.beginFill("#000000")
  box.graphics.drawCircle(0,0,100,100);

  var img = new createjs.Bitmap("assets/images/totoro.jpg");
  img.filters = [
    new createjs.AlphaMaskFilter(box)
  ];

  stage.addChild(img)



  createjs.Ticker.addEventListener("tick", tickHandler)   // Setup ticker event listener
  createjs.Ticker.setFPS(60)                              // Set ticker FramesPerSecond
}



// Triggered in init() from Ticker.addEventListener
function tickHandler(e) {
  // Update Stage to show newly added Children, etc
  stage.update()
  // Check out start FPS and new FPS (from setFPS())
  // console.log(createjs.Ticker.getMeasuredFPS())
}
