var stage, container, titleTxt // Initialize variables used in Canvas

// This function runs when body loads
function init() {
  // preload image assets first with preloadJS
  // used from example here: http://createjs.com/docs/preloadjs/modules/PreloadJS.html
  var queue = new createjs.LoadQueue();
  queue.on("complete", loaded, this);
  queue.loadManifest([
     {id: "greens_big", src:"assets/images/greens.jpg"},
     {id: "greens_icon", src:"assets/images/greens_icon.jpg"},
     {id: "logo", src:"assets/images/company_logo.png"}
  ]);

  // once images above preloaded, run this function:
  function loaded() {
    // Init Stage
    stage = new createjs.Stage("stage-canvas")

    screen1( queue )  //A note on Tweens, all animations need to total up to be the same to remain in sync when looping; in this case 10000 ms
    screen2( queue )

    createjs.Ticker.addEventListener("tick", tickHandler)   // Setup ticker event listener
    createjs.Ticker.setFPS(60)                              // Set ticker FramesPerSecond
  }
}

  // once images above preloaded, run this function:
function screen1( queue ) {
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
          {wait: 950, wait2: 2600, speed: 525},
          {wait: 350, wait2: 3200, speed: 525},
          {wait: 350, wait2: 3200, speed: 525},
          {wait: 950, wait2: 2600, speed: 525}
        ]

    for (i=0; i<4; i++){
      circleStrokes[i] = new createjs.Shape()
      circleStrokes[i].graphics.setStrokeStyle( 4 ).beginStroke("#859926")
      circleStrokes[i].graphics.drawCircle(
        0, // x position
        0, // y position
        260 // radius (in px)
      )

      circleStrokes[i].y = stage.canvas.height / 2
      circleStrokes[i].alpha = 0.8
      circleStrokes[i].scaleX = 0
      circleStrokes[i].scaleY = 0
      circleStrokesContainer.addChild( circleStrokes[i] )
      stage.addChild( circleStrokesContainer )
      //Ideally would like to combine 0 and 3, 1 and 2 animations.  Method I tried failed, will need to revisit
      // Here you go :)
  createjs.Tween
    .get(circleStrokes[i], {loop:true})
		.wait(200)
		.to({x:positions[i],scaleX:0,scaleY:0})
    .wait(circleAnimations[i]["wait"])
    .to({scaleX:1, scaleY:1}, circleAnimations[i]["speed"], createjs.Ease.exponentialIn)
    .wait(circleAnimations[i]["wait2"])
    .to({x:positions[i]-stage.canvas.width}, 500, createjs.Ease.linearIn)
		.wait(5225)
    }

    // Center Image
    var bitmap = new createjs.Bitmap( queue.getResult("greens_big") ) //new Bitmap object using img as the fill
    bitmap.regX = bitmap.image.width / 2 //offset registration to middle
    bitmap.regY = bitmap.image.height / 2
    bitmap.x = stage.canvas.width / 2
    bitmap.y = stage.canvas.height / 2

    createjs.Tween
      .get(bitmap, { loop:true } )
      .to({x:(stage.canvas.width / 2)})
      .wait(650)
      .wait(3625)
      .to( {x:(stage.canvas.width / 2)-(stage.canvas.width)}, 500, createjs.Ease.linearIn )
      .wait(5225)

    var text = new createjs.Text( //create center text object
      "STORMWATER CONTROL",
      "bold 42px Roboto Condensed",
      "#FFF"
    )
    text.regX = text.getMeasuredWidth() / 2
    text.regY = text.getMeasuredHeight() / 2
    text.x = (bitmap.image.width / 2) + 50
    text.y = (bitmap.image.height / 2) + 75 //centered and slightly moved down

    createjs.Tween
      .get( text, { loop:true } )
      .to( {x:(bitmap.image.width / 2) + 50})
      .wait(200)
      .to( {scaleX: 0, scaleY: 0 } )
      .wait(350)
      .to( { scaleX: 1, scaleY: 1 }, 500,  createjs.Ease.exponentialIn )
      .wait(3225)
      .to( {x:((bitmap.image.width / 2) + 50)-stage.canvas.width}, 500, createjs.Ease.linearIn )
  	  .wait(5225)

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

    createjs.Tween
      .get( maskShape, { loop:true } )
      .to({x:bitmap.image.width / 2})
	    .wait(650)
      .to( { scaleX: 1, scaleY: 1 }, 450 )
      .wait(3625)
      .to( {x:(stage.canvas.width / 2)-(stage.canvas.width)}, 500, createjs.Ease.linearIn )
      .wait(4775)



    //Stroke that surrounds middle image
    var greensStroke = new createjs.Shape()
    greensStroke.graphics.setStrokeStyle( 10 ).beginStroke("#859926")
    greensStroke.graphics.drawCircle(
      0, // x position should be 0 when creating the object for the tween to look right
      0, // y position
      420 // radius (in px)
    )
    greensStroke.alpha = 0.8
    greensStroke.y = stage.canvas.height / 2
    stage.addChild( greensStroke )

    createjs.Tween
      .get(greensStroke, {loop:true})
  	  .to({ x:stage.canvas.width / 2 , scaleX:0 , scaleY: 0} )
  	  .wait(200)
      .to({scaleX:1, scaleY:1}, 350, createjs.Ease.exponentialIn)
      .wait(3725)
      .to( {x:(stage.canvas.width / 2)-stage.canvas.width}, 500, createjs.Ease.linearIn )
  	  .wait(5225)

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
      .get(circle, {loop:true})
	    .wait(200)
	    .to({x:stage.canvas.width / 2, scaleX:0, scaleY:0})
      .wait(1225)
      .to({scaleX:1, scaleY:1}, 300, createjs.Ease.exponentialIn)
      .wait(2550)
      .to( {x:(stage.canvas.width / 2)-stage.canvas.width}, 500, createjs.Ease.linearIn )
	     .wait(5225)

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
      .get(greensStroke, {loop:true})
	    .wait(200)
	    .to({x:stage.canvas.width / 2, scaleX:0, scaleY:0})
      .wait(1225)
      .to({scaleX:1, scaleY:1}, 300, createjs.Ease.exponentialIn)
      .wait(2550)
	    .to( {x:(stage.canvas.width / 2)-stage.canvas.width}, 500, createjs.Ease.linearIn )
	    .wait(5225)
  }

  //Create 2nd part of animation
  function screen2( queue ) {
    var textContainer = new createjs.Container()
    bg2 = new createjs.Shape()
    bg2.graphics.beginFill("#99AD00") // second bg is green'ish
    bg2.graphics.drawRect(
      0,                    // x position, must set at 0 first, can change afterwards
      0,                    // y position
      stage.canvas.width,   // width of shape (in px)
      stage.canvas.height   // height of shape (in px)
    )
    bg2.x = stage.canvas.width

    // Can only define this after shape is drawn, else no fill applies
    bg2.graphics.ef()    // short for endFill()

    stage.addChild( bg2 )

	createjs.Tween
    .get((bg2), {loop:true})
	  .to({x:stage.canvas.width, alpha:1})
    .wait(4275)
    .to({x:0, y:0}, 350, createjs.Ease.circleIn)
	  .wait(5375)
	  .to({alpha:0})

    var logo = new createjs.Bitmap( queue.getResult("logo") )
      logo.regX = logo.image.width / 2 //offset registration to middle
      logo.regY = logo.image.height / 2
      logo.x = stage.canvas.width + 500
      logo.y = (stage.canvas.height / 2) + 250

    stage.addChild ( logo )

    createjs.Tween
      .get((logo), {loop:true})
	    .to({x:stage.canvas.width + 500})
      .wait(4275)
      .to({x:stage.canvas.width / 2}, 350, createjs.Ease.circleIn)
  	  .wait(5375)
  	  .to({alpha:0})


    var circleStrokesContainer = new createjs.Container()
    var circleStrokes = [],
        xpositions = [
          (stage.canvas.width / 2) - 150,
          (stage.canvas.width / 2) + 100,
          (stage.canvas.width / 2) + 350
        ],
        ypositions = [
          250,
          200,
          600
        ],
        radius = [
          25,
          10,
          10
        ],
        circleAnimations = [
          {wait: 4775, wait2: 4225, speed: 1000},
          {wait: 5525, wait2: 3475, speed: 1000},
          {wait: 6275, wait2: 2725, speed: 1000}
        ]
    for (i=0; i<3; i++){
      circleStrokes[i] = new createjs.Shape()
      circleStrokes[i].graphics.setStrokeStyle( 3 ).beginStroke("#ACBE57")
      circleStrokes[i].graphics.drawCircle(
        0, // x position
        0, // y position
        150 // radius (in px)
      )
      circleStrokes[i].Radius = radius[i]
      circleStrokes[i].x = xpositions[i]
      circleStrokes[i].y = ypositions[i]
      circleStrokes[i].scaleX = 0
      circleStrokes[i].scaleY = 0
      circleStrokesContainer.addChild( circleStrokes[i] )
      stage.addChild( circleStrokesContainer )

      // Tween circle strokes
      createjs.Tween
        .get(circleStrokes[i], {loop:true})
		    .to({scaleX:0, scaleY:0})
        .wait(circleAnimations[i]["wait"])
        .to({scaleX:1, scaleY:1}, circleAnimations[i]["speed"], createjs.Ease.backIn)
	      .wait(circleAnimations[i]["wait2"])
    }





    var text2 = [],
        lines = [
          "Every day in Germany about 183 acres of land disappear in favour of the development",
          "of streets and building. Soil, together with air and water, are the central basis of life on",
          "earth. Its consumption affects the habitat of fauna, reduces the biodiversity and",
          "accelerates climate change. The reduction in surface permeability increases stormwater",
          "run off which harms water quality, aquatic life and recreation opportunities."
        ],
        textPositionY = [
          (stage.canvas.height /2) - 100,
          (stage.canvas.height /2) - 50,
          stage.canvas.height / 2,
          (stage.canvas.height /2) + 50,
          (stage.canvas.height /2) + 100
        ]

    for (i=0; i<5; i++){
      text2[i] = new createjs.Text(
        ["lines"],
        "24px Roboto Condensed",
        "#FFF"
      )
    text2[i].text = lines[i]
    text2[i].regX = text2[i].getMeasuredWidth() / 2
    text2[i].regY = text2[i].getMeasuredHeight() / 2
    text2[i].x = stage.canvas.width + 500
    text2[i].y = textPositionY[i]

    stage.addChild( text2[i] )

    createjs.Tween
      .get(text2[i], {loop:true})
	    .to({x:stage.canvas.width + 500})
      .wait(4275)
      .to({x:stage.canvas.width / 2}, 350, createjs.Ease.backIn)
	    .wait(5375)
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
