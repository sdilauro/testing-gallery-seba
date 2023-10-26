import { Material, MeshRenderer, TextShape, Transform, engine } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { circularSlider } from '../../helper/circular-slider'
import { createPost } from '../../helper/window-post'



export function testTransform(position: Vector3) {

  const entity = engine.addEntity()
  Transform.create(entity, { position })
  MeshRenderer.setBox(entity)

  function rotateForward() {
    let transform = Transform.getMutable(entity)
    transform.rotation = Quaternion.multiply(transform.rotation, Quaternion.fromAngleAxis(1, Vector3.Forward()))
  }

  function rotateUp() {
    let transform = Transform.getMutable(entity)
    transform.rotation = Quaternion.multiply(transform.rotation, Quaternion.fromAngleAxis(1, Vector3.Up()))
  }

  function rotateDown() {
    let transform = Transform.getMutable(entity)
    transform.rotation = Quaternion.multiply(transform.rotation, Quaternion.fromAngleAxis(1, Vector3.Down()))
  }

  function rotateBackward() {
    let transform = Transform.getMutable(entity)
    transform.rotation = Quaternion.multiply(transform.rotation, Quaternion.fromAngleAxis(1, Vector3.Backward()))
  }


  function boxRotatingForward() {
    engine.addSystem(rotateForward)
  }

  function boxRotatingUp() {
    engine.addSystem(rotateUp)
  }

  function boxRotatingDown() {
    engine.addSystem(rotateDown)
  }

  function boxRotatingBackward() {
    engine.addSystem(rotateBackward)
  }

  function removeAllSystems() {
    engine.removeSystem(rotateForward)
    engine.removeSystem(rotateUp)
    engine.removeSystem(rotateBackward)
    engine.removeSystem(rotateDown)
  }



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
    removeAllSystems()
    boxRotatingForward()
    post.displayText(`[${index}]`)
    post.displayImage(`src/test/material/material-${index}.png`)
  })

  cubeWithMaterialTimer.add((index) => {
    removeAllSystems()
    boxRotatingUp()
    post.displayText(`[${index}]`)
    post.displayImage(`src/test/material/material-${index}.png`)
  })

  cubeWithMaterialTimer.add((index) => {
    removeAllSystems()
    boxRotatingDown()
    post.displayText(`[${index}]`)
    post.displayImage(`src/test/material/material-${index}.png`)
  })

  cubeWithMaterialTimer.add((index) => {
    removeAllSystems()
    boxRotatingBackward()
    post.displayText(`[${index}]`)
    post.displayImage(`src/test/material/material-${index}.png`)
  })

}
