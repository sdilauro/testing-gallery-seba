import ReactEcs, { Label, ReactEcsRenderer, UiEntity} from '@dcl/sdk/react-ecs'

import { BackgroundTextureMode, Transform, UiBackground, UiText, engine } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { circularSlider } from '../../helper/circular-slider'
import { createPost } from '../../helper/window-post'

export function testUiText(position: Vector3) {
  const post = createPost(position, { windowSize: { x: 1.5, y: 1.5 }, fontSize: 1 }).move(Vector3.create(2, 0, 0))
  const UiTextTimer = circularSlider(1.0)




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
        uiBackground={{ color: Color4.Black() }}
      >
        <Label
          uiTransform={{margin:{top:10,left:20}}}
          value="Welcome:\nThis is a test scene. Make sure the skybox light is 12:00 to see entities as in the screenshots."
          color={Color4.White()}
          fontSize={25}
          font="serif"
          textAlign="top-left"
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
          value="Welcome:\nThis is a test scene. Make sure the skybox light is 12:00 to see entities as in the screenshots."
          color={Color4.Red()}
          fontSize={25}
          font="serif"
          textAlign="top-left"
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
          width: 0,
          height: 0
        }}
      />
    ))
    post.displayText(`[${index}] No UI`)
    post.displayImage(`images/to-do.png`)
  })

}
