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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tensor_util_env_1 = require("../tensor_util_env");
var util = require("../util");
var logical_ops_1 = require("./logical_ops");
var segment_ops_1 = require("./segment_ops");
/**
 * Apply boolean mask to tensor.
 *
 * ```js
 * const tensor = tf.tensor2d([1, 2, 3, 4, 5, 6], [3, 2]);
 * const mask = tf.tensor1d([1, 0, 1], 'bool');
 * const result = await tf.booleanMaskAsync(tensor, mask);
 * result.print();
 * ```
 *
 * @param tensor N-D tensor.
 * @param mask K-D boolean tensor, K <= N and K must be known statically.
 * @param axis A 0-D int Tensor representing the axis in tensor to mask from.
 *     By default, axis is 0 which will mask from the first dimension.
 *     Otherwise K + axis <= N.
 */
/** @doc {heading: 'Tensors', subheading: 'Slicing and Joining'} */
function booleanMaskAsync_(tensor, mask, axis) {
    return __awaiter(this, void 0, void 0, function () {
        var $tensor, $mask, axisFrom, maskDim, tensorShape, leadingSize, i, targetTensorShape, reshapedTensor, reshapedMask, positivePositions, indices, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    $tensor = tensor_util_env_1.convertToTensor(tensor, 'tensor', 'boolMask');
                    $mask = tensor_util_env_1.convertToTensor(mask, 'mask', 'boolMask', 'bool');
                    axisFrom = axis == null ? 0 : axis;
                    maskDim = $mask.rank;
                    tensorShape = $tensor.shape;
                    util.assert(maskDim > 0, function () { return 'mask cannot be scalar'; });
                    util.assertShapesMatch(tensorShape.slice(axisFrom, axisFrom + maskDim), $mask.shape, "mask's shape must match the first K dimensions of tensor's shape,");
                    leadingSize = 1;
                    for (i = axisFrom; i < axisFrom + maskDim; i++) {
                        leadingSize *= tensorShape[i];
                    }
                    targetTensorShape = tensorShape.slice(0, axisFrom)
                        .concat([leadingSize], tensorShape.slice(axisFrom + maskDim));
                    reshapedTensor = $tensor.reshape(targetTensorShape);
                    reshapedMask = $mask.reshape([-1]);
                    return [4 /*yield*/, logical_ops_1.whereAsync(reshapedMask)];
                case 1:
                    positivePositions = _a.sent();
                    indices = positivePositions.squeeze([1]);
                    res = segment_ops_1.gather(reshapedTensor, indices, axisFrom);
                    // Ensure no memory leak.
                    if (tensor !== $tensor) {
                        $tensor.dispose();
                    }
                    if (mask !== $mask) {
                        $mask.dispose();
                    }
                    indices.dispose();
                    reshapedTensor.dispose();
                    reshapedMask.dispose();
                    positivePositions.dispose();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.booleanMaskAsync = booleanMaskAsync_;
//# sourceMappingURL=boolean_mask.js.map