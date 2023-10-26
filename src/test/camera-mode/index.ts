import { BillboardMode, CameraModeArea, CameraType, Material, MeshRenderer, Transform, engine } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { circularSlider } from '../../helper/circular-slider'
import { createPost } from '../../helper/window-post'

export function testCameraModeArea(position: Vector3) {
  const new_position = Vector3.create(position.x, 0.1, position.z)
  const post = createPost(position, { title: "<< Walk to red area to force camera", windowSize: { x: 1.5, y: 1.5 }, fontSize: 1, billboard: BillboardMode.BM_ALL }).move(Vector3.create(2, 0, 0))
  const testCameraTimer = circularSlider(1.0)

  engine.addSystem(testCameraTimer.system)
  post.onNext(testCameraTimer.forceNext)
  post.onPrevious(testCameraTimer.forcePrevious)

  post.onPauseResume(testCameraTimer.togglePause)

  const cameraModeAreaEntity = engine.addEntity()
  Transform.create(cameraModeAreaEntity, { position: new_position, rotation: Quaternion.fromEulerDegrees(90, 0, 0), scale: Vector3.create(1, 1.5, 1) })
  testCameraTimer.add((index) => {
    CameraModeArea.createOrReplace(cameraModeAreaEntity, { area: Vector3.create(1, 1, 3), mode: CameraType.CT_FIRST_PERSON })
    MeshRenderer.setPlane(cameraModeAreaEntity)
    Material.setPbrMaterial(cameraModeAreaEntity, { albedoColor: Color4.Red() })

    post.displayText(`[${index}] force first person`)
    post.displayImage(`src/test/camera-mode/first-person.png`)
  })

  testCameraTimer.add((index) => {
    CameraModeArea.createOrReplace(cameraModeAreaEntity, { area: Vector3.create(1, 1, 0.1), mode: CameraType.CT_CINEMATIC })
    MeshRenderer.setPlane(cameraModeAreaEntity)
    post.displayText(`[${index}] force cinematic`)
    post.displayImage(`src/test/camera-mode/third-person.png`)
  })

  testCameraTimer.add((index) => {
    CameraModeArea.createOrReplace(cameraModeAreaEntity, { area: Vector3.create(1, 1, 0.1), mode: CameraType.CT_THIRD_PERSON })
    MeshRenderer.setPlane(cameraModeAreaEntity)
    post.displayText(`[${index}] force third person`)
    post.displayImage(`src/test/camera-mode/third-person.png`)
  })
}
