import { engine, TextShape, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { test } from '@dcl/sdk/testing'
import { assertComponentValue } from '@dcl/sdk/testing/assert'

const globalOrigin = Vector3.One()
const entity = engine.addEntity()
Transform.create(entity, { position: globalOrigin })
TextShape.create(entity, { text: "Hello!" })

test('TextShape: set value "Hello!"', function* (context) {
    Transform.createOrReplace(entity, { position: globalOrigin })
    assertComponentValue(entity, TextShape, {
        text: "Hello!"
    })
})

test('TextShape: set value "Bye!"', function* (context) {
    TextShape.createOrReplace(entity, { text: "Bye!" })

    assertComponentValue(entity, TextShape, {
        text: "Bye!"
    })
    assertComponentValue(entity, TextShape, {
        text: "ASD!"
    })
})