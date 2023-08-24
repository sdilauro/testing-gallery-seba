import { Material, MaterialTransparencyMode, MeshCollider, MeshRenderer, Transform, engine } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { circularSlider } from '../../helper/circular-slider'
import { createPost } from '../../helper/window-post'

export function testMeshes(position: Vector3) {
  const post = createPost(position, { windowSize: { x: 1.5, y: 1.5 }, fontSize: 1, title: '<< Ambient: Light Skybox (12:00)'}).move(Vector3.create(2, 0, 0))
  const meshTimer = circularSlider(1.0)
  engine.addSystem(meshTimer.system)
  post.onNext(meshTimer.forceNext)
  post.onPrevious(meshTimer.forcePrevious)
  post.onPauseResume(meshTimer.togglePause)

  const meshEntity = engine.addEntity()
  Transform.create(meshEntity, { position })

  //Primitive cylinder
  meshTimer.add((index) => {
    MeshRenderer.setCylinder(meshEntity, 1.0, 1.0)
    MeshCollider.setCylinder(meshEntity, 1.0, 1.0)
    post.displayText('cylinder')
    post.displayImage('src/test/mesh/cylinder.png')
  })

  //Cylinder with material emissive
  meshTimer.add((index) => {
    MeshRenderer.setCylinder(meshEntity, 1.0, 1.0)
    MeshCollider.setCylinder(meshEntity, 1.0, 1.0)
    Material.setPbrMaterial(meshEntity, {
      albedoColor: Color4.Blue(),
      emissiveColor: Color4.Blue(),
      emissiveIntensity: 100
    })
    post.displayText('cylinder - Albedo=(0,0,1) Emissive=(0,0,1) EmissiveIntensity=100')
    post.displayImage('src/test/mesh/cylinder-emissive.png')
  })

  //Cylinder - with alpha
  meshTimer.add((index) => {
    MeshRenderer.setCylinder(meshEntity, 1.0, 1.0)
    MeshCollider.setCylinder(meshEntity, 1.0, 1.0)
    Material.setPbrMaterial(meshEntity, {
      metallic: 0,
      roughness: 0,
      alphaTest: 1,
      albedoColor: Color4.Blue()
    })
    post.displayText(`cylinder - Albedo=(0,0,1) Metallic=0 Roughness=0 Alpha=0.5`)
    post.displayImage('src/test/mesh/cylinder-blue.png')
  })

  //Cylinder - with uv
  meshTimer.add((index) => {
    MeshRenderer.setCylinder(meshEntity, 1.0, 1.0)
    MeshCollider.setCylinder(meshEntity, 1.0, 1.0)
    Material.setPbrMaterial(meshEntity, {
      metallic: 0.5,
      roughness: 0.2,
      alphaTest: 1,
      texture: { tex: { $case: 'texture', texture: { src: 'images/uv-checker.png' } } },
    })
    post.displayText(`cylinder - Albedo=(0,0,1) Metallic=0.5 Roughness=0.2 Alpha=1 NormalMap`)
    post.displayImage('src/test/mesh/cylinder-normal-map.png')
  })

  meshTimer.add((index) => {
    MeshRenderer.setSphere(meshEntity)
    MeshCollider.setSphere(meshEntity)
    Material.setPbrMaterial(meshEntity, {})
    post.displayText('sphere')
    post.displayImage('src/test/mesh/sphere.png')
  })

  meshTimer.add((index) => {
    MeshRenderer.setSphere(meshEntity)
    MeshCollider.setSphere(meshEntity)
    Material.setPbrMaterial(meshEntity, { emissiveColor:Color4.Green(), emissiveIntensity:0.8})
    post.displayText('sphere - emmisiveColor=Color4.Green() emissiveIntesity=0.8')
    post.displayImage('src/test/mesh/sphere-emissive-green.png')
  })

  meshTimer.add((index) => {
    MeshRenderer.setBox(meshEntity)
    MeshCollider.setBox(meshEntity)
    Material.setPbrMaterial(meshEntity, {})
    post.displayText('box')
    post.displayImage('src/test/mesh/box.png')
  })

  meshTimer.add((index) => {
    MeshRenderer.setPlane(meshEntity)
    MeshCollider.setPlane(meshEntity)
    post.displayText('plane')
    post.displayImage('src/test/mesh/plane.png')
  })

  meshTimer.add((index) => {
    MeshRenderer.setCylinder(meshEntity, 1.0, 0.5)
    MeshCollider.setCylinder(meshEntity, 1.0, 0.5)
    post.displayText('cylynder (1, .5)')
    post.displayImage('src/test/mesh/cylinder-1-.5.png')
  })

  meshTimer.add((index) => {
    MeshRenderer.setCylinder(meshEntity, 1.0, 0.0)
    MeshCollider.setCylinder(meshEntity, 1.0, 0.0)
    post.displayText('cylynder (1, .0)')
    post.displayImage('src/test/mesh/cylinder-1-0.png')
  })
}
