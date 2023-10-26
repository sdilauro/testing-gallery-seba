import { CameraModeArea, CameraType, Material, MeshRenderer, PBPointerLock, PointerLock, Transform, engine } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { pointerVideoSystem, postColliderSystem } from './helper/window-post'
import { testGltfs } from './test/gltf'
import { testMaterial } from './test/material'
import { testMeshes } from './test/mesh'
import { testTextShape } from './test/text-shape'
import { testCameraModeArea } from './test/camera-mode'
import { testUi } from './test/ui-test'
import { testMaterialB } from './test/material-b'
import { testTransform } from './test/transform'
import { testTransformStatic } from './test/transform-static'
import { backgroundWall } from './utils/scenes/background-wall'
import { freeCameraCarpet } from './utils/scenes/free-camera-carpet'
import { testComponent } from './test/test-component'



export function main() {


  engine.addSystem(postColliderSystem)
  engine.addSystem(pointerVideoSystem)
  freeCameraCarpet(Vector3.create(8, 0.1, 2))
  backgroundWall(Vector3.create(8, 8, 15.9), Quaternion.fromEulerDegrees(0, 0, 0))
  backgroundWall(Vector3.create(0.1, 8, 8), Quaternion.fromEulerDegrees(0, 90, 0))
  backgroundWall(Vector3.create(15.9, 8, 8), Quaternion.fromEulerDegrees(0, 90, 0))
  backgroundWall(Vector3.create(8, 0, 8), Quaternion.fromEulerDegrees(90, 0, 0))
  testMaterial(Vector3.create(9, 1, 12))
  testMaterialB(Vector3.create(5, 1, 8))
  testGltfs(Vector3.create(1, 1, 12))
  testMeshes(Vector3.create(5, 1, 12))
  testTextShape(Vector3.create(13, 1, 12))
  testCameraModeArea(Vector3.create(1, 1, 8))
  testUi(Vector3.create(9, 1, 8))
  testTransform(Vector3.create(13, 1, 8))


}
