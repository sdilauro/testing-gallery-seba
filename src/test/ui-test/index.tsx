import { Transform, engine } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { circularSlider } from '../../helper/circular-slider'
import { createPost } from '../../helper/window-post'
import { movePlayerTo } from '~system/RestrictedActions'

export function testUi(position: Vector3) {
  
  const textValue: string = "Snapshoots test"

  ReactEcsRenderer.setUiRenderer(() => (
    <UiEntity
      uiTransform={{
        width: 400,
        height: 40,
        margin: {
          top: '35px', left: '275px'
        }
      }}
      uiBackground={{ color: Color4.Black() }}
    >
      <Label
        value="Snapshoots test"
        uiTransform={{margin:{right:10, top:10, left:50, bottom:10} }}
      />

      
      <Button
			value="Start Test"
			variant='primary'
			uiTransform={{ width: 120, height: 20, margin:{right:10, top:10, left:100, bottom:10} }}
			onMouseDown={startTest}
		/>
		<Button
			value="Retake snapshots"
			uiTransform={{ width: 120, height: 20, margin: 10 }}
			onMouseDown={() => { console.log("Retake snapshots") }}
		/>

    </UiEntity>
    
  ))

  function startTest() {
    movePlayerTo(
      {
        newRelativePosition: Vector3.create(8, 1, 2),
        cameraTarget: Vector3.create(8, 2, 16)
      }
    )
  }
}