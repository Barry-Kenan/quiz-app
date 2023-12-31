import CopyWebpackPlugin from 'copy-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import webpack, { HotModuleReplacementPlugin } from 'webpack';
import { BuildOptions } from './types/config';

export function buildPlugins({
	paths
}: BuildOptions): webpack.WebpackPluginInstance[] {
	return [
		new HtmlWebpackPlugin({
			template: paths.html
		}),
		new webpack.ProgressPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css'
		}),
		new HotModuleReplacementPlugin(),
		new ESLintPlugin({
			extensions: ['ts', 'tsx']
		}),
		new StylelintPlugin({
			extensions: ['scss', 'css']
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: paths.icon,
					to: paths.build
				}
			]
		})
	];
}
