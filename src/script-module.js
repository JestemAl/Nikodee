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
// const gui = new dat.GUI({
//     width: 400
// })

// Canvas
const canvasModule = document.getElementById('webgl-module')
const canvasPanel = document.getElementById('webgl-panel')


// Scene
const scenePanel = new THREE.Scene()
const sceneModule = new THREE.Scene()

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

const panelTexture = textureLoader.load('models/panel/view-from-camera/panelBaked.jpg')
// panelTexture.colorSpace = THREE.SRGBColorSpace

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

        scenePanel.add(panelModel)

        // gui.add(panelModel.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation y panel')
        // gui.add(panelModel.rotation, 'x').min(- Math.PI).max(Math.PI).step(0.001).name('rotation x panel')
        // gui.add(panelModel.rotation, 'z').min(- Math.PI).max(Math.PI).step(0.001).name('rotation z panel')
    }
)

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

        sceneModule.add(moduleModel)

        // gui.add(moduleModel.rotation, 'x').min(- Math.PI).max(Math.PI).step(0.001).name('rotation x model')
        // gui.add(moduleModel.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation y model')
        // gui.add(moduleModel.rotation, 'z').min(- Math.PI).max(Math.PI).step(0.001).name('rotation z model')
    }
)
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
    panelModel.scale.set(0.14 * (sizes.width / sizes.height), 0.14 * (sizes.width / sizes.height), 0.14 * (sizes.width / sizes.height))

    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update cameras
    cameraPanel.aspect = sizes.width / sizes.height
    cameraPanel.updateProjectionMatrix()

    cameraModule.aspect = sizes.width / sizes.height
    cameraModule.updateProjectionMatrix()

    // Update renderers
    rendererPanel.setSize(sizes.width, sizes.height)
    rendererPanel.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    rendererModule.setSize(sizes.width, sizes.height)
    rendererModule.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Camera
 */
// Group
// const cameraGroup = new THREE.Group()
// scene.add(cameraGroup)

// Base camera
const cameraPanel = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
cameraPanel.position.z = 6
// cameraGroup.add(cameraPanel)

const cameraModule = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
cameraModule.position.z = 6
// cameraGroup.add(cameraModule)


// controls
const controlsPanel = new OrbitControls(cameraPanel, canvasPanel)
controlsPanel.target.set(0, 0, 0)
controlsPanel.enableDamping = true
controlsPanel.enableZoom = false

const controlsModule = new OrbitControls(cameraModule, canvasModule)
controlsModule.target.set(0, 0, 0)
controlsModule.enableDamping = true
controlsModule.enableZoom = false

/**
 * Renderer
 */
const rendererPanel = new THREE.WebGLRenderer({
    canvas: canvasPanel,
    alpha: true,
    antialias: true
})
rendererPanel.useLegacyLights = false
rendererPanel.setSize(sizes.width, sizes.height)
rendererPanel.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// rendererPanel.outputColorSpace = THREE.SRGBColorSpace;
rendererPanel.outputColorSpace = THREE.LinearSRGBColorSpace

const rendererModule = new THREE.WebGLRenderer({
    canvas: canvasModule,
    alpha: true,
    antialias: true
})
rendererModule.useLegacyLights = false
rendererModule.setSize(sizes.width, sizes.height)
rendererModule.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// rendererModule.outputColorSpace = THREE.SRGBColorSpace;
rendererModule.outputColorSpace = THREE.LinearSRGBColorSpace


// gui.add(rendererPanel, 'toneMapping', {
//     No: THREE.NoToneMapping,
//     Linear: THREE.LinearToneMapping,
//     Rainhard: THREE.ReinhardToneMapping,
//     Cineon: THREE.CineonToneMapping,
//     ACESFilmic: THREE.ACESFilmicToneMapping
// })
// gui.add(rendererPanel, 'toneMappingExposure').min(0).max(10).step(0.001)


/**
 * Intersection observer API
 */
const models = ['webgl-panel', 'webgl-module']

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5, 
};

const handleIntersection  = (model, entry) => 
{
    if (entry.isIntersecting) {
        if(model == "webgl-panel")
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
        else if(model == "webgl-module")
        {
            gsap.to(
                moduleModel.rotation,
                {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    y: Math.PI * 2,
                }
            )
        }
      }
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      for (const model of models) {
        if (entry.target.id === model) {
          handleIntersection(model, entry);
          break;
        }
      }
    });
  }, options);

models.forEach((modelId) => 
{
const model = document.getElementById(modelId);
observer.observe(model);
});



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
// const clock = new THREE.Clock()
// let previousTime = 0

const tick = () =>
{
    // const elapsedTime = clock.getElapsedTime()
    // const deltaTime = elapsedTime - previousTime
    // previousTime = elapsedTime

    // const parallaxX = cursor.x * 0.05
    // const parallaxY = - cursor.y * 0.05
    // cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    // cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime
    
    // Update controlls
    controlsPanel.update()
    controlsModule.update()

    // Render
    rendererPanel.render(scenePanel, cameraPanel)
    rendererModule.render(sceneModule, cameraModule)


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()