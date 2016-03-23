var stage, sunShape, titleTxt // Initialize variables used in Canvas

// This function runs when body loads
function init() {
  // preload image assets first with preloadJS
  // used from example here: http://createjs.com/docs/preloadjs/modules/PreloadJS.html
  var queue = new createjs.LoadQueue();
  queue.on("complete", loaded, this);
  queue.loadManifest([
     {id: "greens_big", src:"assets/images/greens.jpg"},
     {id: "greens_icon", src:"assets/images/greens_icon.jpg"}
  ]);

  // once images above preloaded, run this function:
  function loaded() {
    // Init Stage
    stage = new createjs.Stage("stage-canvas")

    // Create Background
    var bg1 = new createjs.Shape()
    // bg1.graphics.beginFill("#FFF") // first bg is white
    bg1.graphics.beginFill("ghostwhite") // first bg is white
    bg1.graphics.drawRect(
      0,                    // x position
      0,                    // y position
      stage.canvas.width,   // width of shape (in px)
      stage.canvas.height   // height of shape (in px)
    )
    // Can only define this after shape is drawn, else no fill applies
    bg1.graphics.ef()    // short for endFill()
    stage.addChild(bg1)  // Add Child to Stage
    var bg2 = new createjs.Shape()
    bg2.graphics.beginFill("#97AD33") // second bg is green'ish
    bg2.graphics.drawRect(
      stage.canvas.width,   // x position, start off screen to right
      0,                    // y position
      stage.canvas.width,   // width of shape (in px)
      stage.canvas.height   // height of shape (in px)
    )
    // Can only define this after shape is drawn, else no fill applies
    bg2.graphics.ef()    // short for endFill()
    stage.addChild(bg2)  // Add Child to Stage


    var circleStrokes = [],
        positions = [
          0,
          200,
          stage.canvas.width-200,
          stage.canvas.width
        ]
    for (i=0; i<4; i++){
      var width = 250
      circleStrokes[i] = new createjs.Shape()
      circleStrokes[i].graphics.setStrokeStyle( 3 ).beginStroke("#97AD33")
      circleStrokes[i].graphics.drawCircle(
        0, // x position
        0, // y position
        width // radius (in px)
      )
      // adding x/y here instead of above works as it should... not sure why?
      circleStrokes[i].x = positions[i]
      circleStrokes[i].y = stage.canvas.height / 2
      circleStrokes[i].scaleX = circleStrokes[i].scaleY = 0
      circleStrokes[i].alpha = .7
      stage.addChild( circleStrokes[i] )

      // Animations
      createjs.Tween
        .get(circleStrokes[i], {loop:false})  // get initial start position
        .wait(1500)
        .to({scaleX:1.0, scaleY:1.0}, 250 )//, createjs.Ease.circularOut)
        .wait(500)
        .to({scaleX:0, scaleY:0}, 2500 )//, createjs.Ease.circularOut)
    }

    var greensImage = new createjs.Bitmap( queue.getResult("greens_big") )

    // in order to move Shape around with BitmapFill,
    // need to add Shape to a Container, and move the Container
    var greens = new createjs.Shape()
    greens.graphics.beginBitmapFill(
      // queue.getResult("greens_icon"), // image to be used as fill (from preloadJs)
      greensImage.image, // image to be used as fill (from image variable)
      "no-repeat" // image repeating or not
    )

    greens.graphics.drawCircle(
      greensImage.image.width / 2, // x position (center of image bg)
      greensImage.image.height / 2, // y position (center of image bg)
      400 // radius (in px)
    )

    var greensContainer = new createjs.Container()
    greensContainer.addChild( greens )
    console.log( greensContainer.regX )
    console.log( greensContainer.regY )
    greensContainer.regX = greensImage.image.width / 2 // center horizontally
    greensContainer.regY = greensImage.image.height / 2 // center horizontally
    greensContainer.x = stage.canvas.width / 2 // center horizontally
    greensContainer.y = stage.canvas.height / 2 // center vertically
    greensContainer.scaleX = greensContainer.scaleY = 0
    stage.addChild(greensContainer)
    // Animation
    createjs.Tween
      .get(greensContainer, {loop:false})  // get initial start position
      .wait(500)
      .to({scaleX:1.0, scaleY:1.0}, 500 )//, createjs.Ease.circularOut)

    var greensStroke = new createjs.Shape()
    greensStroke.graphics.setStrokeStyle( 10 ).beginStroke("#97AD33")
    greensStroke.graphics.drawCircle(
      0, // x position
      0, // y position
      450 // radius (in px)
    )
    // adding x/y here instead of above works as it should... not sure why?
    greensStroke.x = stage.canvas.width / 2
    greensStroke.y = stage.canvas.height / 2
    greensStroke.scaleX = greensStroke.scaleY = 0
    greensStroke.alpha = .7
    stage.addChild( greensStroke )
    // Animation
    createjs.Tween
      .get(greensStroke, {loop:false})  // get initial start position
      .wait(250)
      .to({scaleX:1.0, scaleY:1.0}, 500 )//, createjs.Ease.circularOut)





    var iconImage = new createjs.Bitmap( queue.getResult("greens_icon") )
    // changing image size doesn't effect Shape BitmapFill below :/
    // will need to have image at right size before using -_-
    iconImage.scaleX = .5
    iconImage.scaleY = .5

    // in order to move Shape around with BitmapFill,
    // need to add Shape to a Container, and move the Container
    var icon = new createjs.Shape()
    icon.graphics.beginBitmapFill(
      // queue.getResult("greens_icon"), // image to be used as fill (from preloadJs)
      iconImage.image, // image to be used as fill (from image variable)
      "no-repeat" // image repeating or not
    )

    icon.graphics.drawCircle(
      iconImage.image.width / 2, // x position (center of image bg)
      iconImage.image.height / 2, // y position (center of image bg)
      50 // radius (in px)
    )

    var iconContainer = new createjs.Container()
    iconContainer.addChild( icon )
    iconContainer.regX = iconImage.image.width / 2 // center horizontally
    iconContainer.regY = iconImage.image.height / 2 // center vertically
    iconContainer.x = stage.canvas.width / 2 // center horizontally
    iconContainer.y = stage.canvas.height / 2 // center vertically
    iconContainer.scaleX = iconContainer.scaleY = 0
    stage.addChild(iconContainer)
    // Animation
    createjs.Tween
      .get(iconContainer, {loop:false})  // get initial start position
      .wait(1500)
      .to({scaleX:1.0, scaleY:1.0}, 2500 )//, createjs.Ease.circularOut)
      .wait(500)
      .to({scaleX:0, scaleY:0}, 2500 )//, createjs.Ease.circularOut)

    var iconStroke = new createjs.Shape()
    iconStroke.graphics.setStrokeStyle( 5 ).beginStroke("#97AD33")
    iconStroke.graphics.drawCircle(
      0, // x position
      0, // y position
      60 // radius (in px)
    )
    iconStroke.x = stage.canvas.width / 2
    iconStroke.y = stage.canvas.height / 2
    iconStroke.scaleX = iconStroke.scaleY = 0
    stage.addChild( iconStroke )
    // Animation
    createjs.Tween
      .get(iconStroke, {loop:false})  // get initial start position
      .wait(1500)
      .to({scaleX:1.0, scaleY:1.0}, 2500 )//, createjs.Ease.circularOut)
      .wait(500)
      .to({scaleX:0, scaleY:0}, 2500 )//, createjs.Ease.circularOut)



    // Create Title Text
    titleTxt = new createjs.Text(
      "STORMWATER CONTROL",       // Text
      "bold 36px lato",  // font styling
      "#FFF"             // font color
    )

    titleTxt.regX = titleTxt.getMeasuredWidth()/ 2 // horizontally center
    titleTxt.regY = titleTxt.getMeasuredHeight()/ 2 // vertically center + 100px down
    titleTxt.x = stage.canvas.width / 2 // horizontally center
    titleTxt.y = stage.canvas.height / 2 + 100 // vertically center + 100px down
    titleTxt.scaleX = titleTxt.scaleY = 0

    stage.addChild(titleTxt)
    // Animation
    createjs.Tween
      .get(titleTxt, {loop:false})  // get initial start position
      .wait(1500)
      .to({scaleX:1.0, scaleY:1.0}, 2500 )//, createjs.Ease.circularOut)
      .wait(500)
      .to({scaleX:0, scaleY:0}, 2500 )//, createjs.Ease.circularOut)





    // sunShape = new createjs.Shape() // Init shape
    // // For solid fill color:
    // // sunShape.graphics.beginFill("#F00") // fill shape with color
    // sunShape.graphics.beginFill("#458B00");
    // sunShape.graphics.beginStroke("#000000");
    // sunShape.graphics.drawCircle(
    //   0,  // x position
    //   0,  // y position
    //   1000  // radius size (in px)
    // )
    // // sunShape.graphics.drawCircle(25, 25, 25) // x position, y position, radius size (in px)
    // // OR
    // sunShape.x = 600   // Change x position on stage
    // sunShape.y = 300   // Change y position on stage
    // sunShape.graphics.endFill() // need to end fill? works when this is commented out
    // stage.addChild(sunShape) // Add Child to Stage
    // sunShape.scaleX = 0  //set initial x scale to 0
    // sunShape.scaleY = 0

    
    // createjs.Tween
    //   .get(sunShape, {loop:false})                         // get initial start position
    //   .to({scaleX:1.0, scaleY:1.0}, 1200, createjs.Ease.circularIn)
    //   .wait(500)
    //   .to({scaleX:0.4, scaleY:0.4, x:1100,}, 2000, createjs.Ease.circularOut)
      // .to({x:1100}, 1500, createjs.Ease.circularIn)
      // .to({x:525, y:375}, 2000, createjs.Ease.bounceIn)   // set next position, speed, and Easing
      // .to({x:25, y:25}, 2000, createjs.Ease.bounceOut)    // set next position, speed, and Easing

    createjs.Ticker.addEventListener("tick", tickHandler)   // Setup ticker event listener
    createjs.Ticker.setFPS(60)                              // Set ticker FramesPerSecond
  }
}



// Triggered in init() from Ticker.addEventListener
function tickHandler(e) {
  // Update Stage to show newly added Children, etc
  stage.update()
  // Check out start FPS and new FPS (from setFPS())
  // console.log(createjs.Ticker.getMeasuredFPS())
}
