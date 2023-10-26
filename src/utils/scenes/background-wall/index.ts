import { Material, MeshCollider, MeshRenderer, Transform, engine } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'


export function backgroundWall(position: Vector3, rotation: Quaternion) {
    const meshEntity = engine.addEntity()
    Material.setPbrMaterial(meshEntity, { albedoColor: Color4.create(0, 0, 0, 1), metallic: 0, roughness: 1 })
    Transform.create(meshEntity, { position, scale: Vector3.create(16, 16, 1), rotation })
    MeshRenderer.setPlane(meshEntity)
    MeshCollider.setPlane(meshEntity)
}