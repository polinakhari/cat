'use strict';

  var gulp = require("gulp");
  var server = require("browser-sync").create();  
  var rename = require("gulp-rename");
  var plumber = require("gulp-plumber");
  var sourcemap = require("gulp-sourcemaps");

  var sass = require("gulp-sass"); 
  var postcss = require("gulp-postcss");
  var autoprefixer = require("autoprefixer");
  var csso = require("gulp-csso");

  var imagemin = require("gulp-imagemin");
  var webp = require("gulp-webp"); 

  var del = require("del"); 

  gulp.task("style", function () {
    return gulp.src("sass/style.scss") 
      .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(sass()) 
      .pipe(postcss([
        autoprefixer()
      ]))
      .pipe(csso())
      .pipe(rename("style.min.css"))
      .pipe(sourcemap.write("."))
      .pipe(gulp.dest("build/css"))
      .pipe(server.stream()); 
    });

  gulp.task("images", function () {      
    return gulp.src("img/**/*.{jpg,svg}") 
    .pipe(imagemin([      
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()  
    ]))
      .pipe(gulp.dest("build/img"));        
    });

  gulp.task("webp", function () {
    return gulp.src("img/**/*.{png,jpg}") 
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img")); 
  });
  
  gulp.task("server", function () { 
    server.init({
      server: "build/" 
    });
    gulp.watch("sass/**/*.{sass,scss}", gulp.series("style"));
    gulp.watch("*.html").on("change", server.reload);
  });

  gulp.task("copy", function () {
    return gulp.src([
      "fonts/**/*.{woff,woff2}",
      "img/**",
      "js/**",
      "*.html"
    ], {
    base: "./"
    })
    .pipe(gulp.dest("build"));
   });

   gulp.task("clean", function () {
    return del("build");
   });

  gulp.task("build", gulp.series("clean", "copy", "images", "webp", "style"));
  gulp.task("start", gulp.series("build", "server"));


