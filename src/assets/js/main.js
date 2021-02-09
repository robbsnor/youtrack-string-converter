// dev

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    require("front-end-debug");
}

////
///
//


require('./smoothAnchorScroll')