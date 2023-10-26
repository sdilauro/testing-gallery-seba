import { CameraModeArea, CameraType, Material, MeshRenderer, PointerLock, Transform, engine } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'

export function freeCameraCarpet(position: Vector3) {
  const cameraModeAreaEntity = engine.addEntity()

  CameraModeArea.createOrReplace(cameraModeAreaEntity, { area: Vector3.create(2, 1, 2), mode: CameraType.CT_FIRST_PERSON })
  PointerLock.createOrReplace(engine.CameraEntity, { isPointerLocked: false })

  Transform.create(cameraModeAreaEntity, { position, rotation: Quaternion.fromEulerDegrees(90, 0, 0), scale: Vector3.create(2, 1, 2) })
  MeshRenderer.setPlane(cameraModeAreaEntity)
  Material.setPbrMaterial(cameraModeAreaEntity, { albedoColor: Color4.Red() })

}
