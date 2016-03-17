var stage, sunShape, titleTxt // Initialize variables used in Canvas

// This function runs when body loads
function init() {
  // preload image assets first with preloadJS
  // used from example here: http://createjs.com/docs/preloadjs/modules/PreloadJS.html
  var queue = new createjs.LoadQueue();
  queue.on("complete", loaded, this);
  queue.loadManifest([
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









    var image = new createjs.Bitmap( queue.getResult("greens_icon") )
    // changing image size doesn't effect Shape BitmapFill below :/
    // will need to have image at right size before using -_-
    image.scaleX = .5
    image.scaleY = .5

    // in order to move Shape around with BitmapFill,
    // need to add Shape to a Container, and move the Container
    var icon = new createjs.Shape()
    icon.graphics.beginBitmapFill(
      // queue.getResult("greens_icon"), // image to be used as fill (from preloadJs)
      image.image, // image to be used as fill (from image variable)
      "no-repeat" // image repeating or not
    )

    icon.graphics.drawCircle(
      image.image.width / 2, // x position (center of image bg)
      image.image.height / 2, // y position (center of image bg)
      50 // radius (in px)
    )

    var container = new createjs.Container()
    container.addChild( icon )
    container.x = ( stage.canvas.width - image.image.width ) / 2 // center horizontally
    container.y = ( stage.canvas.height - image.image.height ) / 2 // center vertically
    stage.addChild(container)

    var iconStroke = new createjs.Shape()
    iconStroke.graphics.setStrokeStyle( 5 ).beginStroke("#97AD33")
    iconStroke.graphics.drawCircle(
      stage.canvas.width / 2, // x position
      stage.canvas.height / 2, // y position
      60 // radius (in px)
    )
    stage.addChild( iconStroke )



    // Create Title Text
    titleTxt = new createjs.Text(
      "STORMWATER CONTROL",       // Text
      "bold 36px lato",  // font styling
      "#000"             // font color
    )

    titleTxt.x = (stage.canvas.width - titleTxt.getMeasuredWidth()) / 2 // horizontally center
    titleTxt.y = (stage.canvas.height - titleTxt.getMeasuredHeight()) / 2 + 100 // vertically center + 100px down
    // titleTxt.alpha = 0

    stage.addChild(titleTxt)





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
