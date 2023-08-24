import { Font, TextAlignMode, TextShape, Transform, engine } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { circularSlider } from '../../helper/circular-slider'
import { createPost } from '../../helper/window-post'

export function testTextShape(position: Vector3) {
  const post = createPost(position, { windowSize: { x: 1.5, y: 1.5 }, fontSize: 1 }).move(Vector3.create(2, 0, 0))
  const TextShapeTimer = circularSlider(1.0)

  engine.addSystem(TextShapeTimer.system)
  post.onNext(TextShapeTimer.forceNext)
  post.onPrevious(TextShapeTimer.forcePrevious)
  post.onPauseResume(TextShapeTimer.togglePause)

  const textEntity = engine.addEntity()
  Transform.create(textEntity, { position })

  TextShapeTimer.add((index) => {
    TextShape.createOrReplace(textEntity, {text:'Default text'})
    post.displayText(`[${index}] default`)
    post.displayImage(`src/test/text-shape/text-shape-${index}.png`)
  })

  TextShapeTimer.add((index) => {
    TextShape.createOrReplace(textEntity, {text:'Red text', fontSize:3, textColor:Color4.Red()})
    post.displayText(`[${index}] fontSize=3 textColor=Color4.Red()`)
    post.displayImage(`src/test/text-shape/text-shape-${index}.png`)
  })

/* The text outline works correctly, but the default value of the property is lost (each iteration is affected by the value set here)  */
   TextShapeTimer.add((index) => {
    TextShape.createOrReplace(textEntity, {text:'Text with\nred outline', fontSize:2, outlineColor:Color4.Red(), outlineWidth:0.1})
    post.displayText(`[${index}] fontSize=2 outlineColor:Color4.Red() outlineWidth=0.1`)
    post.displayImage(`src/test/text-shape/text-shape-${index}.png`)
   }) 
  
  /* Text font don't change  */
  TextShapeTimer.add((index) => {
    TextShape.createOrReplace(textEntity, {text:'Monospace', fontSize:2, font:Font.F_MONOSPACE})
    post.displayText(`[${index}] fontSize=2 font=Font.F_MONOSPACE`)
    post.displayImage(`images/to-do.png`)
  }) 

  /* Text alignment has inverse behavior  */
  TextShapeTimer.add((index) => {
    TextShape.createOrReplace(textEntity, {text:'Bottom Center', fontSize:2, textAlign:TextAlignMode.TAM_BOTTOM_CENTER})
    post.displayText(`[${index}] fontSize=2 textAlign=TAM_BOTTOM_CENTER`)
    post.displayImage(`images/to-do.png`)
  }) 

  /* Text alignment has inverse behavior  */
  TextShapeTimer.add((index) => {
    TextShape.createOrReplace(textEntity, {text:'Middle Right', fontSize:2, textAlign:TextAlignMode.TAM_MIDDLE_RIGHT})
    post.displayText(`[${index}] fontSize=2 textAlign=TAM_MIDDLE_RIGHT`)
    post.displayImage(`images/to-do.png`)
  }) 
}
