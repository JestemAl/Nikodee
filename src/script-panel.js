import * as THREE from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * Base
 */
THREE.ColorManagement.enabled = false

// Debug
const gui = new dat.GUI({
    width: 400
})

// Canvas
const canvas = document.querySelector('canvas.webgl-panel')

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
const panelTexture = textureLoader.load('models/panel/view-from-camera/panelBaked.jpg')
panelTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Materials
 */
// Baked material
const panelMaterial = new THREE.MeshBasicMaterial({ map: panelTexture })
panelTexture.flipY = false

/**
 * Models
 */
// Panel
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

        panelModel.scale.set(0.13 * (sizes.width / sizes.height), 0.13 * (sizes.width / sizes.height), 0.13 * (sizes.width / sizes.height))
        panelModel.position.y = -0.5
        panelModel.rotation.set(1.266, 0.078, -0.414)

        scene.add(panelModel)

        // gui.add(panelModel.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation y panel')
        // gui.add(panelModel.rotation, 'x').min(- Math.PI).max(Math.PI).step(0.001).name('rotation x panel')
        // gui.add(panelModel.rotation, 'z').min(- Math.PI).max(Math.PI).step(0.001).name('rotation z panel')
    }
)

/**
 * Lights
 */
// const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
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
    panelModel.scale.set(0.14 * (sizes.width / sizes.height), 0.14 * (sizes.width / sizes.height), 0.14 * (sizes.width / sizes.height))

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
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace


/**
 * Scroll
 */
let scrollY = window.scrollY
let currentSection = 0


window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY
    const scrollPosition = scrollY / sizes.height
    const newSection = Math.round(scrollY / window.innerHeight)
    const panelSection = 7


    if(panelModel)
    {
        console.log(panelModel.position.y);
        if(newSection != currentSection)
        {
            currentSection = newSection

            if(currentSection == panelSection)
            {
                gsap.to(
                    panelModel.rotation,
                    {
                        duration: 1.5,
                        ease: 'power2.inOut',
                        z: Math.PI * 2,
                    }
                )
            }  
        }
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

    const parallaxX = cursor.x * 0.05
    const parallaxY = - cursor.y * 0.05
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime
    
    // Controls
    controls.update()
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

