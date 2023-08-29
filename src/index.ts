import { engine } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { pointerVideoSystem, postColliderSystem } from './helper/window-post'
import { testGltfs } from './test/gltf'
import { testMaterial } from './test/material'
import { testMeshes } from './test/mesh'
import { testTextShape } from './test/text-shape'
import { testCameraModeArea } from './test/camera-mode'
import { testRaycast } from './test/raycast'
import { testUi } from './test/ui-test'
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'


export function main() {

  engine.addSystem(postColliderSystem)
  engine.addSystem(pointerVideoSystem)
  testGltfs(Vector3.create(1, 1, 12))
  testMeshes(Vector3.create(5, 1, 12))
  testMaterial(Vector3.create(9, 1, 12))
  testTextShape(Vector3.create(13, 1, 12))
  testCameraModeArea(Vector3.create(1, 1, 8))
  //testRaycast(Vector3.create(5,1,8))
  testUi(Vector3.create(9, 1, 8))
}
