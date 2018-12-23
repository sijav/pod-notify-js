import typescript from 'rollup-plugin-typescript2';
import builtins from 'rollup-plugin-node-builtins';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { uglify } from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

const license = `/**
 * Pod Notify JS v0.0.1
 * =========
 * A compact, cross-browser solution for the Javascript Notifications API using Fanap's POD Async service (DIRANA)
 *
 * License
 * -------
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Tyler Nickerson
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */`;

export default [
	{
		input: './src/index.ts',
		output: {
			banner: license,
			format: 'umd',
			name: 'PodNotify',
			sourcemap: true,
			file: 'bin/pod-notify.js'
		},
		plugins: [
			resolve({ extensions: ['.js', '.ts'], preferBuiltins: true }),
			builtins(),
			typescript(),
			commonjs(),
			babel({ exclude: 'node_modules/**' }),
			json()
		]
	},
	{
		input: './src/index.ts',
		output: {
			banner: license,
			format: 'umd',
			name: 'PodNotify',
			sourcemap: true,
			file: 'bin/pod-notify.min.js'
		},
		plugins: [
			resolve({ extensions: ['.js', '.ts'], preferBuiltins: true }),
			builtins(),
			typescript(),
			commonjs(),
			babel({ exclude: 'node_modules/**' }),
			json(),
			uglify(
				{
					output: {
						beautify: false,
						preamble: license
					}
				},
				minify
			)
		]
	}
];
