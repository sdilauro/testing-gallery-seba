import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity} from '@dcl/sdk/react-ecs'
import { BackgroundTextureMode, Transform, UiBackground, UiText, engine } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { circularSlider } from '../../helper/circular-slider'
import { createPost } from '../../helper/window-post'

export function testUi(position: Vector3) {
  const post = createPost(position, { windowSize: { x: 1.5, y: 1.5 }, fontSize: 1 }).move(Vector3.create(2, 0, 0))
  const UiTextTimer = circularSlider(1.0)
  const textValue:string = "Welcome:\nThis is a test scene. Make sure the skybox light is 12:00 to see entities as in the screenshots."

  let backgroundColor:Color4=Color4.Black()


  engine.addSystem(UiTextTimer.system)
  post.onNext(UiTextTimer.forceNext)
  post.onPrevious(UiTextTimer.forcePrevious)
  post.onPauseResume(UiTextTimer.togglePause)

  const uiTextEntity = engine.addEntity()
  Transform.create(uiTextEntity, { position })

  

  UiTextTimer.add((index) => {
    ReactEcsRenderer.setUiRenderer(() => (
      <UiEntity
        uiTransform={{
          width: 1200,
          height: 100,
          margin: {
            top: '35px', left: '275px' }
        }}
        uiBackground={{ color:backgroundColor }}
      >
        <Label
          uiTransform={{margin:{top:10,left:20}}}
          value={textValue}
          color={Color4.White()}
          fontSize={20}
          font="serif"
          textAlign="top-left"
        />
        <Button
          value= {`Hold to change \n background color \n to blue`}
          variant="primary"
          uiTransform={{ width: 100, height: 60, margin: { left:1060, top:20 } }}
          onMouseDown={() => { backgroundColor = Color4.Blue() }}
          onMouseUp={() => { backgroundColor = Color4.Black() }}
        />
      </UiEntity>
    ))
    post.displayText(`[${index}] UIBackground=Black LabelColor=White`)
    post.displayImage(`images/to-do.png`)
  })

  UiTextTimer.add((index) => {
    ReactEcsRenderer.setUiRenderer(() => (
      <UiEntity
        uiTransform={{
          width: 1200,
          height: 100,
          margin: {
            top: '35px', left: '275px' }
        }}
        uiBackground={{ color: Color4.Gray() }}
      >
        <Label
          uiTransform={{margin:{top:10,left:20}}}
          value={textValue}
          color={Color4.Red()}
          fontSize={20}
          font="serif"
          textAlign="top-left"
        />
        <Button
          value= "Click me"
          variant="primary"
          uiTransform={{ width: 100, height: 60, margin: { left:1060, top:20 } }}
          onMouseDown={() => { console.log("Clicked on the UI") } }
        />
      </UiEntity>
    ))
    post.displayText(`[${index}] UIBackground=Gray LabelColor=Red`)
    post.displayImage(`images/to-do.png`)
  })

  UiTextTimer.add((index) => {
    ReactEcsRenderer.setUiRenderer(() => (
      <UiEntity
        uiTransform={{
          display:"none"

        }}
      />
    ))
    post.displayText(`[${index}] No UI`)
    post.displayImage(`images/to-do.png`)
  })

}

