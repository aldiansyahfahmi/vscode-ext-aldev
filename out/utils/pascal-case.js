"use strict";
function toPascalCase(inputString) {
    return (inputString
        // Split the string into words using a regular expression that finds spaces, underscores, hyphens, and periods
        .split(/\s+|_+|-+|\./)
        // Map each word to ensure the first character is uppercase and the rest are lowercase
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        // Join the words back together without any spaces
        .join(""));
}
//# sourceMappingURL=pascal-case.js.map