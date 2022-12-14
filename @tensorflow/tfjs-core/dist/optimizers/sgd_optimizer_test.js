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
jasmine_util_1.describeWithFlags('SGDOptimizer', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var learningRate, optimizer, x, numTensors, cost, expectedValue1, _a, _b, expectedValue2, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    learningRate = .1;
                    optimizer = tf.train.sgd(learningRate);
                    x = tf.scalar(4).variable();
                    numTensors = tf.memory().numTensors;
                    cost = optimizer.minimize(function () { return x.square(); }, /* returnCost */ true);
                    // Cost should be the only additional arrays.
                    expect(tf.memory().numTensors).toBe(numTensors + 1);
                    expectedValue1 = -2 * 4 * learningRate + 4;
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [expectedValue1]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cost.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [Math.pow(4, 2)]]);
                    cost.dispose();
                    numTensors = tf.memory().numTensors;
                    cost = optimizer.minimize(function () { return x.square(); }, /* returnCost */ false);
                    // There should be no new additional Tensors.
                    expect(tf.memory().numTensors).toBe(numTensors);
                    expectedValue2 = -2 * expectedValue1 * learningRate + expectedValue1;
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [expectedValue2]]);
                    expect(cost).toBe(null);
                    optimizer.dispose();
                    x.dispose();
                    // The only tensor remaining is the argument to variable().
                    expect(tf.memory().numTensors).toBe(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Set and get weights: empty', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, learningRate, optimizer1, weights, _a, optimizer2, _b, optimizer3, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    x = tf.scalar(4).variable();
                    learningRate = .1;
                    optimizer1 = tf.train.sgd(learningRate);
                    return [4 /*yield*/, optimizer1.getWeights()];
                case 1:
                    weights = _f.sent();
                    expect(optimizer1.iterations).toEqual(0);
                    optimizer1.minimize(function () { return x.square(); });
                    return [4 /*yield*/, optimizer1.getWeights()];
                case 2:
                    weights = _f.sent();
                    expect(optimizer1.iterations).toEqual(1);
                    expect(weights.length).toEqual(1);
                    expect(weights[0].name).toEqual('iter');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, weights[0].tensor.data()];
                case 3:
                    _a.apply(void 0, [_f.sent(), 1]);
                    optimizer2 = tf.train.sgd(learningRate);
                    return [4 /*yield*/, optimizer2.setWeights(weights)];
                case 4:
                    _f.sent();
                    optimizer2.minimize(function () { return x.square(); });
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 5:
                    _b.apply(void 0, [_f.sent(), 2.56]);
                    expect(optimizer2.iterations).toEqual(2);
                    optimizer3 = tf.train.sgd(learningRate);
                    _d = (_c = optimizer3).setWeights;
                    return [4 /*yield*/, optimizer2.getWeights()];
                case 6: return [4 /*yield*/, _d.apply(_c, [_f.sent()])];
                case 7:
                    _f.sent();
                    optimizer3.minimize(function () { return x.square(); });
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 8:
                    _e.apply(void 0, [_f.sent(), 2.048]);
                    expect(optimizer3.iterations).toEqual(3);
                    return [2 /*return*/];
            }
        });
    }); });
    it('serialization round-trip', function () {
        var learningRate = .1;
        var originalOpt = tf.train.sgd(learningRate);
        var reserialized = tf.SGDOptimizer.fromConfig(tf.SGDOptimizer, originalOpt.getConfig());
        expect(reserialized.getConfig()).toEqual(originalOpt.getConfig());
    });
});
//# sourceMappingURL=sgd_optimizer_test.js.map