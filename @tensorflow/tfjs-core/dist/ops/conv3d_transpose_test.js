"use strict";
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("../index");
var jasmine_util_1 = require("../jasmine_util");
var test_util_1 = require("../test_util");
jasmine_util_1.describeWithFlags('conv3dTranspose', jasmine_util_1.ALL_ENVS, function () {
    // Reference Python TensorFlow code
    // ```python
    // import numpy as np
    // import tensorflow as tf
    // tf.enable_eager_execution()
    // x = np.array([2], dtype = np.float32).reshape(1, 1, 1, 1, 1)
    // w = np.array([5, 4, 8, 7, 1, 2, 6, 3], dtype = np.float32).reshape(2, 2, 2,
    //   1, 1)
    // tf.nn.conv3d_transpose(x, w, output_shape=[1, 2, 2, 2, 1], padding='VALID')
    // ```
    it('input=2x2x2x1,d2=1,f=2,s=1,p=valid', function () { return __awaiter(_this, void 0, void 0, function () {
        var origInputDepth, origOutputDepth, inputShape, fSize, origPad, origStride, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    origInputDepth = 1;
                    origOutputDepth = 1;
                    inputShape = [1, 1, 1, origOutputDepth];
                    fSize = 2;
                    origPad = 'valid';
                    origStride = 1;
                    x = tf.tensor4d([2], inputShape);
                    w = tf.tensor5d([5, 4, 8, 7, 1, 2, 6, 3], [fSize, fSize, fSize, origInputDepth, origOutputDepth]);
                    result = tf.conv3dTranspose(x, w, [2, 2, 2, 1], origStride, origPad);
                    expected = [10, 8, 16, 14, 2, 4, 12, 6];
                    expect(result.shape).toEqual([2, 2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Reference Python TensorFlow code
    // ```python
    // import numpy as np
    // import tensorflow as tf
    // tf.enable_eager_execution()
    // x = np.array([2, 3], dtype = np.float32).reshape(2, 1, 1, 1, 1, 1)
    // w = np.array([5, 4, 8, 7, 1, 2, 6, 3], dtype = np.float32).reshape(2,
    //   2, 2, 1, 1)
    // tf.nn.conv3d_transpose(x, w, output_shape=[2, 2, 2, 2, 1], padding='VALID')
    // ```
    it('input=2x2x2x1,d2=1,f=2,s=1,p=valid, batch=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var origInputDepth, origOutputDepth, inputShape, fSize, origPad, origStride, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    origInputDepth = 1;
                    origOutputDepth = 1;
                    inputShape = [2, 1, 1, 1, origOutputDepth];
                    fSize = 2;
                    origPad = 'valid';
                    origStride = 1;
                    x = tf.tensor5d([2, 3], inputShape);
                    w = tf.tensor5d([5, 4, 8, 7, 1, 2, 6, 3], [fSize, fSize, fSize, origInputDepth, origOutputDepth]);
                    result = tf.conv3dTranspose(x, w, [2, 2, 2, 2, 1], origStride, origPad);
                    expected = [10, 8, 16, 14, 2, 4, 12, 6, 15, 12, 24, 21, 3, 6, 18, 9];
                    expect(result.shape).toEqual([2, 2, 2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=conv3d_transpose_test.js.map