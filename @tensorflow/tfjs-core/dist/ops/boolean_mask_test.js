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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("../index");
var jasmine_util_1 = require("../jasmine_util");
var test_util_1 = require("../test_util");
jasmine_util_1.describeWithFlags('booleanMaskAsync', jasmine_util_1.ALL_ENVS, function () {
    it('1d array, 1d mask, default axis', function () { return __awaiter(_this, void 0, void 0, function () {
        var array, mask, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    array = tf.tensor1d([1, 2, 3]);
                    mask = tf.tensor1d([1, 0, 1], 'bool');
                    return [4 /*yield*/, tf.booleanMaskAsync(array, mask)];
                case 1:
                    result = _b.sent();
                    expect(result.shape).toEqual([2]);
                    expect(result.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [1, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2d array, 1d mask, default axis', function () { return __awaiter(_this, void 0, void 0, function () {
        var array, mask, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    array = tf.tensor2d([1, 2, 3, 4, 5, 6], [3, 2]);
                    mask = tf.tensor1d([1, 0, 1], 'bool');
                    return [4 /*yield*/, tf.booleanMaskAsync(array, mask)];
                case 1:
                    result = _b.sent();
                    expect(result.shape).toEqual([2, 2]);
                    expect(result.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [1, 2, 5, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2d array, 2d mask, default axis', function () { return __awaiter(_this, void 0, void 0, function () {
        var array, mask, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    array = tf.tensor2d([1, 2, 3, 4, 5, 6], [3, 2]);
                    mask = tf.tensor2d([1, 0, 1, 0, 1, 0], [3, 2], 'bool');
                    return [4 /*yield*/, tf.booleanMaskAsync(array, mask)];
                case 1:
                    result = _b.sent();
                    expect(result.shape).toEqual([3]);
                    expect(result.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [1, 3, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2d array, 1d mask, axis=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var array, mask, axis, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    array = tf.tensor2d([1, 2, 3, 4, 5, 6], [3, 2]);
                    mask = tf.tensor1d([0, 1], 'bool');
                    axis = 1;
                    return [4 /*yield*/, tf.booleanMaskAsync(array, mask, axis)];
                case 1:
                    result = _b.sent();
                    expect(result.shape).toEqual([3, 1]);
                    expect(result.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [2, 4, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts tensor-like object as array or mask', function () { return __awaiter(_this, void 0, void 0, function () {
        var array, mask, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    array = [[1, 2], [3, 4], [5, 6]];
                    mask = [1, 0, 1];
                    return [4 /*yield*/, tf.booleanMaskAsync(array, mask)];
                case 1:
                    result = _b.sent();
                    expect(result.shape).toEqual([2, 2]);
                    expect(result.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [1, 2, 5, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('ensure no memory leak', function () { return __awaiter(_this, void 0, void 0, function () {
        var numTensorsBefore, array, mask, result, _a, numTensorsAfter;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    numTensorsBefore = tf.memory().numTensors;
                    array = tf.tensor1d([1, 2, 3]);
                    mask = tf.tensor1d([1, 0, 1], 'bool');
                    return [4 /*yield*/, tf.booleanMaskAsync(array, mask)];
                case 1:
                    result = _b.sent();
                    expect(result.shape).toEqual([2]);
                    expect(result.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [1, 3]]);
                    array.dispose();
                    mask.dispose();
                    result.dispose();
                    numTensorsAfter = tf.memory().numTensors;
                    expect(numTensorsAfter).toBe(numTensorsBefore);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw if mask is scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var array, mask, errorMessage, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    array = tf.tensor2d([1, 2, 3, 4, 5, 6], [3, 2]);
                    mask = tf.scalar(1, 'bool');
                    errorMessage = 'No error thrown.';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, tf.booleanMaskAsync(array, mask)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    errorMessage = error_1.message;
                    return [3 /*break*/, 4];
                case 4:
                    expect(errorMessage).toBe('mask cannot be scalar');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw if array and mask shape miss match', function () { return __awaiter(_this, void 0, void 0, function () {
        var array, mask, errorMessage, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    array = tf.tensor2d([1, 2, 3, 4, 5, 6], [3, 2]);
                    mask = tf.tensor2d([1, 0], [1, 2], 'bool');
                    errorMessage = 'No error thrown.';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, tf.booleanMaskAsync(array, mask)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    errorMessage = error_2.message;
                    return [3 /*break*/, 4];
                case 4:
                    expect(errorMessage)
                        .toBe("mask's shape must match the first K " +
                        "dimensions of tensor's shape, Shapes 3,2 and 1,2 must match");
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=boolean_mask_test.js.map