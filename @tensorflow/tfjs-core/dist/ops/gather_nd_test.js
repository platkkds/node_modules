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
var jasmine_util_1 = require("../jasmine_util");
var test_util_1 = require("../test_util");
var gather_nd_1 = require("./gather_nd");
var tensor_ops_1 = require("./tensor_ops");
jasmine_util_1.describeWithFlags('gatherND', jasmine_util_1.ALL_ENVS, function () {
    it('should work for simple slice', function () { return __awaiter(_this, void 0, void 0, function () {
        var indices, input, shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    indices = tensor_ops_1.tensor2d([0, 4, 8], [3, 1], 'int32');
                    input = tensor_ops_1.tensor1d([100, 101, 102, 777, 778, 779, 1000, 1001, 1002], 'int32');
                    shape = [3];
                    result = gather_nd_1.gatherND(input, indices);
                    expect(result.shape).toEqual(shape);
                    expect(result.dtype).toEqual(input.dtype);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [100, 778, 1002]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should work for indexing 2d', function () { return __awaiter(_this, void 0, void 0, function () {
        var indices, input, shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    indices = tensor_ops_1.tensor2d([0, 2], [2, 1], 'int32');
                    input = tensor_ops_1.tensor2d([
                        5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8,
                        5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8
                    ], [8, 4], 'float32');
                    shape = [2, 4];
                    result = gather_nd_1.gatherND(input, indices);
                    expect(result.shape).toEqual(shape);
                    expect(result.dtype).toEqual(input.dtype);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 5, 5, 5, 7, 7, 7, 7]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should work for indexing 3d', function () { return __awaiter(_this, void 0, void 0, function () {
        var indices, input, shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    indices = tensor_ops_1.tensor2d([0, 2, 1, 1], [2, 2], 'int32');
                    input = tensor_ops_1.tensor3d([
                        5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8,
                        5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8
                    ], [2, 4, 4], 'float32');
                    shape = [2, 4];
                    result = gather_nd_1.gatherND(input, indices);
                    expect(result.shape).toEqual(shape);
                    expect(result.dtype).toEqual(input.dtype);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [7, 7, 7, 7, 6, 6, 6, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should work for batch slice', function () { return __awaiter(_this, void 0, void 0, function () {
        var indices, input, shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    indices = tensor_ops_1.tensor3d([0, 4, 2], [3, 1, 1], 'int32');
                    input = tensor_ops_1.tensor1d([100, 101, 102, 777, 778, 779, 10000, 10001, 10002], 'int32');
                    shape = [3, 1];
                    result = gather_nd_1.gatherND(input, indices);
                    expect(result.shape).toEqual(shape);
                    expect(result.dtype).toEqual(input.dtype);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [100, 778, 102]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should work for batch indexing 2d', function () { return __awaiter(_this, void 0, void 0, function () {
        var indices, input, shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    indices = tensor_ops_1.tensor3d([0, 2], [2, 1, 1], 'int32');
                    input = tensor_ops_1.tensor2d([
                        5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8,
                        5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8
                    ], [8, 4], 'float32');
                    shape = [2, 1, 4];
                    result = gather_nd_1.gatherND(input, indices);
                    expect(result.shape).toEqual(shape);
                    expect(result.dtype).toEqual(input.dtype);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 5, 5, 5, 7, 7, 7, 7]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should work for batch indexing 3d', function () { return __awaiter(_this, void 0, void 0, function () {
        var indices, input, shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    indices = tensor_ops_1.tensor3d([0, 2, 1, 1], [2, 1, 2], 'int32');
                    input = tensor_ops_1.tensor3d([
                        5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8,
                        5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8
                    ], [2, 4, 4], 'float32');
                    shape = [2, 1, 4];
                    result = gather_nd_1.gatherND(input, indices);
                    expect(result.shape).toEqual(shape);
                    expect(result.dtype).toEqual(input.dtype);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [7, 7, 7, 7, 6, 6, 6, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should work for TensorLike inputs', function () { return __awaiter(_this, void 0, void 0, function () {
        var indices, input, shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    indices = [[0], [4], [8]];
                    input = [100, 101, 102, 777, 778, 779, 1000, 1001, 1002];
                    shape = [3];
                    result = gather_nd_1.gatherND(input, indices);
                    expect(result.shape).toEqual(shape);
                    expect(result.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [100, 778, 1002]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw error when indices are not int32', function () {
        var indices = tensor_ops_1.tensor1d([1], 'float32');
        var input = tensor_ops_1.tensor2d([100, 101, 102, 103, 777, 778, 779, 780, 10000, 10001, 10002, 10004], [3, 4], 'float32');
        expect(function () { return gather_nd_1.gatherND(input, indices); }).toThrow();
    });
    it('should throw error when indices are scalar', function () {
        var indices = tensor_ops_1.scalar(1, 'int32');
        var input = tensor_ops_1.tensor2d([100, 101, 102, 103, 777, 778, 779, 780, 10000, 10001, 10002, 10004], [3, 4], 'float32');
        expect(function () { return gather_nd_1.gatherND(input, indices); }).toThrow();
    });
    it('should throw error when x is scalar', function () {
        var indices = tensor_ops_1.tensor2d([0, 4, 2], [3, 1], 'int32');
        var input = tensor_ops_1.scalar(1.0, 'float32');
        expect(function () { return gather_nd_1.gatherND(input, indices); }).toThrow();
    });
    it('should throw error when indices inner dim > x shape length', function () {
        var indices = tensor_ops_1.tensor2d([0, 4, 2], [1, 3], 'int32');
        var input = tensor_ops_1.tensor2d([100, 101, 102, 10000, 10001, 10002], [3, 2], 'float32');
        expect(function () { return gather_nd_1.gatherND(input, indices); }).toThrow();
    });
});
//# sourceMappingURL=gather_nd_test.js.map