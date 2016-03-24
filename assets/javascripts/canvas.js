var stage, container, titleTxt // Initialize variables used in Canvas

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
    bg1.graphics.beginFill("#FFF") // first bg is white
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

    //Outside Circle Strokes
    var circleStrokesContainer = new createjs.Container()
    var circleStrokes = [],
        positions = [
          0,
          225,
          stage.canvas.width-225,
          stage.canvas.width
        ],
        circleAnimations = [
          {wait: 950, speed: 525},
          {wait: 350, speed: 525},
          {wait: 350, speed: 525},
          {wait: 950, speed: 525}
        ]
    for (i=0; i<4; i++){
      circleStrokes[i] = new createjs.Shape()
      circleStrokes[i].graphics.setStrokeStyle( 4 ).beginStroke("#859926")
      circleStrokes[i].graphics.drawCircle(
        0, // x position
        0, // y position
        260 // radius (in px)
      )
      circleStrokes[i].x = positions[i]
      circleStrokes[i].y = stage.canvas.height / 2
      circleStrokes[i].alpha = 0.8
      circleStrokes[i].scaleX = 0
      circleStrokes[i].scaleY = 0
      circleStrokesContainer.addChild( circleStrokes[i] )
      stage.addChild( circleStrokesContainer )
      //Ideally would like to combine 0 and 3, 1 and 2 animations.  Method I tried failed, will need to revisit
      // Here you go :)
      createjs.Tween
        .get(circleStrokes[i], {loop:false})
        .wait(circleAnimations[i]["wait"])
        .to({scaleX:1, scaleY:1}, circleAnimations[i]["speed"], createjs.Ease.exponentialIn)
    }

    // Center Image
    var bitmap = new createjs.Bitmap( queue.getResult("greens_big") ) //new Bitmap object using img as the fill
    bitmap.regX = bitmap.image.width / 2 //offset registration to middle
    bitmap.regY = bitmap.image.height / 2
    bitmap.x = stage.canvas.width / 2
    bitmap.y = stage.canvas.height / 2

    var text = new createjs.Text( //create center text object
      "STORMWATER CONTROL",
      "bold 42px Roboto Condensed",
      "#FFF"
    )
    text.regX = text.getMeasuredWidth() / 2
    text.regY = text.getMeasuredHeight() / 2
    text.x = (bitmap.image.width / 2) + 50
    text.y = (bitmap.image.height / 2) + 75 //centered and slightly moved down
    text.scaleX = 0
    text.scaleY = 0
    createjs.Tween
      .get( text, { loop:false } )
      .wait(350)
      .to( { scaleX: 1, scaleY: 1 }, 500,  createjs.Ease.exponentialIn )

    //Mask so the centered image is round
    var maskShape = new createjs.Shape()
    maskShape.graphics
      .f( "#FFF" )
      .drawCircle(
        bitmap.image.width / 2, // setting to 0 first breaks for some reason?
        bitmap.image.height / 2, // setting to 0 first breaks for some reason?
        395
      )
    maskShape.regX = bitmap.image.width / 2
    maskShape.regY = bitmap.image.height / 2
    maskShape.x = bitmap.image.width / 2
    maskShape.y = bitmap.image.height / 2
    maskShape.scaleX = 0.001
    maskShape.scaleY = 0.001
    maskShape.compositeOperation = 'destination-in'

    // Will hold image, text and mask
    container = new createjs.Container()
    container.regX = bitmap.image.width / 2
    container.regY = bitmap.image.height / 2
    container.x = stage.canvas.width / 2
    container.y = stage.canvas.height / 2

    container.addChild( bitmap, text, maskShape )
    //cache container so outside images can be seen
    container.cache(0, 0, bitmap.image.width, bitmap.image.height)
    stage.addChild(container)
    // Animate Mask to full scale over .5 seconds
    createjs.Tween
      .get( maskShape, { loop:false } )
      .wait(350)
      .to( { scaleX: 1, scaleY: 1 }, 500 )

    //Stroke that surrounds middle image
    var greensStroke = new createjs.Shape()
    greensStroke.graphics.setStrokeStyle( 10 ).beginStroke("#859926")
    greensStroke.graphics.drawCircle(
      0, // x position should be 0 when creating the object for the tween to look right
      0, // y position
      420 // radius (in px)
    )
    greensStroke.alpha = 0.8
    greensStroke.x = stage.canvas.width / 2 // x location can then be set separately after "drawing" the object
    greensStroke.y = stage.canvas.height / 2
    stage.addChild( greensStroke )
    greensStroke.scaleX = 0
    greensStroke.scaleY = 0

    createjs.Tween
      .get(greensStroke, {loop:false})
      .to({scaleX:1, scaleY:1}, 350, createjs.Ease.exponentialIn)

    //Small center icon
    var circle = new createjs.Shape()
    // Create a matrix to translate fill image
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
      58 // diameter (in px)
    )

    circle.x = stage.canvas.width / 2
    circle.y = (stage.canvas.height / 2) - 45
    circle.scaleX = 0
    circle.scaleY = 0
    stage.addChild(circle)

    createjs.Tween
      .get(circle, {loop:false})
      .wait(1225)
      .to({scaleX:1, scaleY:1}, 300, createjs.Ease.exponentialIn)

    //Small center icon stroke
    var greensStroke = new createjs.Shape()
    greensStroke.graphics.setStrokeStyle( 3 ).beginStroke("#859926")
    greensStroke.graphics.drawCircle(
      0, // x position should be 0 when creating the object for the tween to look right
      0, // y position
      65 // radius (in px)
    )
    greensStroke.alpha = 1
    greensStroke.x = stage.canvas.width / 2 // x location can then be set separately after "drawing" the object
    greensStroke.y = stage.canvas.height / 2 - 45
    stage.addChild( greensStroke )
    greensStroke.scaleX = 0
    greensStroke.scaleY = 0


    createjs.Tween
      .get(greensStroke, {loop:false})
      .wait(1225)
      .to({scaleX:1, scaleY:1}, 300, createjs.Ease.exponentialIn)

    createjs.Ticker.addEventListener("tick", tickHandler)   // Setup ticker event listener
    createjs.Ticker.setFPS(60)                      // Set ticker FramesPerSecond
  }
}



// Triggered in init() from Ticker.addEventListener
function tickHandler() {
  // Update Stage to show newly added Children, etc
  stage.update()
  container.updateCache() //console states not defined :(
  // Check out start FPS and new FPS (from setFPS())
  // console.log(createjs.Ticker.getMeasuredFPS())
}
