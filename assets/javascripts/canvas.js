var stage, sunShape, titleTxt // Initialize variables used in Canvas

var isChrome = window.chrome !== null && window.chrome !== undefined && window.navigator.vendor === "Google Inc.";

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



      var img = new Image()
      img.src = "assets/images/greens.jpg"
      var bitmap = new createjs.Bitmap(img)
      bitmap.regX = bitmap.image.width / 2
      bitmap.regY = bitmap.image.height / 2
      bitmap.x = -500
      bitmap.y = -300

      var text = new createjs.Text(
        "STORMWATER CONTROL",
        "bold 40px helvetica",
        "#FFF"
      )
      text.regX = text.getMeasuredWidth() / 2
      text.regY = text.getMeasuredHeight() / 2
      text.x = bitmap.image.width / 2
      text.y = (bitmap.image.height / 2) + 75
      text.scaleX = text.scaleY = 0
      createjs.Tween
        .get( text, { loop:false } )
        .wait(350)
        .to( { scaleX: 1, scaleY: 1 }, 500,  createjs.Ease.linearIn )

      var maskShape = new createjs.Shape()
      maskShape.graphics
        .f( "#FFF" )
        .drawCircle(
          0,
          0,
          415 )
      maskShape.regX = bitmap.image.width / 2
      maskShape.regY = bitmap.image.height / 2
      maskShape.x = bitmap.image.width / 2
      maskShape.y = bitmap.image.height / 2
      maskShape.scaleX = 0.001
      maskShape.scaleY = 0.001
      maskShape.compositeOperation = 'destination-in'

      // Will hold image, text and mask
      var container = new createjs.Container()
    	container.regX = bitmap.image.width / 2
      container.regY = bitmap.image.height / 2
      container.x = stage.canvas.width / 2
      container.y = stage.canvas.height / 2


      container.addChild( bitmap, text, maskShape )
      stage.addChild(container)

      createjs.Tween
        .get( maskShape, { loop:false } )
        .wait(350)
        .to( { scaleX: 1, scaleY: 1 }, 500 )

        var circleStrokesContainer = new createjs.Container()
        var circleStrokes = [],
            positions = [
              0,
              200,
              stage.canvas.width-200,
              stage.canvas.width
            ]
        for (i=0; i<4; i++){
          circleStrokes[i] = new createjs.Shape()
          circleStrokes[i].graphics.setStrokeStyle( 5 ).beginStroke("#97AD33")
          circleStrokes[i].graphics.drawCircle(
            0, // x position
            0, // y position
            250 // radius (in px)
          )
          circleStrokes[i].x = positions[i]
          circleStrokes[i].y = stage.canvas.height / 2
          circleStrokes[i].alpha = 1
          circleStrokes[i].scaleX = 0
          circleStrokes[i].scaleY = 0
          stage.addChild( circleStrokes[i] )
        }

          createjs.Tween
            .get(circleStrokes[0], {loop:false})
            .wait(950)
            .to({scaleX:1, scaleY:1}, 525, createjs.Ease.linearIn)

          createjs.Tween
            .get(circleStrokes[1], {loop:false})
            .wait(700)
            .to({scaleX:1, scaleY:1}, 525, createjs.Ease.linearIn)

          createjs.Tween
            .get(circleStrokes[2], {loop:false})
            .wait(700)
            .to({scaleX:1, scaleY:1}, 525, createjs.Ease.linearIn)

          createjs.Tween
            .get(circleStrokes[3], {loop:false})
            .wait(950)
            .to({scaleX:1, scaleY:1}, 525, createjs.Ease.linearIn)



    var greensStroke = new createjs.Shape()
    greensStroke.graphics.setStrokeStyle( 10 ).beginStroke("#97AD33")
    greensStroke.graphics.drawCircle(
      0, // x position should be 0 when creating the object for the tween to look right
      0, // y position
      450 // radius (in px)
    )
    greensStroke.alpha = 1
    greensStroke.x = stage.canvas.width / 2 // x location can then be set separately after "drawing" the object
    greensStroke.y = stage.canvas.height / 2
    stage.addChild( greensStroke )
    greensStroke.scaleX = 0
    greensStroke.scaleY = 0


    createjs.Tween
      .get(greensStroke, {loop:false})
      .to({scaleX:1, scaleY:1}, 525, createjs.Ease.linearIn)

    var circle = new createjs.Shape()
      // Create a matrix
    var matrix = new createjs.Matrix2D()
        .translate(-450 / 2, -470 /2)  // Move to 50% the width and height of the image

    circle.graphics.beginBitmapFill(
      queue.getResult("greens_icon"), // image to be used as fill
      "no-repeat",
      matrix // Pass in the matrix
    )

    // Draw the circle at 0,0
    circle.graphics.drawCircle(
      0, // x position
      0, // y position
      50 // diameter (in px)
    )

    // Move it to wherever you want
    circle.x = stage.canvas.width / 2
    circle.y = (stage.canvas.height / 2) - 75
    circle.scaleX = circle.scaleY = 0
    stage.addChild(circle)

    createjs.Tween
      .get(circle, {loop:false})
      .wait(1225)
      .to({scaleX:1, scaleY:1}, 300, createjs.Ease.linearIn)

      var greensStroke = new createjs.Shape()
      greensStroke.graphics.setStrokeStyle( 5 ).beginStroke("#97AD33")
      greensStroke.graphics.drawCircle(
        0, // x position should be 0 when creating the object for the tween to look right
        0, // y position
        60 // radius (in px)
      )
      greensStroke.alpha = 1
      greensStroke.x = stage.canvas.width / 2 // x location can then be set separately after "drawing" the object
      greensStroke.y = stage.canvas.height / 2 - 75
      stage.addChild( greensStroke )
      greensStroke.scaleX = 0
      greensStroke.scaleY = 0


      createjs.Tween
        .get(greensStroke, {loop:false})
        .wait(1225)
        .to({scaleX:1, scaleY:1}, 300, createjs.Ease.linearIn)

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
