var stage, container, container2, imgContainer // Initialize variables used in Canvas

// This function runs when body loads
function init() {
  // preload image assets first with preloadJS
  // used from example here: http://createjs.com/docs/preloadjs/modules/PreloadJS.html
  var queue = new createjs.LoadQueue()
  queue.on("complete", loaded, this) // on complete, call function loaded()
  // images to preload
  queue.loadManifest([
     {id: "greens_big",   src:"assets/images/greens.jpg"},
     {id: "greens_icon",  src:"assets/images/greens_icon.jpg"},
     {id: "logo",         src:"assets/images/company_logo.png"}
  ])

  // once images above have preloaded, run this function
  function loaded() {
    stage = new createjs.Stage("stage-canvas") // Init Stage

    // A note on Tweens, all animations need to total up 
    // to be the same to remain in sync when "looping" 
    // (in this case 10000 ms)
    screen1( queue ) // screen1 content
    screen2( queue ) // screen2 content

    createjs.Ticker.addEventListener("tick", tickHandler)   // Setup ticker event listener
    createjs.Ticker.setFPS(60)                              // Set ticker FramesPerSecond
  }
}

function screen1( queue ) {
  // Container for screen1
  container = new createjs.Container()
  container.x = 0
  container.y = 0

  // slide screen1 container off screen while screen2 container slides on screen
  createjs.Tween
    .get(container, {loop:true})
    .wait(4275)
    .to({x:stage.canvas.width * -1}, 450, createjs.Ease.quartInOut)
    .wait(5275)
    .to({x:0})

  // Create Background
  var bg1 = new createjs.Shape()
  bg1.graphics.beginFill("#FFF") // first bg is white
  bg1.graphics.drawRect(
    0,                    // x position
    0,                    // y position
    stage.canvas.width,   // width of shape (in px)
    stage.canvas.height   // height of shape (in px)
  )
  // Can only define this after shape is drawn, else no fill applies
  bg1.graphics.ef()    // short for endFill()
  container.addChild( bg1 )

  // Outside Circle Strokes
  var circleStrokesContainer = new createjs.Container(),
      circleStrokes = [],
      positions = [
        0,
        225,
        stage.canvas.width-225,
        stage.canvas.width
      ],
      circleAnimations = [
        {wait: 1150,  wait2: 2625, speed: 500, ease: createjs.Ease.cubicOut},
        {wait: 550,   wait2: 3225, speed: 500, ease: createjs.Ease.cubicOut},
        {wait: 550,   wait2: 3225, speed: 500, ease: createjs.Ease.cubicOut},
        {wait: 1150,  wait2: 2625, speed: 500, ease: createjs.Ease.cubicOut}
      ]

  for (i=0; i<positions.length; i++){
    circleStrokes[i] = new createjs.Shape()
    circleStrokes[i].graphics.setStrokeStyle( 4 ).beginStroke("#859926")
    circleStrokes[i].graphics.drawCircle(
      0,  // x position
      0,  // y position
      260 // radius (in px)
    )

    circleStrokes[i].x = positions[i]
    circleStrokes[i].y = stage.canvas.height / 2
    circleStrokes[i].alpha = 0.8
    circleStrokes[i].scaleX = 0
    circleStrokes[i].scaleY = 0
    circleStrokesContainer.addChild( circleStrokes[i] )
    container.addChild( circleStrokesContainer )

    createjs.Tween
      .get(circleStrokes[i], {loop:true})
      .wait(circleAnimations[i]["wait"])
      .to({scaleX:1, scaleY:1}, circleAnimations[i]["speed"], circleAnimations[i]["ease"])
      .wait(circleAnimations[i]["wait2"])
      .to({x:positions[i]-stage.canvas.width}, 500, createjs.Ease.linearIn)
      .wait(5225)
  }

  // Center Image
  var bitmap = new createjs.Bitmap( queue.getResult("greens_big") ) // new Bitmap object using img as the fill
  bitmap.regX = bitmap.image.width / 2 // offset registration to middle
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

  var text = new createjs.Text( // create center text object
    "STORMWATER CONTROL",
    "bold 42px Roboto Condensed",
    "#FFF"
  )
  text.regX = text.getMeasuredWidth() / 2
  text.regY = text.getMeasuredHeight() / 2
  text.x = (bitmap.image.width / 2)
  text.y = (bitmap.image.height / 2) + 75 // centered and slightly moved down

  createjs.Tween
    .get( text, { loop:true } )
    .to( {x:(bitmap.image.width / 2) + 50})
    .wait(200)
    .to( {scaleX: 0, scaleY: 0 } )
    .wait(350)
    .to( { scaleX: 1, scaleY: 1 }, 500,  createjs.Ease.linearIn )
    .wait(3225)
    .to( {x:((bitmap.image.width / 2) + 50)-stage.canvas.width}, 500, createjs.Ease.linearIn )
    .wait(5225)

  // Mask so the centered image is round
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
  imgContainer = new createjs.Container()
  imgContainer.regX = bitmap.image.width / 2
  imgContainer.regY = bitmap.image.height / 2
  imgContainer.x = stage.canvas.width / 2
  imgContainer.y = stage.canvas.height / 2

  imgContainer.addChild( bitmap, text, maskShape )
  // need to cache imgContainer so images outside this container don't get masked
  imgContainer.cache(0, 0, bitmap.image.width, bitmap.image.height)
  container.addChild( imgContainer )

  createjs.Tween
    .get( maskShape, { loop:true } )
    .to({x:bitmap.image.width / 2})
    .wait(450)
    .to( { scaleX: 1, scaleY: 1 }, 450 )
    .wait(3825)
    .to( {x:(stage.canvas.width / 2)-(stage.canvas.width)}, 500, createjs.Ease.cubicOut)
    .wait(4775)

  // Stroke that surrounds middle image
  var greensStroke = new createjs.Shape()
  greensStroke.graphics.setStrokeStyle( 10 ).beginStroke("#859926")
  greensStroke.graphics.drawCircle(
    0, // x position should be 0 when creating the object for the tween to look right
    0, // y position
    420 // radius (in px)
  )
  greensStroke.alpha = 0.8
  greensStroke.y = stage.canvas.height / 2
  container.addChild( greensStroke )

  createjs.Tween
    .get(greensStroke, {loop:true})
    .to({ x:stage.canvas.width / 2 , scaleX:0 , scaleY: 0} )
    .wait(200)
    .to({scaleX:1, scaleY:1}, 350, createjs.Ease.exponentialIn)
    .wait(3725)
    .to( {x:(stage.canvas.width / 2)-stage.canvas.width}, 500, createjs.Ease.cubicOut )
    .wait(5225)

  var iconImg = new createjs.Bitmap(queue.getResult("greens_icon")), // Image for center icon
      iconCircle = new createjs.Shape(), // Small center icon
      matrix = new createjs.Matrix2D() // Create a matrix to translate fill image
        .translate(
          (iconImg.image.width * -1) / 2, // Move width to 50% of the image
          (iconImg.image.height * -1) /2 // Move height to 50% of the image
        )

  iconCircle.graphics.beginBitmapFill(
    iconImg.image, // image to be used as fill
    "no-repeat",
    matrix // Pass in the matrix
  )

  // Draw the circle at 0,0
  iconCircle.graphics.drawCircle(
    0, // x position
    0, // y position
    58 // diameter (in px)
  )

  iconCircle.x = stage.canvas.width / 2
  iconCircle.y = (stage.canvas.height / 2) - 45
  iconCircle.scaleX = 0
  iconCircle.scaleY = 0
  container.addChild( iconCircle )

  createjs.Tween
    .get(iconCircle, {loop:true})
    .wait(200)
    .to({x:stage.canvas.width / 2, scaleX:0, scaleY:0})
    .wait(1025)
    .to({scaleX:1, scaleY:1}, 300, createjs.Ease.exponentialIn)
    .wait(2750)
    .to( {x:(stage.canvas.width / 2)-stage.canvas.width}, 500, createjs.Ease.cubicOut )
    .wait(5225)

  // Small center icon stroke
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
  container.addChild( greensStroke )
  greensStroke.scaleX = 0
  greensStroke.scaleY = 0

  createjs.Tween
    .get(greensStroke, {loop:true})
    .wait(200)
    .to({x:stage.canvas.width / 2, scaleX:0, scaleY:0})
    .wait(1025)
    .to({scaleX:1, scaleY:1}, 300, createjs.Ease.exponentialIn)
    .wait(2750)
    .to( {x:(stage.canvas.width / 2)-stage.canvas.width}, 500, createjs.Ease.cubicOut)
    .wait(5225)

  stage.addChild( container )
}

// Create 2nd part of animation
function screen2( queue ) {
  // Container for screen1
  container2 = new createjs.Container()
  container2.x = stage.canvas.width
  container2.y = 0

  // slide screen2 container on screen while screen1 container slides off screen
  createjs.Tween
    .get(container2, {loop:true})
    .wait(3950)
    .to({x:0, y:0}, 550, createjs.Ease.quartIn)
    .wait(5500)
    .to({x:stage.canvas.width})

  bg2 = new createjs.Shape()
  bg2.graphics.beginFill("#99AD00") // second bg is green'ish
  bg2.graphics.drawRect(
    0,                    // x position, must set at 0 first, can change afterwards
    0,                    // y position
    stage.canvas.width,   // width of shape (in px)
    stage.canvas.height   // height of shape (in px)
  )

  // Can only define this after shape is drawn, else no fill applies
  bg2.graphics.ef()    // short for endFill()
  container2.addChild( bg2 )

  var logo = new createjs.Bitmap( queue.getResult("logo") )
  logo.regX = logo.image.width / 2 // offset registration to middle
  logo.regY = logo.image.height / 2
  logo.x = stage.canvas.width / 2
  logo.y = (stage.canvas.height / 2) + 250
  container2.addChild( logo )

  var circleStrokesContainer = new createjs.Container(),
      circleStrokes = [],
      xpositions = [
        (stage.canvas.width / 2) - 150,
        (stage.canvas.width / 2) + 100,
        (stage.canvas.width / 2) + 350
      ],
      ypositions = [
        250,
        200,
        550
      ],
      radius = [
        175,
        150,
        100
      ],
      circleAnimations = [
        {wait: 4775, wait2: 4225, speed: 1000},
        {wait: 5525, wait2: 3475, speed: 1000},
        {wait: 6275, wait2: 2725, speed: 1000}
      ]

  for (i=0; i<3; i++){
    circleStrokes[i] = new createjs.Shape()
    circleStrokes[i].graphics.setStrokeStyle( 2 ).beginStroke("#ACBE57")
    circleStrokes[i].graphics.drawCircle(
      0, // x position
      0, // y position
      radius[i] // radius (in px)
    )

    circleStrokes[i].x = xpositions[i]
    circleStrokes[i].y = ypositions[i]
    circleStrokes[i].scaleX = 0
    circleStrokes[i].scaleY = 0
    circleStrokesContainer.addChild( circleStrokes[i] )
    container2.addChild( circleStrokesContainer )

    // Tween circle strokes
    createjs.Tween
      .get(circleStrokes[i], {loop:true})
      .to({scaleX:0, scaleY:0})
      .wait(circleAnimations[i]["wait"])
      .to({scaleX:1, scaleY:1}, circleAnimations[i]["speed"], createjs.Ease.cubicOut)
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

    container2.addChild( text2[i] )

    createjs.Tween
      .get(text2[i], {loop:true})
      .to({x:stage.canvas.width + 500})
      .wait(4275)
      .to({x:stage.canvas.width / 2}, 350, createjs.Ease.cubicIn)
      .wait(5375)
  }

  stage.addChild( container2 )
}


// Triggered in init() from Ticker.addEventListener
function tickHandler() {
  // Update Stage to show newly added Children, etc
  stage.update()
  imgContainer.updateCache()
  // Check out start FPS and new FPS (from setFPS())
  // console.log(createjs.Ticker.getMeasuredFPS())
}
