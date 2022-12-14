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
var kernel_names_1 = require("../../../kernel_names");
var non_max_suppression_impl_1 = require("../../non_max_suppression_impl");
var cpu_util_1 = require("../cpu_util");
exports.nonMaxSuppressionV5Config = {
    kernelName: kernel_names_1.NonMaxSuppressionV5,
    backendName: 'cpu',
    kernelFunc: function (_a) {
        var inputs = _a.inputs, backend = _a.backend, attrs = _a.attrs;
        var _b = inputs, boxes = _b.boxes, scores = _b.scores;
        var _c = attrs, maxOutputSize = _c.maxOutputSize, iouThreshold = _c.iouThreshold, scoreThreshold = _c.scoreThreshold, softNmsSigma = _c.softNmsSigma;
        var cpuBackend = backend;
        cpu_util_1.assertNotComplex(boxes, 'NonMaxSuppressionWithScore');
        var boxesVals = cpuBackend.data.get(boxes.dataId).values;
        var scoresVals = cpuBackend.data.get(scores.dataId).values;
        var maxOutputSizeVal = maxOutputSize;
        var iouThresholdVal = iouThreshold;
        var scoreThresholdVal = scoreThreshold;
        var softNmsSigmaVal = softNmsSigma;
        var _d = non_max_suppression_impl_1.nonMaxSuppressionV5(boxesVals, scoresVals, maxOutputSizeVal, iouThresholdVal, scoreThresholdVal, softNmsSigmaVal), selectedIndices = _d.selectedIndices, selectedScores = _d.selectedScores;
        return [selectedIndices, selectedScores];
    }
};
//# sourceMappingURL=NonMaxSuppressionV5.js.map