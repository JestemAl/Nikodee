import * as THREE from 'three'
// import * as dat from 'lil-gui'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * params
 */
const objectsDistance = 4
const panelSection = 6
const moduleSection = 8

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

const panelTexture = textureLoader.load('models/panel/view-above-surface/panelBaked.jpg')
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
        models.push(panelModel)

        panelModel.traverse((child) => 
        {
            child.material = panelMaterial
        })
        panelModel.scale.set(0.25, 0.25, 0.25)
        panelModel.position.y = - objectsDistance * panelSection
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
        moduleModel.scale.set(0.5, 0.5, 0.5)
        moduleModel.position.y = -objectsDistance * moduleSection
        scene.add(moduleModel)
    }
)

console.log(models);


/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)

/**
 * Particles
 */
// Geometry
// const particlesCount = 200
// const positions = new Float32Array(particlesCount * 3)

// for(let i = 0; i < particlesCount; i++)
// {
//     positions[i * 3 + 0] = (Math.random() - 0.5) * 10
//     positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * sectionMeshes.length
//     positions[i * 3 + 2] = (Math.random() - 0.5) * 10
// }

// const particlesGeometry = new THREE.BufferGeometry()
// particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// Material
// const particlesMaterial = new THREE.PointsMaterial({
//     color: parameters.materialColor,
//     sizeAttenuation: textureLoader,
//     size: 0.03
// })

// Points
// const particles = new THREE.Points(particlesGeometry, particlesMaterial)
// scene.add(particles)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
    const newSection = Math.round(scrollY / sizes.height)
    console.log(newSection);
    // console.log(scrollY / sizes.height);

    if(models)
    {
        currentSection = newSection

    if(currentSection ==  moduleSection)
    {
        gsap.to(
            moduleModel.rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: '+=1',
                y: '+=3',
                z: '+=0'
            }
        )
    }
    if(currentSection ==  panelSection)
    {
        gsap.to(
            panelModel.rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: '+=1',
                y: '+=3',
                z: '+=0'
            }
        )
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

    // Animate camera
    camera.position.y = - scrollY / sizes.height * objectsDistance

    const parallaxX = cursor.x * 0.2
    const parallaxY = - cursor.y * 0.2
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

    // Animate meshes
    // if(models)
    // {
    //     for(const model of models)
    //     {
    //             model.rotation.x += deltaTime * 0.1
    //             model.rotation.y += deltaTime * 0.12
    //     }
    // }


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()