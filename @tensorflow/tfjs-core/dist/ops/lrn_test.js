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
var sqArr = function (arr) { return arr.map(function (d) { return d * d; }); };
var sumArr = function (arr) { return arr.reduce(function (prev, curr) { return prev + curr; }, 0); };
// tslint:disable-next-line:no-any
var flatten = function (arr) {
    // tslint:disable-next-line:no-any
    return arr.reduce(function (prev, curr) {
        return prev.concat(Array.isArray(curr) ? flatten(curr) : curr);
    }, []);
};
jasmine_util_1.describeWithFlags('localResponseNormalization with Tensor3D', jasmine_util_1.ALL_ENVS, function () {
    it('throws error with invalid input', function () {
        // tslint:disable-next-line:no-any
        var x = tf.tensor2d([1, 20, 300, 4], [1, 4]);
        var radius = 3;
        expect(function () { return x.localResponseNormalization(radius); }).toThrowError();
    });
    it('throws error with invalid radius', function () {
        var x = tf.tensor3d([1, 20, 300, 4], [1, 1, 4]);
        var radius = 0.5;
        expect(function () { return x.localResponseNormalization(radius); }).toThrowError();
    });
    it('computes simple normalization across channels', function () { return __awaiter(_this, void 0, void 0, function () {
        var xT, radius, bias, alpha, beta, result, f, x, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    xT = tf.tensor3d([1, 20, 300, 4], [1, 1, 4]);
                    radius = 1;
                    bias = 1;
                    alpha = 1;
                    beta = 0.5;
                    result = xT.localResponseNormalization(radius, bias, alpha, beta);
                    f = function () {
                        var vals = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            vals[_i] = arguments[_i];
                        }
                        return Math.pow(bias + alpha * sumArr(sqArr(vals)), -beta);
                    };
                    return [4 /*yield*/, xT.array()];
                case 1:
                    x = _b.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [
                            x[0][0][0] * f(x[0][0][0], x[0][0][1]),
                            x[0][0][1] * f(x[0][0][0], x[0][0][1], x[0][0][2]),
                            x[0][0][2] * f(x[0][0][1], x[0][0][2], x[0][0][3]),
                            x[0][0][3] * f(x[0][0][2], x[0][0][3]),
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('uses beta = 1.0 to test GPU optimization', function () { return __awaiter(_this, void 0, void 0, function () {
        var xT, radius, bias, alpha, beta, result, f, x, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    xT = tf.tensor3d([1, 20, 300, 4], [1, 1, 4]);
                    radius = 1;
                    bias = 1;
                    alpha = 1;
                    beta = 1.0;
                    result = xT.localResponseNormalization(radius, bias, alpha, beta);
                    f = function () {
                        var vals = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            vals[_i] = arguments[_i];
                        }
                        return Math.pow(bias + alpha * sumArr(sqArr(vals)), -beta);
                    };
                    return [4 /*yield*/, xT.array()];
                case 1:
                    x = _b.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [
                            x[0][0][0] * f(x[0][0][0], x[0][0][1]),
                            x[0][0][1] * f(x[0][0][0], x[0][0][1], x[0][0][2]),
                            x[0][0][2] * f(x[0][0][1], x[0][0][2], x[0][0][3]),
                            x[0][0][3] * f(x[0][0][2], x[0][0][3]),
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('uses beta = 0.75 to test GPU optimization', function () { return __awaiter(_this, void 0, void 0, function () {
        var xT, radius, bias, alpha, beta, result, f, x, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    xT = tf.tensor3d([1, 20, 300, 4], [1, 1, 4]);
                    radius = 1;
                    bias = 1;
                    alpha = 1;
                    beta = 0.75;
                    result = xT.localResponseNormalization(radius, bias, alpha, beta);
                    f = function () {
                        var vals = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            vals[_i] = arguments[_i];
                        }
                        return Math.pow(bias + alpha * sumArr(sqArr(vals)), -beta);
                    };
                    return [4 /*yield*/, xT.array()];
                case 1:
                    x = _b.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [
                            x[0][0][0] * f(x[0][0][0], x[0][0][1]),
                            x[0][0][1] * f(x[0][0][0], x[0][0][1], x[0][0][2]),
                            x[0][0][2] * f(x[0][0][1], x[0][0][2], x[0][0][3]),
                            x[0][0][3] * f(x[0][0][2], x[0][0][3]),
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('computes complex normalization across channels', function () { return __awaiter(_this, void 0, void 0, function () {
        var xT, radius, bias, alpha, beta, result, f, x, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    xT = tf.tensor3d([1, 20, 300, 4, 5, 15, 24, 200, 1, 20, 300, 4, 5, 15, 24, 200], [2, 2, 4]);
                    radius = 1;
                    bias = 1;
                    alpha = 1;
                    beta = 0.5;
                    result = xT.localResponseNormalization(radius, bias, alpha, beta);
                    f = function () {
                        var vals = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            vals[_i] = arguments[_i];
                        }
                        return Math.pow(bias + alpha * sumArr(sqArr(vals)), -beta);
                    };
                    return [4 /*yield*/, xT.array()];
                case 1:
                    x = _b.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [
                            // 1 - 4
                            x[0][0][0] * f(x[0][0][0], x[0][0][1]),
                            x[0][0][1] * f(x[0][0][0], x[0][0][1], x[0][0][2]),
                            x[0][0][2] * f(x[0][0][1], x[0][0][2], x[0][0][3]),
                            x[0][0][3] * f(x[0][0][2], x[0][0][3]),
                            // 1 - 4
                            x[0][1][0] * f(x[0][1][0], x[0][1][1]),
                            x[0][1][1] * f(x[0][1][0], x[0][1][1], x[0][1][2]),
                            x[0][1][2] * f(x[0][1][1], x[0][1][2], x[0][1][3]),
                            x[0][1][3] * f(x[0][1][2], x[0][1][3]),
                            // 1 - 4
                            x[1][0][0] * f(x[1][0][0], x[1][0][1]),
                            x[1][0][1] * f(x[1][0][0], x[1][0][1], x[1][0][2]),
                            x[1][0][2] * f(x[1][0][1], x[1][0][2], x[1][0][3]),
                            x[1][0][3] * f(x[1][0][2], x[1][0][3]),
                            // 1 - 4
                            x[1][1][0] * f(x[1][1][0], x[1][1][1]),
                            x[1][1][1] * f(x[1][1][0], x[1][1][1], x[1][1][2]),
                            x[1][1][2] * f(x[1][1][1], x[1][1][2], x[1][1][3]),
                            x[1][1][3] * f(x[1][1][2], x[1][1][3]),
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('yields same result as tensorflow', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, expected, x, radius, bias, alpha, beta, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = [
                        [
                            [
                                0.95782757, 0.12892687, 0.63624668, 0.70160735, 0.77376258,
                                0.54166114, 0.71172535, 0.65087497
                            ],
                            [
                                0.91872108, 0.38846886, 0.37847793, 0.50477624, 0.42154622,
                                0.43310916, 0.36253822, 0.07576156
                            ],
                            [
                                0.48662257, 0.4154036, 0.81704032, 0.91660416, 0.87671542, 0.64215934,
                                0.29933751, 0.90671134
                            ]
                        ],
                        [
                            [
                                0.6208992, 0.60847163, 0.41475761, 0.2127713, 0.65306914, 0.13923979,
                                0.32003641, 0.28183973
                            ],
                            [
                                0.04751575, 0.26870155, 0.45150304, 0.58678186, 0.99118924,
                                0.58878231, 0.30913198, 0.18836617
                            ],
                            [
                                0.16166461, 0.56322742, 0.67908955, 0.2269547, 0.38491273, 0.97113752,
                                0.51210916, 0.69430435
                            ]
                        ],
                        [
                            [
                                0.06625497, 0.13011181, 0.59202921, 0.88871598, 0.6366322, 0.47911358,
                                0.96530843, 0.74259472
                            ],
                            [
                                0.62660718, 0.0445286, 0.18430257, 0.76863647, 0.87511849, 0.53588808,
                                0.27980685, 0.30281997
                            ],
                            [
                                0.73987067, 0.91034842, 0.26241004, 0.72832751, 0.78974342,
                                0.50751543, 0.05434644, 0.8231523
                            ]
                        ]
                    ];
                    expected = [
                        [
                            [
                                0.62630326, 0.07662392, 0.34354961, 0.41885775, 0.42621866,
                                0.29751951, 0.42365381, 0.4364861
                            ],
                            [
                                0.62828875, 0.251122, 0.23605582, 0.36483878, 0.30624411, 0.32672295,
                                0.29576892, 0.06582346
                            ],
                            [
                                0.3376624, 0.24321821, 0.42558169, 0.46646208, 0.45103404, 0.32380751,
                                0.17021206, 0.59476018
                            ]
                        ],
                        [
                            [
                                0.44719055, 0.43318295, 0.26775005, 0.14921051, 0.49148726,
                                0.10764983, 0.25084552, 0.25714993
                            ],
                            [
                                0.04202608, 0.21094096, 0.27973703, 0.34166718, 0.57487047,
                                0.35158369, 0.19708875, 0.15495601
                            ],
                            [
                                0.12034657, 0.41341963, 0.47968671, 0.13278878, 0.22735766,
                                0.57154536, 0.30411762, 0.42352781
                            ]
                        ],
                        [
                            [
                                0.05656794, 0.08849642, 0.36951816, 0.53186077, 0.33065733,
                                0.24236222, 0.54666328, 0.45085984
                            ],
                            [
                                0.52425432, 0.03133496, 0.11043368, 0.46954039, 0.5271349, 0.31946796,
                                0.1876673, 0.25085902
                            ],
                            [
                                0.47316891, 0.5277527, 0.13831842, 0.40036613, 0.50113004, 0.28860986,
                                0.03395459, 0.59127772
                            ]
                        ]
                    ];
                    x = tf.tensor3d(flatten(input), [3, 3, 8]);
                    radius = 2;
                    bias = 1;
                    alpha = 1;
                    beta = 0.5;
                    result = x.localResponseNormalization(radius, bias, alpha, beta);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), flatten(expected)]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, radius, bias, alpha, beta, result, f, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = [[[1, 20, 300, 4]]];
                    radius = 1;
                    bias = 1;
                    alpha = 1;
                    beta = 0.5;
                    result = tf.localResponseNormalization(x, radius, bias, alpha, beta);
                    f = function () {
                        var vals = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            vals[_i] = arguments[_i];
                        }
                        return Math.pow(bias + alpha * sumArr(sqArr(vals)), -beta);
                    };
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            x[0][0][0] * f(x[0][0][0], x[0][0][1]),
                            x[0][0][1] * f(x[0][0][0], x[0][0][1], x[0][0][2]),
                            x[0][0][2] * f(x[0][0][1], x[0][0][2], x[0][0][3]),
                            x[0][0][3] * f(x[0][0][2], x[0][0][3]),
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('localResponseNormalization with Tensor4D', jasmine_util_1.ALL_ENVS, function () {
    it('throws error with invalid input', function () {
        // tslint:disable-next-line:no-any
        var x = tf.tensor2d([1, 20, 300, 4], [1, 4]);
        var radius = 3;
        expect(function () { return x.localResponseNormalization(radius); }).toThrowError();
    });
    it('throws error with invalid radius', function () {
        var x = tf.tensor4d([1, 20, 300, 4], [1, 1, 1, 4]);
        var radius = 0.5;
        expect(function () { return x.localResponseNormalization(radius); }).toThrowError();
    });
    it('computes simple normalization across channels', function () { return __awaiter(_this, void 0, void 0, function () {
        var xT, radius, bias, alpha, beta, result, f, b0, b1, x, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    xT = tf.tensor4d([1, 20, 300, 4, 1, 20, 300, 4], [2, 1, 1, 4]);
                    radius = 1;
                    bias = 1;
                    alpha = 1;
                    beta = 0.5;
                    result = xT.localResponseNormalization(radius, bias, alpha, beta);
                    f = function () {
                        var vals = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            vals[_i] = arguments[_i];
                        }
                        return Math.pow(bias + alpha * sumArr(sqArr(vals)), -beta);
                    };
                    b0 = 0;
                    b1 = 1;
                    return [4 /*yield*/, xT.array()];
                case 1:
                    x = _b.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [
                            x[b0][0][0][0] * f(x[b0][0][0][0], x[b0][0][0][1]),
                            x[b0][0][0][1] * f(x[b0][0][0][0], x[b0][0][0][1], x[b0][0][0][2]),
                            x[b0][0][0][2] * f(x[b0][0][0][1], x[b0][0][0][2], x[b0][0][0][3]),
                            x[b0][0][0][3] * f(x[b0][0][0][2], x[b0][0][0][3]),
                            x[b1][0][0][0] * f(x[b1][0][0][0], x[b1][0][0][1]),
                            x[b1][0][0][1] * f(x[b1][0][0][0], x[b1][0][0][1], x[b1][0][0][2]),
                            x[b1][0][0][2] * f(x[b1][0][0][1], x[b1][0][0][2], x[b1][0][0][3]),
                            x[b1][0][0][3] * f(x[b1][0][0][2], x[b1][0][0][3]),
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('yields same result as tensorflow', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, expected, x, radius, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = [
                        [
                            [
                                [
                                    0.5659827, 0.57000327, 0.75555623, 0.89843333, 0.55120194,
                                    0.53531718, 0.56402838, 0.95481384
                                ],
                                [
                                    0.57334661, 0.65172958, 0.75794137, 0.80764937, 0.376616,
                                    0.92726362, 0.36422753, 0.60535395
                                ],
                                [
                                    0.82404268, 0.01054764, 0.4649173, 0.91637003, 0.82287347, 0.043468,
                                    0.44953859, 0.92056584
                                ]
                            ],
                            [
                                [
                                    0.68583369, 0.52534163, 0.53325927, 0.39608097, 0.9337523,
                                    0.37397444, 0.81212556, 0.5697
                                ],
                                [
                                    0.34278774, 0.57656682, 0.2356832, 0.02636456, 0.49111438,
                                    0.17981696, 0.65398049, 0.70132935
                                ],
                                [
                                    0.14241767, 0.68376505, 0.65419888, 0.69369483, 0.21489143,
                                    0.46235347, 0.0559243, 0.60612857
                                ]
                            ],
                            [
                                [
                                    0.59678483, 0.09368539, 0.3017447, 0.36870825, 0.68145788,
                                    0.52048779, 0.46136606, 0.94114387
                                ],
                                [
                                    0.3156569, 0.75275254, 0.31970251, 0.3154043, 0.61088014,
                                    0.13359487, 0.99048364, 0.33625424
                                ],
                                [
                                    0.82103574, 0.52066624, 0.63629258, 0.42294252, 0.93214262,
                                    0.57041013, 0.66087878, 0.7019999
                                ]
                            ]
                        ],
                        [
                            [
                                [
                                    0.21894431, 0.43085241, 0.79883206, 0.19462204, 0.68623316,
                                    0.08703053, 0.82380795, 0.85634673
                                ],
                                [
                                    0.45011401, 0.70312083, 0.86319792, 0.83205295, 0.67109787,
                                    0.82081223, 0.46556532, 0.46408331
                                ],
                                [
                                    0.07028461, 0.0038743, 0.44619524, 0.0611403, 0.96373355,
                                    0.80561554, 0.42428243, 0.46897113
                                ]
                            ],
                            [
                                [
                                    0.21006894, 0.48764861, 0.36842632, 0.23030031, 0.69685507,
                                    0.31707478, 0.68662715, 0.0639503
                                ],
                                [
                                    0.53940296, 0.50777435, 0.12625301, 0.12324154, 0.89205229,
                                    0.69380629, 0.33191144, 0.81000078
                                ],
                                [
                                    0.52650976, 0.71220326, 0.07246161, 0.08874547, 0.42528927,
                                    0.36320579, 0.54055619, 0.79342318
                                ]
                            ],
                            [
                                [
                                    0.75916636, 0.74499428, 0.76877356, 0.87210917, 0.93040991,
                                    0.49491942, 0.70801985, 0.14901721
                                ],
                                [
                                    0.27037835, 0.89302075, 0.69147241, 0.23044991, 0.98916364,
                                    0.60161841, 0.63691151, 0.56759977
                                ],
                                [
                                    0.56307781, 0.92782414, 0.25880754, 0.98518133, 0.04097319,
                                    0.24640906, 0.54566145, 0.99261606
                                ]
                            ]
                        ]
                    ];
                    expected = [
                        [
                            [
                                [
                                    0.38019636, 0.32782161, 0.414222, 0.49507114, 0.3040463, 0.28107059,
                                    0.33586296, 0.60191077
                                ],
                                [
                                    0.37577698, 0.37752095, 0.42895618, 0.4225589, 0.2054275,
                                    0.52219951, 0.23032214, 0.39414096
                                ],
                                [
                                    0.59856331, 0.00637784, 0.25168711, 0.5541048, 0.48015645,
                                    0.02301128, 0.27214608, 0.6427291
                                ]
                            ],
                            [
                                [
                                    0.48127589, 0.35518789, 0.30486941, 0.23976389, 0.52926594,
                                    0.21061926, 0.46920502, 0.39090639
                                ],
                                [
                                    0.27937523, 0.46979892, 0.17829391, 0.02044933, 0.37045884,
                                    0.12140442, 0.44160855, 0.50198948
                                ],
                                [
                                    0.10289387, 0.44164398, 0.41853485, 0.42720893, 0.14580171,
                                    0.31817055, 0.043797, 0.48155668
                                ]
                            ],
                            [
                                [
                                    0.49458414, 0.07425242, 0.21042404, 0.26262277, 0.46205613,
                                    0.30202535, 0.27406475, 0.61140078
                                ],
                                [
                                    0.23736385, 0.55076694, 0.2135559, 0.21463785, 0.38077739,
                                    0.08309806, 0.62830603, 0.23137885
                                ],
                                [
                                    0.5355776, 0.32740855, 0.3451882, 0.24221195, 0.51988536,
                                    0.31387195, 0.37391993, 0.46748781
                                ]
                            ]
                        ],
                        [
                            [
                                [
                                    0.16003507, 0.31178808, 0.51775187, 0.12722474, 0.40769571,
                                    0.05085804, 0.48455271, 0.5505302
                                ],
                                [
                                    0.2880325, 0.39714804, 0.45591024, 0.4131493, 0.34525412, 0.4554069,
                                    0.29119283, 0.31980222
                                ],
                                [
                                    0.0640529, 0.00352532, 0.3052578, 0.03666528, 0.56009793,
                                    0.46656418, 0.24587312, 0.32762629
                                ]
                            ],
                            [
                                [
                                    0.17643087, 0.40210918, 0.2634095, 0.16233148, 0.4649446,
                                    0.21803913, 0.47819966, 0.05093931
                                ],
                                [
                                    0.43121469, 0.403974, 0.08191212, 0.07693455, 0.57362044,
                                    0.39671475, 0.19025819, 0.54028469
                                ],
                                [
                                    0.39356521, 0.53120333, 0.05151648, 0.06554616, 0.33433318,
                                    0.2425479, 0.36161765, 0.5536595
                                ]
                            ],
                            [
                                [
                                    0.46011236, 0.39919043, 0.36865807, 0.43511948, 0.46734285,
                                    0.26861796, 0.43624333, 0.11205748
                                ],
                                [
                                    0.17642327, 0.57622254, 0.37609601, 0.12030836, 0.54640025,
                                    0.34052721, 0.36361033, 0.3926385
                                ],
                                [
                                    0.37581176, 0.51741964, 0.14429154, 0.57254595, 0.02646073,
                                    0.13531584, 0.35629693, 0.64837402
                                ]
                            ]
                        ]
                    ];
                    x = tf.tensor4d(flatten(input), [2, 3, 3, 8]);
                    radius = 2;
                    result = x.localResponseNormalization(radius);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), flatten(expected)]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('yields same result as tensorflow with inner most dims of odd shape', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, expected, x, radius, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = [[
                            [
                                [0.08576167, 0.5713569, 0.10008252],
                                [0.9822943, 0.11068773, 0.5733849],
                                [0.52175903, 0.7347398, 0.760726], [0.7118578, 0.3927865, 0.7521831],
                                [0.849753, 0.43948555, 0.42316127]
                            ],
                            [
                                [0.5843748, 0.27483034, 0.45537806],
                                [0.91386235, 0.56130767, 0.2968701],
                                [0.37907827, 0.11928034, 0.32693362],
                                [0.8294349, 0.9177762, 0.01197743],
                                [0.44460166, 0.22238493, 0.93720853]
                            ],
                            [
                                [0.12325168, 0.62378526, 0.6220398],
                                [0.9955342, 0.8281578, 0.9977399],
                                [0.78915524, 0.48492992, 0.70430815],
                                [0.856709, 0.91682327, 0.53920233],
                                [0.9217057, 0.32411182, 0.16391528]
                            ],
                            [
                                [0.3235209, 0.43057775, 0.5644517],
                                [0.93911314, 0.09265935, 0.05458856],
                                [0.06284857, 0.6895604, 0.88354754],
                                [0.32220483, 0.72595966, 0.3620714],
                                [0.15844965, 0.931878, 0.8501971]
                            ],
                            [
                                [0.07301581, 0.7518866, 0.40925968],
                                [0.82419384, 0.40474093, 0.53465044],
                                [0.34532738, 0.21671772, 0.50855494],
                                [0.04778886, 0.7952956, 0.64908195],
                                [0.8807392, 0.09571135, 0.7910882]
                            ]
                        ]];
                    expected = [[
                            [
                                [0.07398141, 0.4928751, 0.08633514],
                                [0.6468731, 0.07289152, 0.37759283],
                                [0.33744285, 0.4751862, 0.49199253],
                                [0.4770374, 0.2632181, 0.50406057],
                                [0.58718365, 0.30368677, 0.2924066]
                            ],
                            [
                                [0.45850667, 0.21563481, 0.35729447],
                                [0.6108259, 0.37517825, 0.19842808],
                                [0.3370665, 0.10606097, 0.29070085],
                                [0.52141804, 0.5769532, 0.00752952],
                                [0.30495936, 0.15253738, 0.6428463]
                            ],
                            [
                                [0.09209093, 0.46607855, 0.4647744],
                                [0.51949346, 0.43215245, 0.5206444],
                                [0.5143535, 0.31606635, 0.45905212],
                                [0.50611794, 0.54163164, 0.31854454],
                                [0.65478665, 0.23025146, 0.11644664]
                            ],
                            [
                                [0.25507566, 0.3394832, 0.4450343],
                                [0.68247277, 0.06733745, 0.03967063],
                                [0.04180532, 0.45867857, 0.587714],
                                [0.24273802, 0.546913, 0.27277213], [0.097959, 0.5761189, 0.525621]
                            ],
                            [
                                [0.05538246, 0.57030565, 0.31042328],
                                [0.56486595, 0.27739152, 0.36642575],
                                [0.2892991, 0.18155594, 0.42604348],
                                [0.03332775, 0.55463576, 0.452667],
                                [0.56725365, 0.06164437, 0.50951254]
                            ]
                        ]];
                    x = tf.tensor4d(input, [1, 5, 5, 3]);
                    radius = 2;
                    result = x.localResponseNormalization(radius);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), flatten(expected)]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        var e = /Argument 'x' passed to 'localResponseNormalization' must be a Tensor/;
        expect(function () { return tf.localResponseNormalization({}); })
            .toThrowError(e);
    });
    it('gradient with 3D input', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, expected, radius, bias, alpha, beta, t, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = [
                        [
                            [
                                0.95782757, 0.12892687, 0.63624668, 0.70160735, 0.77376258,
                                0.54166114, 0.71172535, 0.65087497
                            ],
                            [
                                0.91872108, 0.38846886, 0.37847793, 0.50477624, 0.42154622,
                                0.43310916, 0.36253822, 0.07576156
                            ],
                            [
                                0.48662257, 0.4154036, 0.81704032, 0.91660416, 0.87671542, 0.64215934,
                                0.29933751, 0.90671134
                            ]
                        ],
                        [
                            [
                                0.6208992, 0.60847163, 0.41475761, 0.2127713, 0.65306914, 0.13923979,
                                0.32003641, 0.28183973
                            ],
                            [
                                0.04751575, 0.26870155, 0.45150304, 0.58678186, 0.99118924,
                                0.58878231, 0.30913198, 0.18836617
                            ],
                            [
                                0.16166461, 0.56322742, 0.67908955, 0.2269547, 0.38491273, 0.97113752,
                                0.51210916, 0.69430435
                            ]
                        ],
                        [
                            [
                                0.06625497, 0.13011181, 0.59202921, 0.88871598, 0.6366322, 0.47911358,
                                0.96530843, 0.74259472
                            ],
                            [
                                0.62660718, 0.0445286, 0.18430257, 0.76863647, 0.87511849, 0.53588808,
                                0.27980685, 0.30281997
                            ],
                            [
                                0.73987067, 0.91034842, 0.26241004, 0.72832751, 0.78974342,
                                0.50751543, 0.05434644, 0.8231523
                            ]
                        ]
                    ];
                    expected = [[
                            [
                                [
                                    0.27552658, 0.52414668, 0.11137494, 0.24928074, 0.07215497,
                                    0.16210511, 0.19277242, 0.38672262
                                ],
                                [
                                    0.23314378, 0.38181645, 0.30470729, 0.35180706, 0.37793165,
                                    0.41450983, 0.60044503, 0.83605933
                                ],
                                [
                                    0.51801264, 0.38517883, 0.02934788, 0.03102355, 0.08222333,
                                    0.09746625, 0.4151727, 0.29936206
                                ]
                            ],
                            [
                                [
                                    0.37059873, 0.32463685, 0.26611608, 0.54228389, 0.30733055,
                                    0.66392428, 0.55629295, 0.79049641
                                ],
                                [
                                    0.87162501, 0.68129337, 0.35793597, 0.18797961, -0.03660985,
                                    0.23235559, 0.48184156, 0.76417446
                                ],
                                [
                                    0.65893668, 0.41059417, 0.26254228, 0.40696776, 0.3330358, 0.01789692,
                                    0.3162199, 0.28867012
                                ]
                            ],
                            [
                                [
                                    0.83880937, 0.62594998, 0.324698, 0.13046435, 0.09858654, 0.17851587,
                                    0.09067203, 0.30748016
                                ],
                                [
                                    0.57213897, 0.67710453, 0.45385274, 0.19951296, 0.07371041,
                                    0.20141563, 0.51362634, 0.7163325
                                ],
                                [
                                    0.33668244, 0.09696329, 0.33500126, 0.08948036, 0.26512182,
                                    0.19593786, 0.59144169, 0.379444
                                ]
                            ]
                        ]];
                    radius = 2.0;
                    bias = 1.0;
                    alpha = 1.0;
                    beta = 0.5;
                    t = tf.tensor3d(input);
                    dy = tf.onesLike(t);
                    gradients = tf.grad(function (t) {
                        return tf.localResponseNormalization(t, radius, bias, alpha, beta);
                    })(t, dy);
                    test_util_1.expectArraysEqual(gradients.shape, t.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), flatten(expected)]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () {
        var t = tf.zeros([3, 3, 8]);
        var radius = 2.0;
        var bias = 1.0;
        var alpha = 1.0;
        var beta = 0.5;
        var dt = tf.grad(function (t) {
            return tf.localResponseNormalization(t.clone(), radius, bias, alpha, beta)
                .clone();
        })(t);
        test_util_1.expectArraysEqual(dt.shape, t.shape);
    });
    it('gradient with 4D input', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dyVals, depthRadius, bias, alpha, beta, expected, t, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = [
                        [
                            [
                                [
                                    0.5659827, 0.57000327, 0.75555623, 0.89843333, 0.55120194,
                                    0.53531718, 0.56402838, 0.95481384
                                ],
                                [
                                    0.57334661, 0.65172958, 0.75794137, 0.80764937, 0.376616,
                                    0.92726362, 0.36422753, 0.60535395
                                ],
                                [
                                    0.82404268, 0.01054764, 0.4649173, 0.91637003, 0.82287347, 0.043468,
                                    0.44953859, 0.92056584
                                ]
                            ],
                            [
                                [
                                    0.68583369, 0.52534163, 0.53325927, 0.39608097, 0.9337523,
                                    0.37397444, 0.81212556, 0.5697
                                ],
                                [
                                    0.34278774, 0.57656682, 0.2356832, 0.02636456, 0.49111438,
                                    0.17981696, 0.65398049, 0.70132935
                                ],
                                [
                                    0.14241767, 0.68376505, 0.65419888, 0.69369483, 0.21489143,
                                    0.46235347, 0.0559243, 0.60612857
                                ]
                            ],
                            [
                                [
                                    0.59678483, 0.09368539, 0.3017447, 0.36870825, 0.68145788,
                                    0.52048779, 0.46136606, 0.94114387
                                ],
                                [
                                    0.3156569, 0.75275254, 0.31970251, 0.3154043, 0.61088014,
                                    0.13359487, 0.99048364, 0.33625424
                                ],
                                [
                                    0.82103574, 0.52066624, 0.63629258, 0.42294252, 0.93214262,
                                    0.57041013, 0.66087878, 0.7019999
                                ]
                            ]
                        ],
                        [
                            [
                                [
                                    0.21894431, 0.43085241, 0.79883206, 0.19462204, 0.68623316,
                                    0.08703053, 0.82380795, 0.85634673
                                ],
                                [
                                    0.45011401, 0.70312083, 0.86319792, 0.83205295, 0.67109787,
                                    0.82081223, 0.46556532, 0.46408331
                                ],
                                [
                                    0.07028461, 0.0038743, 0.44619524, 0.0611403, 0.96373355,
                                    0.80561554, 0.42428243, 0.46897113
                                ]
                            ],
                            [
                                [
                                    0.21006894, 0.48764861, 0.36842632, 0.23030031, 0.69685507,
                                    0.31707478, 0.68662715, 0.0639503
                                ],
                                [
                                    0.53940296, 0.50777435, 0.12625301, 0.12324154, 0.89205229,
                                    0.69380629, 0.33191144, 0.81000078
                                ],
                                [
                                    0.52650976, 0.71220326, 0.07246161, 0.08874547, 0.42528927,
                                    0.36320579, 0.54055619, 0.79342318
                                ]
                            ],
                            [
                                [
                                    0.75916636, 0.74499428, 0.76877356, 0.87210917, 0.93040991,
                                    0.49491942, 0.70801985, 0.14901721
                                ],
                                [
                                    0.27037835, 0.89302075, 0.69147241, 0.23044991, 0.98916364,
                                    0.60161841, 0.63691151, 0.56759977
                                ],
                                [
                                    0.56307781, 0.92782414, 0.25880754, 0.98518133, 0.04097319,
                                    0.24640906, 0.54566145, 0.99261606
                                ]
                            ]
                        ]
                    ];
                    dyVals = [
                        [
                            [
                                [
                                    1.40394282, -1.68962789, -0.21134049, 1.15015793, 1.51244378,
                                    0.42844626, -2.70123291, 0.06449971
                                ],
                                [
                                    -0.29038581, 0.67567694, 0.95617437, -1.07383668, 0.20920482,
                                    0.39050213, -0.81124371, 2.42158198
                                ],
                                [
                                    -1.01235235, -0.63514435, -1.49017262, -0.01205151, 0.78492945,
                                    -0.20330679, -2.31419802, -0.31220308
                                ]
                            ],
                            [
                                [
                                    0.07061944, -0.46716127, 0.91232526, -1.30444264, -0.07080109,
                                    0.13207501, 0.26701283, -0.48946589
                                ],
                                [
                                    -0.74995744, -0.79466617, -1.03790498, -0.32234526, 1.33345711,
                                    0.11863081, 1.93010819, 0.47857195
                                ],
                                [
                                    0.37702683, -0.7804451, 0.45868117, 1.06967258, -0.65336537,
                                    0.3594887, 0.62512684, 0.77009726
                                ]
                            ],
                            [
                                [
                                    0.76865023, 1.00893021, -0.24408816, -0.3943336, 0.47094285,
                                    -2.61926222, 1.52929449, 0.7862013
                                ],
                                [
                                    -1.20878386, -0.26222935, -0.9076528, 0.03079577, -0.01467486,
                                    -0.06949636, 0.05466342, 1.44880533
                                ],
                                [
                                    0.05611863, 0.15142779, 0.7802065, -1.2623471, 0.09119794,
                                    -0.20110528, 0.17715968, -0.48476508
                                ]
                            ]
                        ],
                        [
                            [
                                [
                                    0.1549256, 0.94472402, -0.70033115, -1.05752802, -0.63035947,
                                    -1.35643113, -0.27211693, 2.33576941
                                ],
                                [
                                    0.81070906, -0.58353454, -0.3253817, 2.53953528, -1.40062141,
                                    1.7728076, -0.59849483, 1.49650824
                                ],
                                [
                                    -0.00610052, -2.29434419, -1.77995121, -0.66354084, -0.70676774,
                                    -0.81570011, -1.30821037, 0.40997007
                                ]
                            ],
                            [
                                [
                                    -1.02013469, -0.74198806, -0.82677251, -0.00890179, -1.62196338,
                                    -0.5095427, 1.26501179, 0.12931485
                                ],
                                [
                                    -1.14763546, 0.11011696, -0.23312508, 0.29730096, -0.49138394,
                                    -0.27012363, -0.15987533, -1.84277928
                                ],
                                [
                                    -0.03816459, -0.73517877, -2.00476885, 0.47192496, -0.27395752,
                                    0.99806124, 1.54439747, -1.02016675
                                ]
                            ],
                            [
                                [
                                    -1.27831209, -0.6961385, -0.73713994, -1.97954738, 0.39108652,
                                    -0.46152538, 1.8255372, 2.18119025
                                ],
                                [
                                    0.56322283, -1.59858179, 1.54127491, -0.57665956, -1.0098567,
                                    0.93239671, 0.25231698, -0.7346009
                                ],
                                [
                                    0.41614994, -1.20103085, 0.4330301, -1.23348403, -0.46117213,
                                    -0.3780126, 0.35449561, -0.60129249
                                ]
                            ]
                        ]
                    ];
                    depthRadius = 1;
                    bias = 1;
                    alpha = 1;
                    beta = 0.75;
                    expected = [
                        [
                            [
                                [
                                    0.88732064, -0.98597342, -0.00569269, 0.09561057, 0.42255375,
                                    0.30286378, -1.17104781, 0.44769961
                                ],
                                [
                                    -0.22329885, 0.19271846, 0.41454071, -0.50674957, 0.14660946,
                                    0.1591837, -0.83707076, 1.19177234
                                ],
                                [
                                    -0.26728818, -0.3847312, -0.72818488, 0.09040837, 0.24023688,
                                    -0.11545581, -1.09341288, 0.33930668
                                ]
                            ],
                            [
                                [
                                    0.10079086, -0.38184536, 0.60918945, -0.7267822, 0.13867335,
                                    0.03526202, 0.17270499, -0.2705338
                                ],
                                [
                                    -0.38344458, -0.15589149, -0.68160093, -0.27644777, 0.79392856,
                                    -0.14384332, 0.67121017, -0.23130262
                                ],
                                [
                                    0.31069142, -0.39895257, 0.11755499, 0.39481708, -0.5234766,
                                    0.2511853, 0.40955079, 0.3492966
                                ]
                            ],
                            [
                                [
                                    0.32660595, 0.7240563, -0.18117335, -0.2649861, 0.67781603,
                                    -1.46250272, 0.8465963, -0.05466701
                                ],
                                [
                                    -0.71582067, 0.20831716, -0.50778204, 0.07256755, -0.00893679,
                                    -0.03798783, -0.18604305, 0.75747406
                                ],
                                [
                                    -0.00540833, -0.07677216, 0.41930205, -0.69235319, 0.20631291,
                                    -0.11946303, 0.19601521, -0.21237698
                                ]
                            ]
                        ],
                        [
                            [
                                [
                                    0.0800111, 0.60922205, -0.31155977, -0.46448132, -0.15912701,
                                    -0.72455585, -0.5727275, 0.71780092
                                ],
                                [
                                    0.50568235, -0.31544152, -0.40618286, 0.97909468, -1.15286613,
                                    0.8145386, -0.77758539, 0.93794745
                                ],
                                [
                                    -0.00535599, -1.99269259, -1.15343952, -0.31053686, 0.01680636,
                                    0.10109296, -0.66026396, 0.35474917
                                ]
                            ],
                            [
                                [
                                    -0.74113333, -0.20625943, -0.4339568, 0.21517368, -0.5734458,
                                    -0.23481363, 0.53855389, 0.05860626
                                ],
                                [
                                    -0.61435795, 0.29290834, -0.19639145, 0.20930134, -0.08880179,
                                    0.02209887, 0.21427482, -0.51696646
                                ],
                                [
                                    0.13036536, -0.19079237, -1.43941545, 0.42789665, -0.29732707,
                                    0.52354813, 0.78893, -0.59992862
                                ]
                            ],
                            [
                                [
                                    -0.328383, 0.15830949, 0.13110149, -0.492423, 0.46827313,
                                    -0.58950633, 0.56422544, 1.44929576
                                ],
                                [
                                    0.46141064, -0.80682266, 0.92562175, -0.28897452, -0.30567497,
                                    0.50646484, 0.16439518, -0.38878182
                                ],
                                [
                                    0.41004074, -0.38593128, 0.42881966, -0.22443436, -0.24573228,
                                    -0.2941249, 0.31119603, -0.17903978
                                ]
                            ]
                        ]
                    ];
                    t = tf.tensor(input);
                    dy = tf.tensor(dyVals);
                    gradients = tf.grad(function (t) { return tf.localResponseNormalization(t, depthRadius, bias, alpha, beta); })(t, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), flatten(expected)]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=lrn_test.js.map