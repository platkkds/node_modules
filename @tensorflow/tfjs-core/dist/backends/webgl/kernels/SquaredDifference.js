"use strict";
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
var environment_1 = require("../../../environment");
var kernel_names_1 = require("../../../kernel_names");
var binaryop_gpu_1 = require("../binaryop_gpu");
var binaryop_packed_gpu_1 = require("../binaryop_packed_gpu");
exports.squaredDifferenceConfig = {
    kernelName: kernel_names_1.SquaredDifference,
    backendName: 'webgl',
    kernelFunc: function (_a) {
        var inputs = _a.inputs, backend = _a.backend;
        var _b = inputs, a = _b.a, b = _b.b;
        var SQUARED_DIFFERENCE = 'return (a - b) * (a - b);';
        var webGLBackend = backend;
        var program = environment_1.env().getBool('WEBGL_PACK_BINARY_OPERATIONS') ?
            new binaryop_packed_gpu_1.BinaryOpPackedProgram(SQUARED_DIFFERENCE, a.shape, b.shape) :
            new binaryop_gpu_1.BinaryOpProgram(SQUARED_DIFFERENCE, a.shape, b.shape);
        return webGLBackend.compileAndRun(program, [a, b]);
    }
};
//# sourceMappingURL=SquaredDifference.js.map