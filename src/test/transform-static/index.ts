import { Material, MeshRenderer, TextShape, Transform, engine } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { circularSlider } from '../../helper/circular-slider'
import { createPost } from '../../helper/window-post'



export function testTransformStatic(position: Vector3) {

  const entity = engine.addEntity()
  Transform.create(entity, { position })
  MeshRenderer.setBox(entity)

  const post = createPost(position, {
    windowSize: { x: 1.5, y: 1.5 },
    fontSize: 1,
    title: '<< Ambient: Light Skybox (12:00)'
  }).move(Vector3.create(2, 0, 0))
  const cubeWithMaterialTimer = circularSlider(1.0)
  engine.addSystem(cubeWithMaterialTimer.system)
  post.onNext(cubeWithMaterialTimer.forceNext)
  post.onPrevious(cubeWithMaterialTimer.forcePrevious)
  post.onPauseResume(cubeWithMaterialTimer.togglePause)


  cubeWithMaterialTimer.add((index) => {
    Transform.create(entity, { rotation: Quaternion.fromAngleAxis(45, Vector3.Up()) })
    post.displayText(`[${index}]`)
    post.displayImage(`src/test/material/material-${index}.png`)
  })

}
