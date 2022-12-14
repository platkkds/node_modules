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
var environment_1 = require("../../../environment");
var kernel_names_1 = require("../../../kernel_names");
var tex_util_1 = require("../tex_util");
var from_pixels_gpu_1 = require("./FromPixels_utils/from_pixels_gpu");
var from_pixels_packed_gpu_1 = require("./FromPixels_utils/from_pixels_packed_gpu");
exports.fromPixelsConfig = {
    kernelName: kernel_names_1.FromPixels,
    backendName: 'webgl',
    kernelFunc: fromPixels,
};
var fromPixels2DContext;
function fromPixels(args) {
    var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
    var pixels = inputs.pixels;
    var numChannels = attrs.numChannels;
    var isVideo = typeof (HTMLVideoElement) !== 'undefined' &&
        pixels instanceof HTMLVideoElement;
    var isImage = typeof (HTMLImageElement) !== 'undefined' &&
        pixels instanceof HTMLImageElement;
    var _a = isVideo ?
        [
            pixels.videoWidth,
            pixels.videoHeight
        ] :
        [pixels.width, pixels.height], width = _a[0], height = _a[1];
    var texShape = [height, width];
    var outShape = [height, width, numChannels];
    if (isImage || isVideo) {
        if (fromPixels2DContext == null) {
            fromPixels2DContext = document.createElement('canvas').getContext('2d');
        }
        fromPixels2DContext.canvas.width = width;
        fromPixels2DContext.canvas.height = height;
        fromPixels2DContext.drawImage(pixels, 0, 0, width, height);
        pixels = fromPixels2DContext.canvas;
    }
    var tempPixelHandle = backend.makeTensorInfo(texShape, 'int32');
    // This is a byte texture with pixels.
    backend.texData.get(tempPixelHandle.dataId).usage = tex_util_1.TextureUsage.PIXELS;
    backend.gpgpu.uploadPixelDataToTexture(backend.getTexture(tempPixelHandle.dataId), pixels);
    var program = environment_1.env().getBool('WEBGL_PACK') ?
        new from_pixels_packed_gpu_1.FromPixelsPackedProgram(outShape) :
        new from_pixels_gpu_1.FromPixelsProgram(outShape);
    var res = backend.runWebGLProgram(program, [tempPixelHandle], 'int32');
    backend.disposeData(tempPixelHandle.dataId);
    return res;
}
//# sourceMappingURL=FromPixels.js.map