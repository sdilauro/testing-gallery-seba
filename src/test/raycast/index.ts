import { Material, MeshRenderer, RaycastQueryType, Transform, engine, raycastSystem } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { circularSlider } from '../../helper/circular-slider'
import { createPost } from '../../helper/window-post'

export function testRaycast(position: Vector3) {
  const post = createPost(position, { title: "Raycast", windowSize: { x: 1.5, y: 1.5 }, fontSize: 1 }).move(Vector3.create(2, 0, 0))
  const testRaycastTimer = circularSlider(1.0)

  engine.addSystem(testRaycastTimer.system)
  post.onNext(testRaycastTimer.forceNext)
  post.onPrevious(testRaycastTimer.forcePrevious)
  post.onPauseResume(testRaycastTimer.togglePause)

  const raycastEntity = engine.addEntity()
  Transform.create(raycastEntity, { position })

  testRaycastTimer.add((index) => {
    raycastSystem.registerGlobalDirectionRaycast(
      {
        entity: raycastEntity,
        opts: {
          queryType: RaycastQueryType.RQT_QUERY_ALL,
          direction: Vector3.Forward(),
          maxDistance: 10,
          continuous: false,
          collisionMask: 0xFFFFFFFF
        },
      },
      function (raycastResult) {
        console.log(JSON.stringify({ position: Transform.get(engine.PlayerEntity) }))
        console.log(JSON.stringify({ raycastResult }))
        if (raycastResult.hits.length > 0) {
          for (const hit of raycastResult.hits) {
            if (hit.entityId) {
              console.log('hit entity ', hit.entityId)
            }
          }
        }
      }
    )

    MeshRenderer.setCylinder(raycastEntity)
    Material.setPbrMaterial(raycastEntity, { albedoColor: Color4.Red() })

    post.displayText(`[${index}] maxDistance=1 Query=All`)
    post.displayImage(`images/to-do.png`)
  })

}
