/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
import { NamedTensorInfoMap } from './kernel_registry';
import { PixelData } from './types';
export declare const SquaredDifference = "SquaredDifference";
export declare type SquaredDifferenceInputs = Pick<NamedTensorInfoMap, 'a' | 'b'>;
export declare const Square = "Square";
export declare type SquareInputs = Pick<NamedTensorInfoMap, 'x'>;
export declare const NonMaxSuppressionV5 = "NonMaxSuppressionV5";
export declare type NonMaxSuppressionV5Inputs = Pick<NamedTensorInfoMap, 'boxes' | 'scores'>;
export interface NonMaxSuppressionV5Attrs {
    maxOutputSize: number;
    iouThreshold: number;
    scoreThreshold: number;
    softNmsSigma: number;
}
/**
 * TensorFlow.js-only kernels
 */
export declare const FromPixels = "FromPixels";
export interface FromPixelsInputs {
    pixels: PixelData | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
}
export interface FromPixelsAttrs {
    numChannels: number;
}
