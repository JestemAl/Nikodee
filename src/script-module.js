import * as THREE from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * params
 */
const params = {}

/**
 * Base
*/
THREE.ColorManagement.enabled = false

// Debug
const gui = new dat.GUI({
    width: 400
})

// Canvas
const canvas = document.querySelector('canvas.webgl-module')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Textures
 */
const moduleTexture = textureLoader.load('models/module/moduleBaked.jpg')
// moduleTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Materials
 */
// Baked material
const moduleMaterial = new THREE.MeshBasicMaterial({ map: moduleTexture })
moduleTexture.flipY = false


/**
 * Models
 */
var moduleModel
gltfLoader.load(
    'models/module/module.glb',
    (gltf) =>
    {
        moduleModel = gltf.scene

        moduleModel.traverse((child) => 
        {
            child.material = moduleMaterial
        })
        moduleModel.scale.set(0.3 * (sizes.width / sizes.height), 0.3 * (sizes.width / sizes.height), 0.3 * (sizes.width / sizes.height))
        moduleModel.rotation.set(0.16, 0.4, 0)

        scene.add(moduleModel)

        // gui.add(moduleModel.rotation, 'x').min(- Math.PI).max(Math.PI).step(0.001).name('rotation x model')
        // gui.add(moduleModel.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation y model')
        // gui.add(moduleModel.rotation, 'z').min(- Math.PI).max(Math.PI).step(0.001).name('rotation z model')
    }
)

/**
 * Lights
 */
// const directionalLight = new THREE.DirectionalLight('#ffffff', 2)
// directionalLight.position.set(1, 1, 0)
// scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update models
    moduleModel.scale.set(0.3 * (sizes.width / sizes.height), 0.3 * (sizes.width / sizes.height), 0.3 * (sizes.width / sizes.height))

    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Camera
 */
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

// controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0, 0)
controls.enableDamping = true
controls.enableZoom = false

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.useLegacyLights = false
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace

/**
 * Scroll
 */
let scrollY = window.scrollY

window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY
    const scrollPosition = scrollY / sizes.height

    // if(moduleModel)
    // {
    //     // console.log(scrollPosition);
    //     if(scrollPosition >= 3.5 && scrollPosition <= 4.3)
    //     {
    //         moduleModel.rotation.y = (scrollPosition - 2.45) * 9
    //         // moduleModel.position.y = - (scrollPosition * 1.4 - 2.2)
    //     }
    // }
})



/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    const parallaxX = cursor.x * 0.05
    const parallaxY = - cursor.y * 0.05
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime
    
    // Update controlls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()