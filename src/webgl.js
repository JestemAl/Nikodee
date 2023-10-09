import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// import Stats from 'stats.js'

/**
 * Monitoring
 */
// const stats = new Stats()
// stats.showPanel(0)
// document.body.appendChild(stats.dom)

/**
 * params
 */
const isMobile = window.innerWidth <= 768; 

let canvasHeight;

if (innerHeight > innerWidth || isMobile) {
    canvasHeight = window.innerHeight / 2;
    console.log('resize');
} else {
    canvasHeight = window.innerHeight;
    console.log('resize');
}
console.log(innerWidth);
console.log(innerHeight);

const sizes = {
    width: window.innerWidth,
    height: canvasHeight
};

/**
 * Base
*/
THREE.ColorManagement.enabled = false

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
    }
)
/**
 * resize
 */
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
// Base camera
const cameraPanel = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
console.log('camera');
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
controlsPanel.enablePan = false

const controlsModule = new OrbitControls(cameraModule, canvasModule)
controlsModule.target.set(0, 0, 0)
controlsModule.enableDamping = true
controlsModule.enableZoom = false
controlsModule.enablePan = false

/**
 * Renderer
 */
const rendererPanel = new THREE.WebGLRenderer({
    canvas: canvasPanel,
    alpha: true,
    antialias: true,
    setPixelRatio: Math.min(window.devicePixelRatio, 2),
    outputColorSpace: THREE.LinearSRGBColorSpace
})
const rendererModule = new THREE.WebGLRenderer({
    canvas: canvasModule,
    alpha: true,
    antialias: true,
    setPixelRatio: Math.min(window.devicePixelRatio, 2),
    outputColorSpace: THREE.LinearSRGBColorSpace
})

rendererModule.setSize(sizes.width, sizes.height)
if (innerHeight > innerWidth || isMobile) 
{
    rendererPanel.setSize(sizes.width, sizes.height / 2)
    rendererModule.setSize(sizes.width, sizes.height)
} else {
    rendererPanel.setSize(sizes.width, sizes.height)
    rendererPanel.setSize(sizes.width, sizes.height)
}





/**
 * Intersection observer API
 */
const models = ['webgl-panel', 'webgl-module']

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5, 
}

const handleIntersection  = (model, entry) => 
{
    const targetModel = model == "webgl-panel" ? panelModel : moduleModel;
    if (entry.isIntersecting) 
    {
        gsap.to(targetModel.rotation, {
            duration: 1.5,
            ease: 'power2.inOut',
            z: model == "webgl-panel" ? Math.PI * 2 : 0,
            y: model == "webgl-module" ? Math.PI * 2 : 0,
            onComplete: () => {
                entry.target.isAnimated = false;
            }
        })
        entry.target.isAnimated = true
      }
      else {
        gsap.killTweensOf(targetModel.rotation);
        entry.target.isAnimated = false; 
      }
}

const observer = new IntersectionObserver((entries) => 
{
    entries.forEach((entry) => {
      const model = entry.target.id;
      handleIntersection(model, entry);
    })
  }, options);

  models.forEach((modelId) => 
  {
    const model = document.getElementById(modelId);
    observer.observe(model);
    model.isAnimated = false;
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
// const clock = new THREE.Clock()
// let previousTime = 0

const tick = () =>
{
    // stats.begin()

    // Update controlls
    controlsPanel.update()
    controlsModule.update()

    // Render
    rendererPanel.render(scenePanel, cameraPanel)
    rendererModule.render(sceneModule, cameraModule)


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    // stats.end()
}

tick()