"use strict";
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
function getVecChannels(name, rank) {
    return ['x', 'y', 'z', 'w', 'u', 'v'].slice(0, rank).map(function (d) { return name + "." + d; });
}
exports.getVecChannels = getVecChannels;
function getChannels(name, rank) {
    if (rank === 1) {
        return [name];
    }
    return getVecChannels(name, rank);
}
exports.getChannels = getChannels;
function getSourceCoords(rank, dims) {
    if (rank === 1) {
        return 'rc';
    }
    var coords = '';
    for (var i = 0; i < rank; i++) {
        coords += dims[i];
        if (i < rank - 1) {
            coords += ',';
        }
    }
    return coords;
}
exports.getSourceCoords = getSourceCoords;
//# sourceMappingURL=packing_util.js.map