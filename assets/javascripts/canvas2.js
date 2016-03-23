var stage = new createjs.Stage( document.getElementById('stage-canvas') )
var img = new Image()
img.onload = function(){
  var bitmap = new createjs.Bitmap(img)
  bitmap.regX = bitmap.image.width / 2
  bitmap.regY = bitmap.image.height / 2
  bitmap.x = bitmap.image.width / 2
  bitmap.y = bitmap.image.height / 2

  var text = new createjs.Text(
    "SOME TEXT",
    "bold 24px helvetica",
    "#FFF"
  )
  text.regX = text.getMeasuredWidth() / 2
  text.regY = text.getMeasuredHeight() / 2
  text.x = bitmap.image.width / 2
  text.y = bitmap.image.height / 2
  text.scaleX = text.scaleY = 0.5
  createjs.Tween
    .get( text, { loop:true } )
    .wait(500)
    .to( { scaleX: 1, scaleY: 1 }, 1000 )
    .wait(500)
    .to( { scaleX: 0.5, scaleY: 0.5 }, 1000 )

  var maskShape = new createjs.Shape()
  maskShape.graphics
    .f( "#FFF" )
    .drawCircle( 150,150,150 )
  maskShape.regX = bitmap.image.width / 2
  maskShape.regY = bitmap.image.height / 2
  maskShape.x = bitmap.image.width / 2
  maskShape.y = bitmap.image.height / 2

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
    .get( maskShape, { loop:true } )
    .wait(500)
    .to( { scaleX: 0.001, scaleY: 0.001 }, 1000 )
    .wait(500)
    .to( { scaleX: 1, scaleY: 1 }, 1000 )

  createjs.Ticker.addEventListener( "tick", tickHandler )
  createjs.Ticker.setFPS(60)
}

// Updates stage for animations
function tickHandler() {
  stage.update()
}

img.src = "//unsplash.it/300/300"
