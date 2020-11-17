let buf = new ArrayBuffer(4),
    f32 = new Float32Array(buf),
    u32 = new Uint32Array(buf);

/**
 * Returns a fast inverse square root approximation.
 *
 * @param x
 * @returns {*}
 * @see https://en.wikipedia.org/wiki/Fast_inverse_square_root
 */
function FastInvSqrt(x) {
    let x2 = 0.5 * (f32[0] = x);
    u32[0] = (0x5f3759df - (u32[0] >> 1));
    let y = f32[0];

    return y * (1.5 - (x2 * y * y));
}


/**
 * Clamps a value underneath a maximum.
 *
 * @param value
 * @param max
 * @returns {*}
 */
function Clamp(value, max) {
    return (value > max ? max : value);
}


/**
 * Vector object.
 *
 * @param values
 * @constructor
 */
const Vector = function (values) {
    let root = this;

    this.data = {
        length: null,
        values: values
    };


    /**
     * Assigns a value at a specific index.
     *
     * @param index
     * @param value
     * @return Vector
     */
    this.setValue = function (index, value) {
        this.data.values[index] = value;

        return this;
    };


    /**
     * Returns the value at a specific index.
     *
     * @param index
     * @returns {*}
     */
    this.getValue = function (index) {
        return this.data.values[index];
    };


    /**
     * Assigns values.
     *
     * @param values
     * @return Vector
     */
    this.setValues = function (values) {
        this.data.values = values;
        this.data.length = this.data.values.length;

        return this;
    };


    /**
     * Returns the length of the vector.
     *
     * @returns {*}
     */
    this.getLength = function () {
        return this.data.values.length;
    };


    /**
     * Initializes default values.
     *
     * @return Vector
     */
    this.init = function () {
        this.data.values = this.data.values || [0, 0, 0, 1];
        this.data.length = this.data.values.length;

        return this;
    };
};


/**
 * Matrix object.
 *
 * @param rows
 * @param columns
 * @constructor
 */
let Matrix = function (rows, columns) {
    let root = this;

    this.data = {
        rows: rows,
        columns: columns,
        values: []
    };


    /**
     * Used to set an entire row.
     *
     * @param index
     * @param values
     * @return Matrix
     */
    this.setRow = function (index, values) {
        for (let x = 0; x < values.length; x++) {
            this.data.values[index][x] = values[x];
        }

        return this;
    };


    /**
     * Assigns a value at a specific location.
     *
     * @param row
     * @param column
     * @param value
     * @return Matrix
     */
    this.setValue = function (row, column, value) {
        this.data.values[row][column] = value;

        return this;
    };


    /**
     * Returns a value at a specific location.
     *
     * @param row
     * @param column
     * @returns {*}
     */
    this.getValue = function (row, column) {
        return this.data.values[row][column];
    };


    /**
     * Various mathematical procedures for matrices.
     *
     * @type {{Multiply: (function(*): Vector)}}
     */
    this.Math = {
        Multiply(vector) {
            let output = new Vector([0, 0, 0, 1]);
            output.init();

            // Multiply the current matrix against the provided vector.
            for (let y = 0; y < root.data.rows; y++) {
                for (let x = 0; x < root.data.columns; x++) {
                    output.data.values[y] += vector.data.values[x] * root.getValue(y, x);
                }
            }

            // 	Normalize values.
            if (output.getLength() > 3) {
                if (output.data.values[3] !== 1) {
                    output.data.values[0] /= output.data.values[3];
                    output.data.values[1] /= output.data.values[3];
                    output.data.values[2] /= output.data.values[3];
                }
            }

            // Return the final output.
            return output;
        }
    };


    /**
     *    Configures the multidimensional arrays used for calculations.
     *
     *    @return Matrix
     */
    this.init = function () {
        this.data.values = [];
        this.data.rows = this.data.rows || 4;
        this.data.columns = this.data.columns || 4;

        for (let y = 0; y < this.data.rows; y++) {
            let row = [];

            for (let x = 0; x < this.data.columns; x++) {
                row.push(0);
            }

            this.data.values.push(row);
        }

        return this;
    };
};