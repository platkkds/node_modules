"use strict";
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EPSILON_FLOAT32 = 1e-7;
exports.EPSILON_FLOAT16 = 1e-4;
/** Convenient class for storing tensor-related data. */
var DataStorage = /** @class */ (function () {
    function DataStorage(backend, dataMover) {
        this.backend = backend;
        this.dataMover = dataMover;
        this.data = new WeakMap();
        this.dataIdsCount = 0;
    }
    DataStorage.prototype.get = function (dataId) {
        if (!this.data.has(dataId)) {
            this.dataMover.moveData(this.backend, dataId);
        }
        return this.data.get(dataId);
    };
    DataStorage.prototype.set = function (dataId, value) {
        this.dataIdsCount++;
        this.data.set(dataId, value);
    };
    DataStorage.prototype.has = function (dataId) {
        return this.data.has(dataId);
    };
    DataStorage.prototype.delete = function (dataId) {
        this.dataIdsCount--;
        return this.data.delete(dataId);
    };
    DataStorage.prototype.numDataIds = function () {
        return this.dataIdsCount;
    };
    return DataStorage;
}());
exports.DataStorage = DataStorage;
/**
 * The interface that defines the kernels that should be implemented when
 * adding a new backend. New backends don't need to implement every one of the
 * methods, this can be done gradually (throw an error for unimplemented
 * methods).
 */
var KernelBackend = /** @class */ (function () {
    function KernelBackend() {
    }
    KernelBackend.prototype.time = function (f) {
        return notYetImplemented('time');
    };
    KernelBackend.prototype.read = function (dataId) {
        return notYetImplemented('read');
    };
    KernelBackend.prototype.readSync = function (dataId) {
        return notYetImplemented('readSync');
    };
    KernelBackend.prototype.numDataIds = function () {
        return notYetImplemented('numDataIds');
    };
    KernelBackend.prototype.disposeData = function (dataId) {
        return notYetImplemented('disposeData');
    };
    KernelBackend.prototype.write = function (values, shape, dtype) {
        return notYetImplemented('write');
    };
    KernelBackend.prototype.move = function (dataId, values, shape, dtype) {
        return notYetImplemented('move');
    };
    KernelBackend.prototype.memory = function () {
        return notYetImplemented('memory');
    };
    /** Returns the highest precision for floats in bits (e.g. 16 or 32) */
    KernelBackend.prototype.floatPrecision = function () {
        return notYetImplemented('floatPrecision');
    };
    /** Returns the smallest representable number.  */
    KernelBackend.prototype.epsilon = function () {
        return this.floatPrecision() === 32 ? exports.EPSILON_FLOAT32 : exports.EPSILON_FLOAT16;
    };
    KernelBackend.prototype.batchMatMul = function (a, b, transposeA, transposeB) {
        return notYetImplemented('batchMatMul');
    };
    KernelBackend.prototype.fusedBatchMatMul = function (_a) {
        var a = _a.a, b = _a.b, transposeA = _a.transposeA, transposeB = _a.transposeB, bias = _a.bias, activation = _a.activation, preluActivationWeights = _a.preluActivationWeights;
        return notYetImplemented('fusedBatchMatMul');
    };
    KernelBackend.prototype.slice = function (x, begin, size) {
        return notYetImplemented('slice');
    };
    KernelBackend.prototype.stridedSlice = function (x, begin, end, strides) {
        return notYetImplemented('stridedSlice');
    };
    KernelBackend.prototype.unstack = function (x, axis) {
        return notYetImplemented('unstack');
    };
    KernelBackend.prototype.reverse = function (a, axis) {
        return notYetImplemented('reverse');
    };
    KernelBackend.prototype.concat = function (tensors, axis) {
        return notYetImplemented('concat');
    };
    KernelBackend.prototype.neg = function (a) {
        return notYetImplemented('neg');
    };
    KernelBackend.prototype.add = function (a, b) {
        return notYetImplemented('add');
    };
    KernelBackend.prototype.addN = function (tensors) {
        return notYetImplemented('addN');
    };
    KernelBackend.prototype.subtract = function (a, b) {
        return notYetImplemented('subtract');
    };
    KernelBackend.prototype.multiply = function (a, b) {
        return notYetImplemented('multiply');
    };
    KernelBackend.prototype.realDivide = function (a, b) {
        return notYetImplemented('realDivide');
    };
    KernelBackend.prototype.floorDiv = function (a, b) {
        return notYetImplemented('floorDiv');
    };
    KernelBackend.prototype.sum = function (x, axes) {
        return notYetImplemented('sum');
    };
    KernelBackend.prototype.prod = function (x, axes) {
        return notYetImplemented('prod');
    };
    KernelBackend.prototype.unsortedSegmentSum = function (x, segmentIds, numSegments) {
        return notYetImplemented('unsortedSegmentSum');
    };
    KernelBackend.prototype.argMin = function (x, axis) {
        return notYetImplemented('argMin');
    };
    KernelBackend.prototype.argMax = function (x, axis) {
        return notYetImplemented('argMax');
    };
    KernelBackend.prototype.equal = function (a, b) {
        return notYetImplemented('equal');
    };
    KernelBackend.prototype.notEqual = function (a, b) {
        return notYetImplemented('notEqual');
    };
    KernelBackend.prototype.less = function (a, b) {
        return notYetImplemented('less');
    };
    KernelBackend.prototype.lessEqual = function (a, b) {
        return notYetImplemented('lessEqual');
    };
    KernelBackend.prototype.greater = function (a, b) {
        return notYetImplemented('greater');
    };
    KernelBackend.prototype.greaterEqual = function (a, b) {
        return notYetImplemented('greaterEqual');
    };
    KernelBackend.prototype.logicalNot = function (a) {
        return notYetImplemented('logicalNot');
    };
    KernelBackend.prototype.logicalAnd = function (a, b) {
        return notYetImplemented('logicalAnd');
    };
    KernelBackend.prototype.logicalOr = function (a, b) {
        return notYetImplemented('logicalOr');
    };
    KernelBackend.prototype.where = function (condition) {
        return notYetImplemented('where');
    };
    KernelBackend.prototype.select = function (condition, a, b) {
        return notYetImplemented('select');
    };
    KernelBackend.prototype.topk = function (x, k, sorted) {
        return notYetImplemented('topk');
    };
    KernelBackend.prototype.min = function (x, axes) {
        return notYetImplemented('min');
    };
    KernelBackend.prototype.minimum = function (a, b) {
        return notYetImplemented('minimum');
    };
    KernelBackend.prototype.mod = function (a, b) {
        return notYetImplemented('mod');
    };
    KernelBackend.prototype.max = function (x, axes) {
        return notYetImplemented('max');
    };
    KernelBackend.prototype.maximum = function (a, b) {
        return notYetImplemented('maximum');
    };
    KernelBackend.prototype.all = function (x, axes) {
        return notYetImplemented('all');
    };
    KernelBackend.prototype.any = function (x, axes) {
        return notYetImplemented('any');
    };
    KernelBackend.prototype.squaredDifference = function (a, b) {
        return notYetImplemented('squaredDifference');
    };
    KernelBackend.prototype.ceil = function (x) {
        return notYetImplemented('ceil');
    };
    KernelBackend.prototype.floor = function (x) {
        return notYetImplemented('floor');
    };
    KernelBackend.prototype.round = function (x) {
        return notYetImplemented('round');
    };
    KernelBackend.prototype.sign = function (x) {
        return notYetImplemented('sign');
    };
    KernelBackend.prototype.isNaN = function (x) {
        return notYetImplemented('isNaN');
    };
    KernelBackend.prototype.isInf = function (x) {
        return notYetImplemented('isInf');
    };
    KernelBackend.prototype.isFinite = function (x) {
        return notYetImplemented('isFinite');
    };
    KernelBackend.prototype.pow = function (a, b) {
        return notYetImplemented('pow');
    };
    KernelBackend.prototype.exp = function (x) {
        return notYetImplemented('exp');
    };
    KernelBackend.prototype.expm1 = function (x) {
        return notYetImplemented('expm1');
    };
    KernelBackend.prototype.softmax = function (x, dim) {
        return notYetImplemented('softmax');
    };
    KernelBackend.prototype.log = function (x) {
        return notYetImplemented('log');
    };
    KernelBackend.prototype.log1p = function (x) {
        return notYetImplemented('log1p');
    };
    KernelBackend.prototype.sqrt = function (x) {
        return notYetImplemented('sqrt');
    };
    KernelBackend.prototype.rsqrt = function (x) {
        return notYetImplemented('rsqrt');
    };
    KernelBackend.prototype.square = function (x) {
        return notYetImplemented('square');
    };
    KernelBackend.prototype.reciprocal = function (x) {
        return notYetImplemented('reciprocal');
    };
    KernelBackend.prototype.relu = function (x) {
        return notYetImplemented('relu');
    };
    KernelBackend.prototype.relu6 = function (x) {
        return notYetImplemented('relu6');
    };
    KernelBackend.prototype.prelu = function (x, a) {
        return notYetImplemented('prelu');
    };
    KernelBackend.prototype.elu = function (x) {
        return notYetImplemented('elu');
    };
    KernelBackend.prototype.eluDer = function (dy, y) {
        return notYetImplemented('eluDer');
    };
    KernelBackend.prototype.selu = function (x) {
        return notYetImplemented('selu');
    };
    KernelBackend.prototype.int = function (x) {
        return notYetImplemented('int');
    };
    KernelBackend.prototype.clip = function (x, min, max) {
        return notYetImplemented('clip');
    };
    KernelBackend.prototype.abs = function (x) {
        return notYetImplemented('abs');
    };
    KernelBackend.prototype.complexAbs = function (x) {
        return notYetImplemented('complexAbs');
    };
    KernelBackend.prototype.sigmoid = function (x) {
        return notYetImplemented('sigmoid');
    };
    KernelBackend.prototype.softplus = function (x) {
        return notYetImplemented('softplus');
    };
    KernelBackend.prototype.sin = function (x) {
        return notYetImplemented('sin');
    };
    KernelBackend.prototype.cos = function (x) {
        return notYetImplemented('cos');
    };
    KernelBackend.prototype.tan = function (x) {
        return notYetImplemented('tan');
    };
    KernelBackend.prototype.asin = function (x) {
        return notYetImplemented('asin');
    };
    KernelBackend.prototype.acos = function (x) {
        return notYetImplemented('acos');
    };
    KernelBackend.prototype.atan = function (x) {
        return notYetImplemented('atan');
    };
    KernelBackend.prototype.atan2 = function (a, b) {
        return notYetImplemented('atan2');
    };
    KernelBackend.prototype.sinh = function (x) {
        return notYetImplemented('sinh');
    };
    KernelBackend.prototype.cosh = function (x) {
        return notYetImplemented('cosh');
    };
    KernelBackend.prototype.tanh = function (x) {
        return notYetImplemented('tanh');
    };
    KernelBackend.prototype.asinh = function (x) {
        return notYetImplemented('asinh');
    };
    KernelBackend.prototype.acosh = function (x) {
        return notYetImplemented('acosh');
    };
    KernelBackend.prototype.atanh = function (x) {
        return notYetImplemented('atanh');
    };
    KernelBackend.prototype.erf = function (x) {
        return notYetImplemented('erf');
    };
    KernelBackend.prototype.step = function (x, alpha) {
        return notYetImplemented('step');
    };
    KernelBackend.prototype.fusedConv2d = function (_a) {
        var input = _a.input, filter = _a.filter, convInfo = _a.convInfo, bias = _a.bias, activation = _a.activation, preluActivationWeights = _a.preluActivationWeights;
        return notYetImplemented('fusedConv2d');
    };
    KernelBackend.prototype.conv2d = function (x, filter, convInfo) {
        return notYetImplemented('conv2d');
    };
    KernelBackend.prototype.conv2dDerInput = function (dy, filter, convInfo) {
        return notYetImplemented('conv2dDerInput');
    };
    KernelBackend.prototype.conv2dDerFilter = function (x, dY, convInfo) {
        return notYetImplemented('conv2dDerFilter');
    };
    KernelBackend.prototype.fusedDepthwiseConv2D = function (_a) {
        var input = _a.input, filter = _a.filter, convInfo = _a.convInfo, bias = _a.bias, activation = _a.activation, preluActivationWeights = _a.preluActivationWeights;
        return notYetImplemented('fusedDepthwiseConv2D');
    };
    KernelBackend.prototype.depthwiseConv2D = function (input, filter, convInfo) {
        return notYetImplemented('depthwiseConv2D');
    };
    KernelBackend.prototype.depthwiseConv2DDerInput = function (dy, filter, convInfo) {
        return notYetImplemented('depthwiseConv2DDerInput');
    };
    KernelBackend.prototype.depthwiseConv2DDerFilter = function (x, dY, convInfo) {
        return notYetImplemented('depthwiseConv2DDerFilter');
    };
    KernelBackend.prototype.conv3d = function (x, filter, convInfo) {
        return notYetImplemented('conv3d');
    };
    KernelBackend.prototype.conv3dDerInput = function (dy, filter, convInfo) {
        return notYetImplemented('conv3dDerInput');
    };
    KernelBackend.prototype.conv3dDerFilter = function (x, dY, convInfo) {
        return notYetImplemented('conv3dDerFilter');
    };
    KernelBackend.prototype.maxPool = function (x, convInfo) {
        return notYetImplemented('maxPool');
    };
    KernelBackend.prototype.maxPoolBackprop = function (dy, x, y, convInfo) {
        return notYetImplemented('maxPoolBackprop');
    };
    KernelBackend.prototype.avgPool = function (x, convInfo) {
        return notYetImplemented('avgPool');
    };
    KernelBackend.prototype.avgPoolBackprop = function (dy, x, convInfo) {
        return notYetImplemented('avgPoolBackprop');
    };
    KernelBackend.prototype.avgPool3d = function (x, convInfo) {
        return notYetImplemented('avgPool3d');
    };
    KernelBackend.prototype.avgPool3dBackprop = function (dy, x, convInfo) {
        return notYetImplemented('avgPool3dBackprop');
    };
    KernelBackend.prototype.maxPool3d = function (x, convInfo) {
        return notYetImplemented('maxPool3d');
    };
    KernelBackend.prototype.maxPool3dBackprop = function (dy, x, y, convInfo) {
        return notYetImplemented('maxPool3dBackprop');
    };
    KernelBackend.prototype.reshape = function (x, shape) {
        return notYetImplemented('reshape');
    };
    KernelBackend.prototype.cast = function (x, dtype) {
        return notYetImplemented('cast');
    };
    KernelBackend.prototype.tile = function (x, reps) {
        return notYetImplemented('tile');
    };
    KernelBackend.prototype.pad = function (x, paddings, constantValue) {
        return notYetImplemented('pad');
    };
    KernelBackend.prototype.transpose = function (x, perm) {
        return notYetImplemented('transpose');
    };
    KernelBackend.prototype.gather = function (x, indices, axis) {
        return notYetImplemented('gather');
    };
    KernelBackend.prototype.gatherND = function (x, indices) {
        return notYetImplemented('gatherND');
    };
    KernelBackend.prototype.scatterND = function (indices, updates, shape) {
        return notYetImplemented('scatterND');
    };
    KernelBackend.prototype.batchToSpaceND = function (x, blockShape, crops) {
        return notYetImplemented('batchToSpaceND');
    };
    KernelBackend.prototype.spaceToBatchND = function (x, blockShape, paddings) {
        return notYetImplemented('spaceToBatchND');
    };
    KernelBackend.prototype.resizeBilinear = function (x, newHeight, newWidth, alignCorners) {
        return notYetImplemented('resizeBilinear');
    };
    KernelBackend.prototype.resizeBilinearBackprop = function (dy, x, alignCorners) {
        return notYetImplemented('resizeBilinearBackprop');
    };
    KernelBackend.prototype.resizeNearestNeighbor = function (x, newHEight, newWidth, alignCorners) {
        return notYetImplemented('resizeNearestNeighbor');
    };
    KernelBackend.prototype.resizeNearestNeighborBackprop = function (dy, x, alignCorners) {
        return notYetImplemented('resizeNearestNeighborBackprop');
    };
    KernelBackend.prototype.batchNormalization = function (x, mean, variance, varianceEpsilon, scale, offset) {
        return notYetImplemented('batchNormalization');
    };
    KernelBackend.prototype.localResponseNormalization4D = function (x, radius, bias, alpha, beta) {
        return notYetImplemented('localResponseNormalization4D');
    };
    KernelBackend.prototype.LRNGrad = function (dy, inputImage, outputImage, radius, bias, alpha, beta) {
        return notYetImplemented('LRNGrad');
    };
    KernelBackend.prototype.multinomial = function (logits, normalized, numSamples, seed) {
        return notYetImplemented('multinomial');
    };
    KernelBackend.prototype.oneHot = function (indices, depth, onValue, offValue) {
        return notYetImplemented('oneHot');
    };
    KernelBackend.prototype.cumsum = function (x, axis, exclusive, reverse) {
        return notYetImplemented('cumsum');
    };
    KernelBackend.prototype.nonMaxSuppression = function (boxes, scores, maxOutputSize, iouThreshold, scoreThreshold) {
        return notYetImplemented('nonMaxSuppression');
    };
    KernelBackend.prototype.fft = function (x) {
        return notYetImplemented('fft');
    };
    KernelBackend.prototype.ifft = function (x) {
        return notYetImplemented('ifft');
    };
    KernelBackend.prototype.complex = function (real, imag) {
        return notYetImplemented('complex');
    };
    KernelBackend.prototype.real = function (input) {
        return notYetImplemented('real');
    };
    KernelBackend.prototype.imag = function (input) {
        return notYetImplemented('imag');
    };
    KernelBackend.prototype.cropAndResize = function (image, boxes, boxIndex, cropSize, method, extrapolationValue) {
        return notYetImplemented('cropAndResize');
    };
    KernelBackend.prototype.depthToSpace = function (x, blockSize, dataFormat) {
        return notYetImplemented('depthToSpace');
    };
    // Aligns with the "SplitV" kernel in TensorFlow.
    KernelBackend.prototype.split = function (value, sizeSplits, axis) {
        return notYetImplemented('split');
    };
    KernelBackend.prototype.sparseToDense = function (sparseIndices, sparseValues, outputShape, defaultValue) {
        return notYetImplemented('sparseToDense');
    };
    KernelBackend.prototype.diag = function (x) {
        return notYetImplemented('diag');
    };
    KernelBackend.prototype.fill = function (shape, value, dtype) {
        return notYetImplemented('fill');
    };
    KernelBackend.prototype.onesLike = function (x) {
        return notYetImplemented('onesLike');
    };
    KernelBackend.prototype.zerosLike = function (x) {
        return notYetImplemented('zerosLike');
    };
    KernelBackend.prototype.linspace = function (start, stop, num) {
        return notYetImplemented('linspace');
    };
    KernelBackend.prototype.dispose = function () {
        return notYetImplemented('dispose');
    };
    return KernelBackend;
}());
exports.KernelBackend = KernelBackend;
function notYetImplemented(kernelName) {
    throw new Error("'" + kernelName + "' not yet implemented or not found in the registry. " +
        "Did you forget to import the kernel?");
}
//# sourceMappingURL=backend.js.map