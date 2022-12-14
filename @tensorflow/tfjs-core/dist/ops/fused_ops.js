"use strict";
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
var engine_1 = require("../engine");
var conv_1 = require("../ops/conv");
var conv_util = require("../ops/conv_util");
var operation_1 = require("../ops/operation");
var tensor_util_1 = require("../tensor_util");
var tensor_util_env_1 = require("../tensor_util_env");
var util = require("../util");
var binary_ops_1 = require("./binary_ops");
var broadcast_util = require("./broadcast_util");
var conv_2 = require("./conv");
var fused_util_1 = require("./fused_util");
var matmul_1 = require("./matmul");
var relu_ops_1 = require("./relu_ops");
// Returns gradient for fused activation.
var getFusedDyActivation = function (dy, y, activation) {
    if (activation == null || activation === 'linear') {
        return dy;
    }
    if (activation === 'relu') {
        return dy.mul(y.step());
    }
    throw new Error("Gradient for activation " + activation + " has not been " +
        "implemented yet.");
};
// Returns gradient for fused bias.
var getFusedBiasGradient = function (bias, dyActivation) {
    var res = dyActivation;
    var reduceAxes = broadcast_util.getReductionAxes(bias.shape, dyActivation.shape);
    if (reduceAxes.length > 0) {
        res = res.sum(reduceAxes);
    }
    return res.reshape(bias.shape);
};
var applyActivation = function (x, activation, preluActivationWeights) {
    if (activation === 'linear') {
        return x;
    }
    else if (activation === 'relu') {
        return relu_ops_1.relu(x);
    }
    else if (activation === 'elu') {
        return relu_ops_1.elu(x);
    }
    else if (activation === 'relu6') {
        return relu_ops_1.relu6(x);
    }
    else if (activation === 'prelu') {
        return relu_ops_1.prelu(x, preluActivationWeights);
    }
    throw new Error("Unknown fused activation " + activation + ".");
};
/**
 * Computes the dot product of two matrices with optional activation and bias.
 *
 * ```js
 * const a = tf.tensor2d([-1, -2], [1, 2]);
 * const b = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 * const bias = tf.tensor2d([1, 2], [1, 2]);
 *
 * tf.fused.matMul({a, b, bias, activation: 'relu'}).print();
 * ```
 *
 * @param obj An object with the following properties:
 * - `a` First matrix in dot product operation.
 * - `b` Second matrix in dot product operation.
 * - `transposeA` If true, `a` is transposed before multiplication.
 * - `transposeB` If true, `b` is transposed before multiplication.
 * - `bias` Matrix to be added to the result.
 * - `activation` Name of activation kernel (defaults to `linear`).
 * - `preluActivationWeights` Tensor of prelu weights.
 */
function fusedMatMul_(_a) {
    var _b;
    var a = _a.a, b = _a.b, _c = _a.transposeA, transposeA = _c === void 0 ? false : _c, _d = _a.transposeB, transposeB = _d === void 0 ? false : _d, bias = _a.bias, _e = _a.activation, activation = _e === void 0 ? 'linear' : _e, preluActivationWeights = _a.preluActivationWeights;
    if (fused_util_1.shouldFuse(engine_1.ENGINE.state.gradientDepth, activation) === false) {
        var result = matmul_1.matMul(a, b, transposeA, transposeB);
        if (bias != null) {
            result = binary_ops_1.add(result, bias);
        }
        return applyActivation(result, activation, preluActivationWeights);
    }
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'fused matMul');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'fused matMul');
    _b = tensor_util_1.makeTypesMatch($a, $b), $a = _b[0], $b = _b[1];
    var innerShapeA = transposeA ? $a.shape[$a.rank - 2] : $a.shape[$a.rank - 1];
    var innerShapeB = transposeB ? $b.shape[$b.rank - 1] : $b.shape[$b.rank - 2];
    var outerShapeA = transposeA ? $a.shape[$a.rank - 1] : $a.shape[$a.rank - 2];
    var outerShapeB = transposeB ? $b.shape[$b.rank - 2] : $b.shape[$b.rank - 1];
    var outerDimsA = $a.shape.slice(0, -2);
    var outerDimsB = $b.shape.slice(0, -2);
    var batchDimA = util.sizeFromShape(outerDimsA);
    var batchDimB = util.sizeFromShape(outerDimsB);
    util.assert($a.rank >= 2 && $b.rank >= 2 && $a.rank === $b.rank, function () {
        return "Error in fused matMul: inputs must have the same rank of at least " +
            ("2, got ranks " + $a.rank + " and " + $b.rank + ".");
    });
    util.assert(util.arraysEqual(outerDimsA, outerDimsB), function () { return "Error in fused matMul: outer dimensions (" + outerDimsA + ") and (" +
        (outerDimsB + ") of Tensors with shapes " + $a.shape + " and ") +
        ($b.shape + " must match."); });
    util.assert(innerShapeA === innerShapeB, function () { return "Error in fused matMul: inner shapes (" + innerShapeA + ") and (" +
        (innerShapeB + ") of Tensors with shapes " + $a.shape + " and ") +
        ($b.shape + " and transposeA=" + transposeA) +
        (" and transposeB=" + transposeB + " must match."); });
    var outShape = $a.shape.slice(0, -2).concat([outerShapeA, outerShapeB]);
    var a3D = transposeA ? $a.as3D(batchDimA, innerShapeA, outerShapeA) :
        $a.as3D(batchDimA, outerShapeA, innerShapeA);
    var b3D = transposeB ? $b.as3D(batchDimB, outerShapeB, innerShapeB) :
        $b.as3D(batchDimB, innerShapeB, outerShapeB);
    var $bias;
    if (bias != null) {
        $bias = tensor_util_env_1.convertToTensor(bias, 'bias', 'fused matMul');
        $bias = tensor_util_1.makeTypesMatch($bias, $a)[0];
        broadcast_util.assertAndGetBroadcastShape(outShape, $bias.shape);
    }
    var $preluActivationWeights;
    if (preluActivationWeights != null) {
        $preluActivationWeights = tensor_util_env_1.convertToTensor(preluActivationWeights, 'prelu weights', 'fused matMul');
    }
    var grad = function (dy, saved) {
        var a3D = saved[0], b3D = saved[1], y = saved[2];
        var dyActivation = getFusedDyActivation(dy, y, activation);
        var biasGradient = {};
        if (bias != null) {
            biasGradient = { bias: function () { return getFusedBiasGradient($bias, dyActivation); } };
        }
        if (!transposeA && !transposeB) {
            return Object.assign({
                a: function () { return dyActivation.matMul(b3D, false, true); },
                b: function () { return a3D.matMul(dyActivation, true, false); }
            }, biasGradient);
        }
        else if (!transposeA && transposeB) {
            return Object.assign({
                a: function () { return dyActivation.matMul(b3D, false, false); },
                b: function () { return dyActivation.matMul(a3D, true, false); }
            }, biasGradient);
        }
        else if (transposeA && !transposeB) {
            return Object.assign({
                a: function () { return b3D.matMul(dyActivation, false, true); },
                b: function () { return a3D.matMul(dyActivation, false, false); }
            }, biasGradient);
        }
        else {
            return Object.assign({
                a: function () { return b3D.matMul(dyActivation, true, true); },
                b: function () { return dyActivation.matMul(a3D, true, true); }
            }, biasGradient);
        }
    };
    var inputs = { a: a3D, b: b3D };
    if (bias != null) {
        inputs.bias = $bias;
    }
    if (preluActivationWeights != null) {
        inputs.preluActivationWeights = $preluActivationWeights;
    }
    var inputsToSave = [a3D, b3D];
    var outputsToSave = [true];
    var res = engine_1.ENGINE.runKernelFunc(function (backend, save) {
        var y = backend.fusedBatchMatMul({
            a: a3D,
            b: b3D,
            transposeA: transposeA,
            transposeB: transposeB,
            bias: $bias,
            activation: activation,
            preluActivationWeights: $preluActivationWeights
        });
        save([a3D, b3D, y]);
        return y;
    }, inputs, grad, '_FusedMatMul', { transposeA: transposeA, transposeB: transposeB, activation: activation }, inputsToSave, outputsToSave);
    return res.reshape(outShape);
}
/**
 * Computes a 2D convolution over the input x, optionally fused with adding a
 * bias and applying an activation.
 *
 * ```js
 * const inputDepth = 2;
 * const inShape = [2, 2, 2, inputDepth];
 * const outputDepth = 2;
 * const fSize = 1;
 * const pad = 0;
 * const strides = 1;
 *
 * const x = tf.tensor4d( [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
 * 16], inShape);
 * const w = tf.tensor4d([-1, 1, -2, 0.5], [fSize, fSize, inputDepth,
 * outputDepth]);
 *
 * tf.fused.conv2d({ x, filter: w, strides, pad, dataFormat: 'NHWC',
 * dilations: [1, 1], bias: tf.scalar(5), activation: 'relu' }).print();
 * ```
 *
 * @param obj An object with the following properties:
 * @param x The input tensor, of rank 4 or rank 3, of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is
 * assumed.
 * @param filter The filter, rank 4, of shape
 *     `[filterHeight, filterWidth, inDepth, outDepth]`.
 * @param strides The strides of the convolution: `[strideHeight,
 * strideWidth]`.
 * @param pad The type of padding algorithm.
 *   - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *   - `valid` output will be smaller than input if filter is larger
 *       than 1x1.
 *   - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *          https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param dataFormat An optional string from: "NHWC", "NCHW". Defaults to
 *     "NHWC". Specify the data format of the input and output data. With the
 *     default format "NHWC", the data is stored in the order of: [batch,
 *     height, width, channels]. Only "NHWC" is currently supported.
 * @param dilations The dilation rates: `[dilationHeight, dilationWidth]`
 *     in which we sample input values across the height and width dimensions
 *     in atrous convolution. Defaults to `[1, 1]`. If `dilations` is a single
 *     number, then `dilationHeight == dilationWidth`. If it is greater than
 *     1, then all values of `strides` must be 1.
 * @param dimRoundingMode The rounding mode used when computing output
 *     dimensions if pad is a number. If none is provided, it will not round
 *     and error if the output is of fractional size.
 * @param bias Tensor to be added to the result.
 * @param activation Name of activation kernel (defaults to `linear`) to be
 *     applied
 *      after biasAdd.
 * @param preluActivationWeights Tensor of prelu weights to be applied as part
 *     of a `prelu` activation, typically the same shape as `x`.
 */
function fusedConv2d_(_a) {
    var x = _a.x, filter = _a.filter, strides = _a.strides, pad = _a.pad, _b = _a.dataFormat, dataFormat = _b === void 0 ? 'NHWC' : _b, _c = _a.dilations, dilations = _c === void 0 ? [1, 1] : _c, dimRoundingMode = _a.dimRoundingMode, bias = _a.bias, _d = _a.activation, activation = _d === void 0 ? 'linear' : _d, preluActivationWeights = _a.preluActivationWeights;
    activation = activation || 'linear';
    if (fused_util_1.shouldFuse(engine_1.ENGINE.state.gradientDepth, activation) === false) {
        var result = conv_2.conv2d(x, filter, strides, pad, dataFormat, dilations, dimRoundingMode);
        if (bias != null) {
            result = binary_ops_1.add(result, bias);
        }
        return applyActivation(result, activation, preluActivationWeights);
    }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'conv2d');
    var $filter = tensor_util_env_1.convertToTensor(filter, 'filter', 'conv2d');
    var x4D = $x;
    var reshapedTo4D = false;
    if ($x.rank === 3) {
        reshapedTo4D = true;
        x4D = $x.as4D(1, $x.shape[0], $x.shape[1], $x.shape[2]);
    }
    util.assert(x4D.rank === 4, function () { return "Error in fused conv2d: input must be rank 4, but got rank " +
        (x4D.rank + "."); });
    util.assert($filter.rank === 4, function () { return "Error in fused conv2d: filter must be rank 4, but got rank " +
        ($filter.rank + "."); });
    if (dimRoundingMode != null) {
        util.assert(util.isInt(pad), function () { return "Error in fused conv2d: pad must be an integer when using, " +
            ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + "."); });
    }
    util.assert(x4D.shape[3] === $filter.shape[2], function () { return "Error in conv2d: depth of input (" + x4D.shape[3] + ") must match " +
        ("input depth for filter " + $filter.shape[2] + "."); });
    util.assert(conv_util.eitherStridesOrDilationsAreOne(strides, dilations), function () { return 'Error in conv2D: Either strides or dilations must be 1. ' +
        ("Got strides " + strides + " and dilations '" + dilations + "'"); });
    util.assert(dataFormat === 'NHWC', function () { return "Error in conv2d: got dataFormat of " + dataFormat + " but only NHWC is currently supported."; });
    var convInfo = conv_util.computeConv2DInfo(x4D.shape, $filter.shape, strides, dilations, pad, dimRoundingMode);
    var $bias;
    if (bias != null) {
        $bias = tensor_util_env_1.convertToTensor(bias, 'bias', 'fused conv2d');
        $bias = tensor_util_1.makeTypesMatch($bias, $x)[0];
        broadcast_util.assertAndGetBroadcastShape(convInfo.outShape, $bias.shape);
    }
    var $preluActivationWeights;
    if (preluActivationWeights != null) {
        $preluActivationWeights = tensor_util_env_1.convertToTensor(preluActivationWeights, 'prelu weights', 'fused conv2d');
    }
    var grad = function (dy, saved) {
        var _a = saved, $filter = _a[0], x4D = _a[1], y = _a[2];
        var dyActivation = getFusedDyActivation(dy, y, activation);
        util.assert(conv_util.tupleValuesAreOne(dilations), function () { return 'Error in gradient of fused conv2D: ' +
            "dilation rates greater than 1 " +
            ("are not yet supported in gradients. Got dilations '" + dilations + "'"); });
        var biasGradient = {};
        if (bias != null) {
            biasGradient = { bias: function () { return getFusedBiasGradient($bias, dyActivation); } };
        }
        return Object.assign({
            x: function () {
                return conv_1.conv2dDerInput(x4D.shape, dyActivation, $filter, strides, pad);
            },
            filter: function () {
                return conv_1.conv2dDerFilter(x4D, dyActivation, $filter.shape, strides, pad);
            }
        }, biasGradient);
    };
    var inputs = { x: x4D, filter: $filter };
    if (bias != null) {
        inputs.bias = $bias;
    }
    if (preluActivationWeights != null) {
        inputs.preluActivationWeights = $preluActivationWeights;
    }
    var inputsToSave = [$filter, x4D];
    var outputsToSave = [true]; // Save the only output.
    var res = engine_1.ENGINE.runKernelFunc(function (backend, save) {
        var res = backend.fusedConv2d({
            input: x4D,
            filter: $filter,
            convInfo: convInfo,
            bias: $bias,
            activation: activation,
            preluActivationWeights: $preluActivationWeights
        });
        save([$filter, x4D, res]);
        return res;
    }, inputs, grad, 'FusedConv2D', { convInfo: convInfo, activation: activation }, inputsToSave, outputsToSave);
    if (reshapedTo4D) {
        return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
    }
    return res;
}
/**
 * Computes depthwise 2D convolution, optionally fused with adding a
 * bias and applying an activation.
 *
 * Given a 4D `input` array and a `filter` array of shape
 * `[filterHeight, filterWidth, inChannels, channelMultiplier]` containing
 * `inChannels` convolutional filters of depth 1, this op applies a
 * different filter to each input channel (expanding from 1 channel to
 * `channelMultiplier` channels for each), then concatenates the results
 * together. The output has `inChannels * channelMultiplier` channels.
 *
 * See
 * [https://www.tensorflow.org/api_docs/python/tf/nn/depthwise_conv2d](
 *     https://www.tensorflow.org/api_docs/python/tf/nn/depthwise_conv2d)
 * for more details.
 *
 * @param obj An object with the following properties:
 * @param x The input tensor, of rank 4 or rank 3, of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is
 * assumed.
 * @param filter The filter tensor, rank 4, of shape
 *     `[filterHeight, filterWidth, inChannels, channelMultiplier]`.
 * @param strides The strides of the convolution: `[strideHeight,
 * strideWidth]`. If strides is a single number, then `strideHeight ==
 * strideWidth`.
 * @param pad The type of padding algorithm.
 *   - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *   - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *   - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *          https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param dilations The dilation rates: `[dilationHeight, dilationWidth]`
 *     in which we sample input values across the height and width dimensions
 *     in atrous convolution. Defaults to `[1, 1]`. If `rate` is a single
 *     number, then `dilationHeight == dilationWidth`. If it is greater than
 *     1, then all values of `strides` must be 1.
 * @param dataFormat: An optional string from: "NHWC", "NCHW". Defaults to
 *     "NHWC". Specify the data format of the input and output data. With the
 *     default format "NHWC", the data is stored in the order of: [batch,
 *     height, width, channels]. Only "NHWC" is currently supported.
 * @param dimRoundingMode The rounding mode used when computing output
 *     dimensions if pad is a number. If none is provided, it will not round
 *     and error if the output is of fractional size.
 * @param bias Tensor to be added to the result.
 * @param activation Name of activation kernel (defaults to `linear`).
 * @param preluActivationWeights Tensor of prelu weights to be applied as part
 *     of a `prelu` activation, typically the same shape as `x`.
 */
function fusedDepthwiseConv2d_(_a) {
    var x = _a.x, filter = _a.filter, strides = _a.strides, pad = _a.pad, _b = _a.dataFormat, dataFormat = _b === void 0 ? 'NHWC' : _b, _c = _a.dilations, dilations = _c === void 0 ? [1, 1] : _c, dimRoundingMode = _a.dimRoundingMode, bias = _a.bias, _d = _a.activation, activation = _d === void 0 ? 'linear' : _d, preluActivationWeights = _a.preluActivationWeights;
    if (fused_util_1.shouldFuse(engine_1.ENGINE.state.gradientDepth, activation) === false) {
        var result = conv_2.depthwiseConv2d(x, filter, strides, pad, dataFormat, dilations, dimRoundingMode);
        if (bias != null) {
            result = binary_ops_1.add(result, bias);
        }
        return applyActivation(result, activation, preluActivationWeights);
    }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'depthwiseConv2d');
    var $filter = tensor_util_env_1.convertToTensor(filter, 'filter', 'depthwiseConv2d');
    var x4D = $x;
    var reshapedTo4D = false;
    if ($x.rank === 3) {
        reshapedTo4D = true;
        x4D = $x.as4D(1, $x.shape[0], $x.shape[1], $x.shape[2]);
    }
    util.assert(x4D.rank === 4, function () { return "Error in fused depthwiseConv2d: input must be rank 4, but got " +
        ("rank " + x4D.rank + "."); });
    util.assert($filter.rank === 4, function () { return "Error in fused depthwiseConv2d: filter must be rank 4, " +
        ("but got rank " + $filter.rank + "."); });
    util.assert(x4D.shape[3] === $filter.shape[2], function () { return "Error in fused depthwiseConv2d: number of input channels " +
        ("(" + x4D.shape[3] + ") must match the inChannels dimension in ") +
        ("filter " + $filter.shape[2] + "."); });
    if (dilations == null) {
        dilations = [1, 1];
    }
    util.assert(conv_util.eitherStridesOrDilationsAreOne(strides, dilations), function () {
        return 'Error in fused depthwiseConv2d: Either strides or dilations must ' +
            ("be 1. Got strides " + strides + " and dilations '" + dilations + "'");
    });
    if (dimRoundingMode != null) {
        util.assert(util.isInt(pad), function () { return "Error in fused depthwiseConv2d: pad must be an integer when " +
            ("using dimRoundingMode " + dimRoundingMode + " but got pad " + pad + "."); });
    }
    var convInfo = conv_util.computeConv2DInfo(x4D.shape, $filter.shape, strides, dilations, pad, dimRoundingMode, true /* depthwise */);
    var $bias;
    if (bias != null) {
        $bias = tensor_util_env_1.convertToTensor(bias, 'bias', 'fused conv2d');
        $bias = tensor_util_1.makeTypesMatch($bias, $x)[0];
        broadcast_util.assertAndGetBroadcastShape(convInfo.outShape, $bias.shape);
    }
    var $preluActivationWeights;
    if (preluActivationWeights != null) {
        $preluActivationWeights = tensor_util_env_1.convertToTensor(preluActivationWeights, 'prelu weights', 'fused depthwiseConv2d');
    }
    var grad = function (dy, saved) {
        util.assert(conv_util.tupleValuesAreOne(dilations), function () { return 'Error in gradient of fused depthwiseConv2d: dilation rates ' +
            "greater than 1 are not yet supported. Got dilations " +
            ("'" + dilations + "'"); });
        var $filter = saved[0], x4D = saved[1], y = saved[2];
        var dyActivation = getFusedDyActivation(dy, y, activation);
        var biasGradient = {};
        if (bias != null) {
            biasGradient = { bias: function () { return getFusedBiasGradient($bias, dyActivation); } };
        }
        return Object.assign({
            x: function () { return conv_1.depthwiseConv2dDerInput(x4D.shape, dyActivation, $filter, convInfo); },
            filter: function () { return conv_1.depthwiseConv2dDerFilter(x4D, dyActivation, $filter.shape, convInfo); },
        }, biasGradient);
    };
    var inputs = { x: x4D, filter: $filter };
    if (bias != null) {
        inputs.bias = $bias;
    }
    if (preluActivationWeights != null) {
        inputs.preluActivationWeights = $preluActivationWeights;
    }
    var inputsToSave = [$filter, x4D];
    var outputsToSave = [true];
    var res = engine_1.ENGINE.runKernelFunc(function (backend, save) {
        var res = backend.fusedDepthwiseConv2D({
            input: x4D,
            filter: $filter,
            convInfo: convInfo,
            bias: $bias,
            activation: activation,
            preluActivationWeights: $preluActivationWeights
        });
        save([$filter, x4D, res]);
        return res;
    }, inputs, grad, 'FusedDepthwiseConv2D', { convInfo: convInfo, activation: activation }, inputsToSave, outputsToSave);
    if (reshapedTo4D) {
        return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
    }
    return res;
}
exports.matMul = operation_1.op({ fusedMatMul_: fusedMatMul_ });
exports.conv2d = operation_1.op({ fusedConv2d_: fusedConv2d_ });
exports.depthwiseConv2d = operation_1.op({ fusedDepthwiseConv2d_: fusedDepthwiseConv2d_ });
//# sourceMappingURL=fused_ops.js.map