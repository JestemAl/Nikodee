import * as THREE from 'three'
// import * as dat from 'lil-gui'
// import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * params
 */
const objectsDistance = 4
const panelPosition = 1
const modulePosition = -1 

/**
 * Base
 */
// Debug
// const gui = new dat.GUI({
//     width: 400
// })

// Canvas
const canvas = document.querySelector('canvas.webgl')

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
moduleTexture.colorSpace = THREE.SRGBColorSpace

const panelTexture = textureLoader.load('models/panel/view-from-camera/panelBaked.jpg')
panelTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Materials
 */
// Baked material
const panelMaterial = new THREE.MeshBasicMaterial({ map: panelTexture })
panelTexture.flipY = false

const moduleMaterial = new THREE.MeshBasicMaterial({ map: moduleTexture })
moduleTexture.flipY = false


/**
 * Models
 */
// Panel
const models = []

var panelModel 
gltfLoader.load(
    'models/panel/panel.glb',
    (gltf) =>
    {
        panelModel = gltf.scene

        panelModel.traverse((child) => 
        {
            child.material = panelMaterial
        })
        panelModel.scale.set(0.14 * (sizes.width / sizes.height), 0.14 * (sizes.width / sizes.height), 0.14 * (sizes.width / sizes.height))
        panelModel.position.y = panelPosition
        panelModel.rotation.set(1.4, 0, 0)

        scene.add(panelModel)
    }
)

// Module
var moduleModel
gltfLoader.load(
    'models/module/module.glb',
    (gltf) =>
    {
        moduleModel = gltf.scene
        models.push(moduleModel)

        moduleModel.traverse((child) => 
        {
            child.material = moduleMaterial
        })
        moduleModel.scale.set(0.3 * (sizes.width / sizes.height), 0.3 * (sizes.width / sizes.height), 0.3 * (sizes.width / sizes.height))
        moduleModel.position.y = modulePosition

        // modulePosition = moduleModel.position.y

        scene.add(moduleModel)
    }
)

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: 2000
}

window.addEventListener('resize', () =>
{
    // Update models
    panelModel.scale.set(0.14 * (sizes.width / sizes.height), 0.14 * (sizes.width / sizes.height), 0.14 * (sizes.width / sizes.height))
    moduleModel.scale.set(0.3 * (sizes.width / sizes.height), 0.3 * (sizes.width / sizes.height), 0.3 * (sizes.width / sizes.height))

    
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = 2000

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

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputColorSpace = THREE.SRGBColorSpace;

/**
 * Scroll
 */
let scrollY = window.scrollY
let currentSection = 0


window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY
    const scrollPosition = scrollY / sizes.height

    if(models)
    {
        if(scrollPosition >= 2.45 && scrollPosition <= 2.83)
        {
            moduleModel.rotation.y = (scrollPosition - 2.45) * 9
            moduleModel.position.y = - (scrollPosition * 1.4 - 2.2)
        }
        console.log(- (scrollPosition * 1.4 - 2.3));
    }
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

    const parallaxX = cursor.x * 0.2
    const parallaxY = - cursor.y * 0.2
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

    // // Update controls
    // controls.update()
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()