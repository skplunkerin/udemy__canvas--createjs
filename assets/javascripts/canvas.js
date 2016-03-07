var stage, sunShape, titleTxt // Initialize variables used in Canvas

// This function runs when body loads
function init() {
  // Init Stage
  stage = new createjs.Stage("stage-canvas")

  // Create Background
  var bg = new createjs.Shape()
  bg.graphics.beginLinearGradientFill(
    ["#728FCE","#DEE0D5","#DEE0D5","#F4A460"],  // Colors to use in gradient
    [.2, .6, .63, .9],                          // ratios for drawing colors from-to, starting from 0 to 1
    0, 0,                                       // start x, y positions
    0, stage.canvas.height                      // end x, y positions
  )
  bg.graphics.drawRect(
    0,                    // x position
    0,                    // y position
    stage.canvas.width,   // width of shape (in px)
    stage.canvas.height   // height of shape (in px)
  )
  // Can only define this after shape is drawn, else no fill applies
  bg.graphics.ef()    // short for endFill()
  stage.addChild(bg)  // Add Child to Stage





  // HTML DOM text
  // var h1 = new createjs.DOMElement(document.getElementsByTagName("h1")[0])
  // h1.htmlElement.onclick = function(){
  //   console.log('clicked')
  // }
  // h1.x = 100
  // h1.y = 100
  // stage.addChild(h1)
  // console.log(h1.stage)





  // Create Title Text
  titleTxt = new createjs.Text(
    "Hello World!",       // Text
    "bold 36px verdana",  // font styling
    "#201A66"             // font color
  )
  titleTxt.shadow = new createjs.Shadow(
    "#000",   // Color
    5,        // x position
    5,        // y position
    10        // blur
  )
  createjs.Tween
    .get(titleTxt, {loop: false})  // start position of object
    .wait(1000)                   // wait before next action
    .to({rotation: 360}, 1800, createjs.Ease.bounceOut)    // to position and speed
    .wait(500)                   // wait before next action
    .to({rotation: 0}, 1800, createjs.Ease.bounceOut)      // to position and speed
  // be default, totation is at 0, 0 of object (top, left)
  // let's change that:
  titleTxt.regX = titleTxt.getMeasuredWidth() / 2
  titleTxt.regY = titleTxt.getMeasuredHeight() / 2
  // default text position on Stage is 0, 0
  // TO HORIZONTALLY/VERTICALLY CENTER
  // titleTxt.x = (stage.canvas.width - titleTxt.getMeasuredWidth()) / 2     // horizontally center text
  // titleTxt.y = (stage.canvas.height - titleTxt.getMeasuredHeight()) / 2   // vertically center text
  // Since we're using regX & regY above, the above horizontal/vertical centering isn't the same,
  // need to change to:
  titleTxt.x = stage.canvas.width / 2
  // titleTxt.y = stage.canvas.height / 2
  titleTxt.y = -titleTxt.getMeasuredHeight()
  createjs.Tween
    .get(titleTxt, {loop: false})
    .wait(1000)
    .to({y: stage.canvas.height / 2}, 1000, createjs.Ease.bounceOut)
  stage.addChild(titleTxt)

  // Create red circle
  sunShape = new createjs.Shape() // Init shape
  // For solid fill color:
  // sunShape.graphics.beginFill("#F00") // fill shape with color
  sunShape.graphics.beginRadialGradientFill(
    ["#F00","#ECB028"],   // Colors to use in gradient
    [0, 1],               // ratios for drawing colors from-to, starting from 0 to 1
    0, 0,                 // center x, y position of inner circle
    5,                    // Radius of inner circle
    0, 0,                 // center x, y position of outer circle
    25                    // Radius of outer circle
  );
  sunShape.graphics.drawCircle(
    0,  // x position
    0,  // y position
    25  // diameter size (in px)
  )
  // sunShape.graphics.drawCircle(25, 25, 25) // x position, y position, diameter size (in px)
  // OR
  sunShape.x = 25   // Change x position on stage
  sunShape.y = 25   // Change y position on stage
  sunShape.graphics.endFill() // need to end fill? works when this is commented out
  stage.addChild(sunShape) // Add Child to Stage

  createjs.Tween
    .get(sunShape, {loop:true})                         // get initial start position
    .to({x:525, y:375}, 2000, createjs.Ease.bounceIn)   // set next position, speed, and Easing
    .to({x:25, y:25}, 2000, createjs.Ease.bounceOut)    // set next position, speed, and Easing
    .wait(1000)                                         // wait before next action

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
