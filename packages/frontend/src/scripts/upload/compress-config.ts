/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import isAnimated from "is-file-animated";
import { isWebpSupported } from "./isWebpSupported";
import type { BrowserImageResizerConfig } from "browser-image-resizer";

const compressTypeMap = {
	"image/jpeg": { quality: 0.9, mimeType: "image/webp" },
	"image/png": { quality: 1, mimeType: "image/webp" },
	"image/webp": { quality: 0.9, mimeType: "image/webp" },
	"image/svg+xml": { quality: 1, mimeType: "image/webp" },
} as const;

const compressTypeMapFallback = {
	"image/jpeg": { quality: 0.85, mimeType: "image/jpeg" },
	"image/png": { quality: 1, mimeType: "image/png" },
	"image/webp": { quality: 0.85, mimeType: "image/jpeg" },
	"image/svg+xml": { quality: 1, mimeType: "image/png" },
} as const;

export async function getCompressionConfig(
	file: File,
): Promise<BrowserImageResizerConfig | undefined> {
	const imgConfig = (
		isWebpSupported() ? compressTypeMap : compressTypeMapFallback
	)[file.type];
	if (!imgConfig || (await isAnimated(file))) {
		return;
	}

	return {
		maxWidth: 2048,
		maxHeight: 2048,
		debug: true,
		...imgConfig,
	};
}
