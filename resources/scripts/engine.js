/**
 * The camera object.
 *
 * @constructor
 */
const Camera = function () {
    let root = this;

    this.data = {
        fov: 8,
        planes: {
            near: 10,	//defaults to 0.1
            far: 500
        },
        position: new Vector([0.0, 0.0, -3, 1.0]),
        rotation: new Vector([0.1, 0.0, 0.0]),
        constants: {
            pScalar: 0.5 * Math.PI / 180,
            pMatrix: new Matrix(4, 4),
            rxMatrix: new Matrix(3, 3),
            ryMatrix: new Matrix(3, 3),
            rzMatrix: new Matrix(3, 3),
        }
    };


    /**
     * Returns the field of view for cameras.
     *
     * @returns {number}
     */
    this.getFOV = () => {
        return this.data.fov;
    };


    /**
     * Returns the assigned near plane value.
     *
     * @returns {number}
     */
    this.getNear = () => {
        return this.data.planes.near;
    };


    /**
     * Assigns the near plane value.
     *
     * @param near
     * @return Camera
     */
    this.setNear = (near) => {
        this.data.planes.near = near;

        return this;
    };


    /**
     * Returns the far plane value.
     *
     * @returns {number}
     */
    this.getFar = () => {
        return this.data.planes.far;
    };


    /**
     * Assigns the far plane value.
     *
     * @param far
     * @return Camera
     */
    this.setFar = (far) => {
        this.data.planes.far = far;

        return this;
    };


    /**
     * Returns the projection matrix for the camera.
     *
     * @returns {Matrix}
     */
    this.getProjectionMatrix = () => {
        let Scale = 1 / Math.tan(root.getFOV() * root.data.constants.pScalar);

        root.data.constants.pMatrix.setRow(0, [Scale, 0, 0, 0]);
        root.data.constants.pMatrix.setRow(1, [0, Scale, 0, 0]);
        root.data.constants.pMatrix.setRow(2, [0, 0, -root.getFar() / (root.getFar() - root.getNear()), -1]);
        root.data.constants.pMatrix.setRow(3, [0, 0, -root.getFar() * root.getNear() / (root.getFar() - root.getNear()), 0]);

        return root.data.constants.pMatrix;
    };


    /**
     * Configures the X rotation.
     *
     * @param x
     * @return Camera
     */
    this.setXRotation = (x) => {
        this.data.rotation.data.values[0] = x;

        return this;
    };


    /**
     * Configures the Y rotation.
     *
     * @param y
     * @return Camera
     */
    this.setYRotation = (y) => {
        this.data.rotation.data.values[1] = y;

        return this;
    };


    /**
     * Configures the Z rotation.
     *
     * @param z
     * @return Camera
     */
    this.setZRotation = (z) => {
        this.data.rotation.data.values[2] = z;

        return this;
    };


    /**
     * Returns the assigned X rotation value.
     *
     * @returns {*}
     */
    this.getXRotation = () => {
        return this.data.rotation.data.values[0];
    };


    /**
     * Returns the assigned Y rotation value.
     *
     * @returns {*}
     */
    this.getYRotation = () => {
        return this.data.rotation.data.values[1];
    };


    /**
     * Returns the assigned Z rotation value.
     *
     * @returns {*}
     */
    this.getZRotation = () => {
        return this.data.rotation.data.values[2];
    };


    /**
     * Returns the X position of the camera.
     *
     * @returns {*}
     */
    this.getXPosition = () => {
        return this.data.position.data.values[0];
    };


    /**
     * Assigns the X position of the camera.
     *
     * @param x
     * @return Camera
     */
    this.setXPosition = (x) => {
        this.data.position.data.values[0] = x;

        return this;
    };


    /**
     * Returns the Y position of the camera.
     *
     * @returns {*}
     */
    this.getYPosition = () => {
        return this.data.position.data.values[1];
    };


    /**
     * Assigns the Y position of the camera.
     *
     * @param y
     * @return Camera
     */
    this.setYPosition = (y) => {
        this.data.position.data.values[1] = y;

        return this;
    };


    /**
     * Returns the Z position.
     *
     * @returns {*}
     */
    this.getZPosition = () => {
        return this.data.position.data.values[2];
    };


    /**
     * Used to assign the Z position.
     *
     * @param z
     * @return Camera
     */
    this.setZPosition = (z) => {
        this.data.position.data.values[2] = z;

        return this;
    };


    /**
     * Returns the X rotational matrix, used for mathematics.
     *
     * @returns {Matrix}
     */
    this.getXRotationMatrix = () => {
        this.data.constants.rxMatrix.setRow(0, [1, 0, 0]);
        this.data.constants.rxMatrix.setRow(1, [0, Math.cos(this.getXRotation()), -Math.sin(this.getXRotation())]);
        this.data.constants.rxMatrix.setRow(2, [0, Math.sin(this.getXRotation()), Math.cos(this.getXRotation())]);

        return this.data.constants.rxMatrix;
    };


    /**
     * Returns the Y rotational matrix, used for mathematics.
     *
     * @returns {Matrix}
     */
    this.getYRotationMatrix = () => {
        this.data.constants.ryMatrix.setRow(0, [Math.cos(this.getYRotation()), 0, Math.sin(this.getYRotation())]);
        this.data.constants.ryMatrix.setRow(1, [0, 1, 0]);
        this.data.constants.ryMatrix.setRow(2, [-Math.sin(this.getYRotation()), 0, Math.cos(this.getYRotation())]);

        return this.data.constants.ryMatrix;
    };


    /**
     * Returns the Z rotational matrix, used for mathematics.
     *
     * @returns {Matrix}
     */
    this.getZRotationMatrix = () => {
        this.data.constants.rzMatrix.setRow(0, [Math.cos(this.getZRotation()), -Math.sin(this.getZRotation()), 0]);
        this.data.constants.rzMatrix.setRow(1, [Math.sin(this.getZRotation()), Math.cos(this.getZRotation()), 0]);
        this.data.constants.rzMatrix.setRow(2, [0, 0, 1]);

        return this.data.constants.rzMatrix;
    };


    /**
     * Used to assign the field of view.
     *
     * @param fov
     * @return Camera
     */
    this.setFOV = (fov) => {
        this.data.fov = fov;

        return this;
    };


    /**
     * Initialize values for the camera.
     *
     * @return Camera
     */
    this.init = () => {
        this.data.position.init();
        this.data.rotation.init();
        this.data.constants.pMatrix.init();
        this.data.constants.rxMatrix.init();
        this.data.constants.ryMatrix.init();
        this.data.constants.rzMatrix.init();

        return this;
    };
};


/**
 *  The 3D Renderer.
 *
 *  @constructor
 */
const Renderer = function () {
    let root = this;

    /**
     * Various flags used to manipulate the render procedure.
     */
    this.flags = {
        useZBuffer: false,
        showZDepth: false,
        showVertices: false,
        showLines: false,
        showTextures: true
    };


    /**
     * Handles various system states.
     */
    this.states = {
        isOnscreen: true
    };


    /**
     * Various properties for rendering.
     */
    this.properties = {
        tPrecision: 0.7,
        tDownscale: 2,
        zBits: 32,
        Boundary: 64            // The maximum off-screen boundary threshold in all directions.
    };


    /**
     *  Generic storage used by the renderer.
     */
    this.data = {
        camera: null,
        entities: [],
        canvas: {
            element: document.getElementById('render'),
            context: null,
            width: 640,
            height: 480
        }
    };


    /**
     *  Configures the active camera.
     *
     *  @param {Camera} camera
     *  @return Renderer
     */
    this.setCamera = (camera) => {
        this.data.camera = camera;

        return this;
    };


    /**
     *  Returns the camera used by the renderer.
     *
     *  @returns Camera
     */
    this.getCamera = () => {
        return this.data.camera;
    };


    /**
     *  Stores an entity to the queue to be rendered.
     *
     *  @param entity
     *  @return Renderer
     */
    this.addEntity = (entity) => {
        this.data.entities.push(entity);

        return this;
    };


    /**
     *  Returns the context of the rendering target.
     *
     *  @returns context
     */
    this.getContext = () => {
        return this.data.canvas.context;
    };


    /**
     *  The primary render procedure.
     */
    this.Render = () => {
        // Clear the previous frame.
        this.clear();

        // Configure the various transformational matrices.
        let Projection = this.data.camera.getProjectionMatrix();
        let XRotation = this.data.camera.getXRotationMatrix();
        let YRotation = this.data.camera.getYRotationMatrix();
        let ZRotation = this.data.camera.getZRotationMatrix();

        // The matrix used to properly position objects within the world.
        let World = new Matrix(4, 4);
        World.init();
        World.setRow(0, [1, 0, 0, this.data.camera.getXPosition()]);
        World.setRow(1, [0, 1, 0, this.data.camera.getYPosition()]);
        World.setRow(2, [0, 0, -1, this.data.camera.getZPosition()]);
        World.setRow(3, [0, -10, -20, 1]);

        // Generate the buffers used to build the scene.
        let Frame = document.createElement('canvas');
        Frame.width = this.data.canvas.width / this.properties.tDownscale;
        Frame.height = this.data.canvas.height / this.properties.tDownscale;
        let fContext = Frame.getContext('2d');
        let fBuffer = fContext.createImageData(Frame.width, Frame.height);
        let zBuffer = new Float32Array(fBuffer.data.length);

        // Used for calculating the zBuffer value.
        let zX = this.getCamera().getFar() / (this.getCamera().getFar() - this.getCamera().getNear());
        let zY = this.getCamera().getFar() * this.getCamera().getNear() / (this.getCamera().getNear() - this.getCamera().getFar());
        let zB = root.properties.zBits;
        let zV;

        // Used for calculating vertex transformations.
        let V, wV, pV;

        // The 2D points, after transformation (and the approximate Z depth).
        let X, Y, Z;

        // Used for interpolation calculations.
        let p = root.properties.tPrecision;
        let ox, oy, oz;
        let dx, dy, dz;
        let sx, sy, sz;
        let x1, y1, z1;
        let x2, y2, z2;
        let dist, base, scl;
        let l = [];

        // Used to map texel data (texture X and Y values).
        let tU, tV, tW, n;

        // The index used for plotting points, as well as comparing zBuffer values (zV).
        let i, pI, pL;

        // Variables used for loops.
        let a, b, c, d, e, f, g;

        for (a = 0; a < this.data.entities.length; a++) {
            // Refresh the projection buffer.
            this.data.entities[a].data.projected = [];
            this.states.isOnscreen = true;

            for (b = 0; b < this.data.entities[a].data.points.length; b++) {
                // The current vertex.
                V = root.data.entities[a].data.points[b];

                // Perform rotational transformations.
                V = XRotation.Math.Multiply(V);
                V = YRotation.Math.Multiply(V);
                V = ZRotation.Math.Multiply(V);

                // Project the point onto the scene.
                wV = World.Math.Multiply(V);
                pV = Projection.Math.Multiply(wV);

                // Calculate the rasterized point.
                X = (pV.data.values[0] + 1) * 0.5 * Frame.width;
                Y = (1 - (pV.data.values[1] + 1) * 0.5) * Frame.height;

                if (X < (fBuffer.width + this.properties.Boundary) && X > -this.properties.Boundary && Y < (fBuffer.height + this.properties.Boundary) && Y > -this.properties.Boundary) {
                    // Point lays within the bounding box...
                    if (this.flags.showVertices) {
                        i = ((~~X + (~~Y * fBuffer.width)) * 4);

                        if (this.flags.useZBuffer) {
                            // Perform zBuffer calculation.
                            zV = (1 << zB) * (zX + zY / V.data.values[2]);

                            if (zV > zBuffer[i]) zBuffer[i] = zV; else i = -1;
                        }

                        // Plot the rasterized point.
                        if (fBuffer.data[i] !== null) {
                            fBuffer.data[i] = 255;
                            fBuffer.data[++i] = 0;
                            fBuffer.data[++i] = 0;
                            fBuffer.data[++i] = 255;
                        }
                    }

                    // Store projection data.
                    this.data.entities[a].data.projected.push(
                        new Vector([X, Y, pV.data.values[2]])
                    );
                }
                else
                    this.states.isOnscreen = false;
            }

            if (this.states.isOnscreen === true) {
                if (this.flags.showTextures !== false || this.flags.showLines !== false) {
                    pL = this.data.entities[a].data.projected.length;
                    l = [];

                    for (c = 0; c < pL; c++) {
                        // Handle point wrapping.
                        pI = c;
                        if (--pI < 0) pI = pL - 1;

                        // Linear calculations.
                        ox = this.data.entities[a].data.projected[pI % pL].data.values[0];
                        oy = this.data.entities[a].data.projected[pI % pL].data.values[1];
                        oz = this.data.entities[a].data.projected[pI % pL].data.values[2];
                        dx = this.data.entities[a].data.projected[c].data.values[0] - ox;
                        dy = this.data.entities[a].data.projected[c].data.values[1] - oy;
                        dz = this.data.entities[a].data.projected[c].data.values[2] - oz;
                        base = ((dx) * (dx)) + ((dy) * (dy));
                        dist = base * FastInvSqrt(base);
                        sx = dx / dist;
                        sy = dy / dist;
                        sz = dz / dist;

                        // Record the line results for future calculations.
                        l.push({dx: dx, dy: dy, dz: dz, sx: sx, sy: sy, sz: sz, ox: ox, oy: oy, oz: oz, dist: dist});
                    }

                    if (this.flags.showTextures !== false) {
                        let Image = {
                            width: 255,
                            height: 255
                        };

                        // Calculate scale difference between origin and opposing edges.
                        scl = l[2].dist / l[0].dist;

                        for (d = 0; d < l[0].dist; d += p) {
                            x1 = l[0].ox + (l[0].sx * d);
                            y1 = l[0].oy + (l[0].sy * d);
                            z1 = l[0].oz + (l[0].sz * d);
                            x2 = l[3].ox + (-l[2].sx * (d * scl));
                            y2 = l[3].oy + (-l[2].sy * (d * scl));
                            z2 = l[3].oz + (-l[2].sz * (d * scl));
                            dx = x2 - x1;
                            dy = y2 - y1;
                            dz = z2 - z1;

                            /**
                             *  Optimization: let dist = Math.sqrt(((dx)*(dx))+((dy)*(dy)));
                             *
                             *  Alternative A: let dist = adjacent * (d * (Lines[0].dist/d));
                             *  Alternative B: let base = ((dx)*(dx))+((dy)*(dy)); let dist = base * FastInvSqrt(base);
                             */
                            base = ((dx) * (dx)) + ((dy) * (dy));
                            dist = base * FastInvSqrt(base);
                            sx = dx / dist;
                            sy = dy / dist;
                            sz = dz / dist;

                            // Calculate the rounded texel U value (the X value of the texture).
                            n = Image.width * (d / l[0].dist);
                            tU = (n << 0), tU = tU === tU ? tU : tU + 1;

                            for (e = 0; e < dist; e += p) {
                                // Calculate the rounded texel V value (the Y value of the texture).
                                n = Image.height * (e / dist);
                                tV = (n << 0), tV = tV === n ? tV : tV + 1;
                                X = x2 - (sx * e);
                                Y = y2 - (sy * e);

                                i = (~~X + (~~Y * fBuffer.width)) * 4;

                                // Calculate approximate depth and plot.
                                Z = z2 + (sz * e);

                                if (this.flags.useZBuffer === true) {
                                    zV = (1 << zB) * (zX + zY / Z);

                                    if (zV < zBuffer[i]) zBuffer[i] = zV; else i = -1;
                                }

                                if (fBuffer.data[i] !== null) {
                                    tW = (this.flags.showZDepth !== false ? 255 / Z : 0);

                                    fBuffer.data[i] = Clamp(root.data.entities[a].data.texture.pixels[tU][tV][0][0] + tW, 255);
                                    fBuffer.data[++i] = Clamp(root.data.entities[a].data.texture.pixels[tU][tV][0][1] + tW, 255);
                                    fBuffer.data[++i] = Clamp(root.data.entities[a].data.texture.pixels[tU][tV][0][2] + tW, 255);
                                    fBuffer.data[++i] = 255;
                                }
                            }
                        }
                    }

                    if (this.flags.showLines !== false) {
                        for (f = 0; f < l.length; f++) {
                            for (g = 0; g < l[f].dist; g++) {
                                i = ((~~(l[f].ox + (l[f].sx * g)) + (~~(l[f].oy + (l[f].sy * g)) * fBuffer.width)) * 4);

                                fBuffer.data[i] = 50;
                                fBuffer.data[++i] = 50;
                                fBuffer.data[++i] = 50;
                                fBuffer.data[++i] = 255;
                            }
                        }
                    }
                }
            }
        }

        // Swap the frame buffer.
        fContext.putImageData(fBuffer, 0, 0);
        this.data.canvas.context.drawImage(Frame, 0, 0, this.data.canvas.width, this.data.canvas.height);
    };


    /**
     *  Clear the rendering target.
     */
    this.clear = () => {
        this.getContext().clearRect(0, 0, this.data.canvas.width, this.data.canvas.height);
    };


    /**
     *  Configures various post-ready defaults for the renderer.
     *
     *  @return Renderer
     */
    this.init = () => {
        // Configure the drawing canvas.
        this.data.canvas.context = this.data.canvas.element.getContext('2d');
        this.getContext().clearRect(0, 0, this.data.canvas.width, this.data.canvas.height);
        this.getContext().mozImageSmoothingEnabled = false;
        this.getContext().webkitImageSmoothingEnabled = false;
        this.getContext().msImageSmoothingEnabled = false;
        this.getContext().imageSmoothingEnabled = false;

        // Initialize all stored entities.
        for (let x = 0; x < this.data.entities.length; x++) {
            this.data.entities[x].init();
        }

        return this;
    };
};


/**
 * Entity object.
 *
 * @constructor
 */
const Entity = function () {
    let root = this;

    this.data = {
        points: [],
        position: new Vector([0.0, 0.0, 0.0, 1.0]),
        texture: {
            file: '',
            pixels: [],
            width: '',
            height: ''
        },
        projected: []
    };


    /**
     * Used to register a new vector.
     *
     * @param vector
     * @return Entity
     */
    this.addPoint = (vector) => {
        this.data.points.push(vector);

        return this;
    };


    /**
     * Used to load a texture and capture pixel data.
     *
     * @param path
     * @return Entity
     */
    this.loadTexture = (path) => {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let width = 256;
        let height = 256;

        // Prepare the canvas.
        canvas.width = width;
        canvas.height = height;
        let img = new Image;

        // On image load, capture the pixel data from the texture image.
        img.onload = function () {
            ctx.drawImage(img, 0, 0, width, height);
            ctx.getImageData(2, 2, 1, 1).data;

            for (let x = 0; x < width; x++) {
                root.data.texture.pixels.push([]);

                for (let y = 0; y < height; y++) {
                    root.data.texture.pixels[x].push([]);
                    root.data.texture.pixels[x][y].push(canvas.getContext('2d').getImageData(x, y, 1, 1).data);
                }
            }
        };

        // Update the source.
        img.src = path;

        return this;
    };


    /**
     * Initialize values.
     *
     * @return Entity
     */
    this.init = () => {
        this.data.position.init();

        return this;
    };
}