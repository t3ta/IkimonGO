/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { StoryObj } from "@storybook/vue3";
import MkCustomEmoji from "./MkCustomEmoji.vue";
export const Default = {
	render(args) {
		return {
			components: {
				MkCustomEmoji,
			},
			setup() {
				return {
					args,
				};
			},
			computed: {
				props() {
					return {
						...this.args,
					};
				},
			},
			template: '<MkCustomEmoji v-bind="props" />',
		};
	},
	args: {
		name: "mi",
		url: "https://github.com/misskey-dev/misskey/blob/master/packages/frontend/assets/about-icon.png?raw=true",
	},
	parameters: {
		layout: "centered",
	},
} satisfies StoryObj<typeof MkCustomEmoji>;
export const Normal = {
	...Default,
	args: {
		...Default.args,
		normal: true,
	},
} satisfies StoryObj<typeof MkCustomEmoji>;
export const Missing = {
	...Default,
	args: {
		name: Default.args.name,
	},
} satisfies StoryObj<typeof MkCustomEmoji>;
