import { Material, MaterialTransparencyMode, MeshCollider, MeshRenderer, TextShape, Transform, engine } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { circularSlider } from '../../helper/circular-slider'
import { createPost } from '../../helper/window-post'

export function testMaterialB(position: Vector3) {
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

  const entity = engine.addEntity()
  Transform.create(entity, { position })
  MeshRenderer.setBox(entity)
  MeshCollider.setBox(entity)

  cubeWithMaterialTimer.add((index) => {
    Material.setPbrMaterial(entity, {
      albedoColor: Color4.create(0, 1, 0, 1)
    })
    post.displayText(`[${index}] Albedo=(0,1,0,1)`)
    post.displayImage(`src/test/material-b/${index}.png`)
  })

  cubeWithMaterialTimer.add((index) => {
    Material.setPbrMaterial(entity, {
      texture: { tex: { $case: 'texture', texture: { src: 'images/uv-checker.png' } } }
    })
    post.displayText(`[${index}] texture=uv-checker.png`)
    post.displayImage(`src/test/material-b/${index}.png`)
  })

  cubeWithMaterialTimer.add((index) => {
    Material.setPbrMaterial(entity, {
      alphaTexture: { tex: { $case: 'texture', texture: { src: 'images/transparency-texture.png' } } },
      texture: { tex: { $case: 'texture', texture: { src: 'images/uv-checker.png' } } },
      transparencyMode: MaterialTransparencyMode.MTM_AUTO,
    })
    post.displayText(`[${index}] texture=uv-checker.png alphaTexture=transparency-texture.png transparencyMode=auto`)
    post.displayImage(`src/test/material-b/${index}.png`)
  })

  cubeWithMaterialTimer.add((index) => {
    Material.setPbrMaterial(entity, {
      alphaTexture: { tex: { $case: 'texture', texture: { src: 'images/transparency-texture.png' } } },
      texture: { tex: { $case: 'texture', texture: { src: 'images/uv-checker.png' } } },
      transparencyMode: MaterialTransparencyMode.MTM_ALPHA_TEST_AND_ALPHA_BLEND,
      castShadows: false,
    })
    post.displayText(`[${index}] texture=uv-checker.png alphaTexture=transparency-texture.png transparencyMode=blend castShadows=false`)
    post.displayImage(`src/test/material-b/${index}.png`)
  })

  cubeWithMaterialTimer.add((index) => {
    Material.setPbrMaterial(entity, {
      alphaTexture: { tex: { $case: 'texture', texture: { src: 'images/transparency-texture.png' } } },
      transparencyMode: MaterialTransparencyMode.MTM_AUTO,
      emissiveTexture: { tex: { $case: 'texture', texture: { src: 'images/emissive-texture.png' } } },
      emissiveColor: Color4.Yellow(),
      emissiveIntensity: 150
    })
    post.displayText(`[${index}] emissiveTexture=emissive-texture.png emissiveColor=Yellow emissiveIntensity=150`)
    post.displayImage(`src/test/material-b/${index}.png`)
  })

  cubeWithMaterialTimer.add((index) => {
    Material.setPbrMaterial(entity, {
      texture: { tex: { $case: 'texture', texture: { src: 'images/rock-wall-texture.png' } } },
    })
    post.displayText(`[${index}] texture=rock-wall-texture.png`)
    post.displayImage(`src/test/material-b/${index}.png`)
  })

  cubeWithMaterialTimer.add((index) => {
    Material.setPbrMaterial(entity, {
      texture: { tex: { $case: 'texture', texture: { src: 'images/rock-wall-texture.png' } } },
      bumpTexture: { tex: { $case: 'texture', texture: { src: 'images/rock-wall-bump.png' } } },
    })
    post.displayText(`[${index}] texture=rock-wall-texture.png bumpTexture=rock-wall-bump`)
    post.displayImage(`src/test/material-b/${index}.png`)
  })

  cubeWithMaterialTimer.add((index) => {
    Material.setPbrMaterial(entity, {
      texture: { tex: { $case: 'texture', texture: { src: 'images/rock-wall-texture.png' } } },
      bumpTexture: { tex: { $case: 'texture', texture: { src: 'images/rock-wall-bump.png' } } },
      metallic: 0,
      roughness: 0.75,
    })
    post.displayText(`[${index}] texture=rock-wall-texture.png bumpTexture=rock-wall-bump roughness=0.75 metallic=0`)
    post.displayImage(`src/test/material-b/${index}.png`)
  })

}

//specularIntensity, directIntensity, reflectiveColor