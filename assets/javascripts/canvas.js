var stage, sunShape, titleTxt, secretTxt // Initialize variables used in Canvas

// This function runs when body loads
function init() {
  // Init Stage
  stage = new createjs.Stage("stage-canvas")

  // Create Background
  var bg = new createjs.Shape()
  bg.graphics.beginFill("#686868")
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
    "Click Me!",       // Text
    "bold 36px lato",  // font styling
    "#FFFF00"             // font color
  )
  titleTxt.shadow = new createjs.Shadow(
    "#000",   // Color
    2,        // x position
    2,        // y position
    2        // blur
  )

  titleTxt.x = stage.canvas.width / 2
  titleTxt.y = stage.canvas.height / 2
  titleTxt.alpha = 0

  // createjs.Tween
  //   .get(titleTxt, {loop: false})  // start position of object
  // be default, rotation is at 0, 0 of object (top, left)
  // let's change that:
  titleTxt.regX = titleTxt.getMeasuredWidth() / 2
  titleTxt.regY = titleTxt.getMeasuredHeight() / 2
  // default text position on Stage is 0, 0
  // TO HORIZONTALLY/VERTICALLY CENTER
  // titleTxt.x = (stage.canvas.width - titleTxt.getMeasuredWidth()) / 2     // horizontally center text
  // titleTxt.y = (stage.canvas.height - titleTxt.getMeasuredHeight()) / 2   // vertically center text
  // Since we're using regX & regY above, the above horizontal/vertical centering isn't the same,
  // need to change to:
  // titleTxt.x = stage.canvas.width / 2
  // // titleTxt.y = stage.canvas.height / 2
  // titleTxt.y = -titleTxt.getMeasuredHeight()
  createjs.Tween
    .get(titleTxt, {loop: false})
    .wait(3000)
    .to({x: 300, alpha:1, rotation:360}, 2000)
  stage.addChild(titleTxt)
  titleTxt.addEventListener("click", function(event) { alert("Hello World!"); })

  secretTxt = new createjs.Text(
    "You Found Me!",       // Text
    "bold 72px lato",  // font styling
    "#FFFF00"             // font color
  )
  secretTxt.shadow = new createjs.Shadow(
    "#000",   // Color
    2,        // x position
    2,        // y position
    2        // blur
  )

  secretTxt.x = 220
  secretTxt.y = 400
  secretTxt.alpha = 0.01
  stage.addChild(secretTxt)

  secretTxt.addEventListener("click", function(event3) {
    createjs.Tween
      .get(secretTxt, {loop:false})
      .to({alpha:1}, 3000, createjs.Ease.circularIn)
    })

  sunShape = new createjs.Shape() // Init shape
  // For solid fill color:
  // sunShape.graphics.beginFill("#F00") // fill shape with color
  sunShape.graphics.beginFill("#458B00");
  sunShape.graphics.beginStroke("#000000");
  sunShape.graphics.drawCircle(
    0,  // x position
    0,  // y position
    1000  // diameter size (in px)
  )
  // sunShape.graphics.drawCircle(25, 25, 25) // x position, y position, diameter size (in px)
  // OR
  sunShape.x = 600   // Change x position on stage
  sunShape.y = 300   // Change y position on stage
  sunShape.graphics.endFill() // need to end fill? works when this is commented out
  stage.addChild(sunShape) // Add Child to Stage
  sunShape.scaleX = 0  //set initial x scale to 0
  sunShape.scaleY = 0

  
  createjs.Tween
    .get(sunShape, {loop:false})                         // get initial start position
    .to({scaleX:1.0, scaleY:1.0}, 1200, createjs.Ease.circularIn)
    .wait(500)
    .to({scaleX:0.4, scaleY:0.4, x:1100,}, 2000, createjs.Ease.circularOut)
    // .to({x:1100}, 1500, createjs.Ease.circularIn)
    // .to({x:525, y:375}, 2000, createjs.Ease.bounceIn)   // set next position, speed, and Easing
    // .to({x:25, y:25}, 2000, createjs.Ease.bounceOut)    // set next position, speed, and Easing

  sunShape.addEventListener("click", function(event2) { //adds click listener on sunShape
    createjs.Tween
      .get(sunShape, {loop:false})
      .to({beginFill:"#000000", scaleX:0.3, scaleY:0.3}, 250, createjs.Ease.circularIn)
      .to({scaleX:0.4, scaleY:0.4, beginFill:"#458B0"}, 250, createjs.Ease.circularInOut)
    })

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
