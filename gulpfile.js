const { dest, parallel, series, src, watch } = require('gulp');
const gulpHtmlmin = require('gulp-htmlmin');
const gulpImagemin = require('gulp-imagemin');
const gulpJsonmin = require('gulp-jsonmin');
const gulpRename = require('gulp-rename');
const gulpSass = require('gulp-sass');
const { join } = require('path');

const DIST_DIR = join(__dirname, 'dist');
const STATIC_DIR = join(__dirname, 'static');

const IN_PATHS = {
	css: join(STATIC_DIR, '**', '*.{css,scss}'),
	fonts: join(STATIC_DIR, '**', '*.{eot,svg,ttf,woff,woff2}'),
	icons: join(STATIC_DIR, '**', '*.{ico,png}'),
	index: join(STATIC_DIR, 'index.html'),
	manifest: join(STATIC_DIR, 'manifest.json'),
};
const OUT_PATHS = {
	css: DIST_DIR,
	fonts: DIST_DIR,
	icons: DIST_DIR,
	index: DIST_DIR,
	manifest: DIST_DIR,
};

const buildCss = () => {
	return src(IN_PATHS.css)
		.pipe(gulpSass({ outputStyle: 'compressed' }))
		.pipe(gulpRename({ extname: '.css' }))
		.pipe(dest(OUT_PATHS.css));
};
const buildFonts = () => {
	return src(IN_PATHS.fonts)
		.pipe(dest(OUT_PATHS.fonts));
};
const buildIcons = () => {
	return src(IN_PATHS.icons)
		.pipe(gulpImagemin({ verbose: true }))
		.pipe(dest(OUT_PATHS.icons));
};
const buildIndex = () => {
	return src(IN_PATHS.index)
		.pipe(gulpHtmlmin({
			collapseWhitespace: true,
			removeAttributeQuotes: true,
			removeComments: true,
		}))
		.pipe(dest(OUT_PATHS.index));
};
const buildManifest = () => {
	return src(IN_PATHS.manifest)
		.pipe(gulpJsonmin({ verbose: true }))
		.pipe(dest(OUT_PATHS.manifest));
};

const watchCss = () => {
	watch(IN_PATHS.css, buildCss);
};
const watchFonts = () => {
	watch(IN_PATHS.fonts, buildFonts);
};
const watchIcons = () => {
	watch(IN_PATHS.icons, buildIcons);
};
const watchIndex = () => {
	watch(IN_PATHS.index, buildIndex);
};
const watchManifest = () => {
	watch(IN_PATHS.manifest, buildManifest);
};

module.exports = {
	build: series(buildCss, buildFonts, buildIcons, buildIndex, buildManifest),
	watch: parallel(watchCss, watchFonts, watchIcons, watchIndex, watchManifest),
};
