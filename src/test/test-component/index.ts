import { AudioSource, AudioStream, ColliderLayer, GltfContainer, InputAction, Material, MeshCollider, MeshRenderer, PBAudioSource, PBAudioStream, PBGltfContainer, PBPointerEvents, PointerEvents, Transform, engine, pointerEventsSystem } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'

export function testComponent() {
  const Entity = engine.addEntity()
  const EntityTwo = engine.addEntity()
  const PopcornMachine = engine.addEntity()
  const PopcornMachineCollider = engine.addEntity()
  let Playing: boolean = false
  //Set position
  Transform.create(Entity, { position: Vector3.create(8, 1, 8), rotation: Quaternion.fromEulerDegrees(0, 45, 0), scale: Vector3.create(1, 2, 1) })

  //Set boxShape to render
  MeshRenderer.setBox(Entity)

  //Set boxShape to collider
  MeshCollider.setBox(Entity)

  //Set Material to body
  Material.setPbrMaterial(Entity, { albedoColor: Color4.Blue(), emissiveColor: Color4.Blue(), emissiveIntensity: 5 })

  //Set audio to scene (Ambient)
  AudioStream.create(EntityTwo,
    {
      playing: false,
      volume: .04,
      url: 'audio/happy-day-background-vlog-music.mp3'
    }
  )


  //Create a popcorn machine with a gltf model and popcorn sound

  GltfContainer.create(PopcornMachine,
    {
      src: 'models/popcorn_machine.gltf',
      invisibleMeshesCollisionMask: ColliderLayer.CL_NONE,
      visibleMeshesCollisionMask:
        ColliderLayer.CL_POINTER | ColliderLayer.CL_PHYSICS,
    })
  MeshCollider.setBox(PopcornMachineCollider)
  Transform.create(PopcornMachineCollider, { parent: PopcornMachine, scale: Vector3.create(1, 2, 1), position: Vector3.create(0, 1, 0) })
  Transform.create(PopcornMachine, { position: Vector3.create(10, 0, 10), scale: Vector3.create(1.5, 1.5, 1.5) })
  AudioSource.create(PopcornMachine, {
    loop: true,
    playing: Playing,
    volume: 1,
    audioClipUrl: 'audio/popcorn.mp3'
  })


  let Text: string = Playing ? "Stop" : "Start"

  PointerEvents.create(PopcornMachine)
  pointerEventsSystem.onPointerDown(
    {
      entity: PopcornMachineCollider,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: Text
      }
    },
    function () {
      console.log("Clicked", Playing, Text)
      Playing = !Playing
    }
  )


}