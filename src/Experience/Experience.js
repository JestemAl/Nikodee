import * as THREE from 'three'
import Sizes from "./Utils/sizes"
import Time from "./Utils/Time"
import Camera from './Camera.js'

export default class Experience
{
    constructor(canvas)
    {
        // Global access
        window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()

        // Sizes and resize event
        this.sizes.on('resize', () => 
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => 
        {
            this.update()
        })
    }

    resize()
    {
        // console.log('resizing');
    }

    update()
    {
        // console.log('update');
    }
}
