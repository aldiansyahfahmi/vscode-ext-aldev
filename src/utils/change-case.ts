function pascalCase(inputString: string): string {
  return (
    inputString
      // Split the string into words using a regular expression that finds spaces, underscores, hyphens, and periods
      .split(/\s+|_+|-+|\./)
      // Map each word to ensure the first character is uppercase and the rest are lowercase
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      // Join the words back together without any spaces
      .join("")
  );
}

function snakeCase(inputString: string): string {
  return (
    inputString
      // Replace all occurrences of uppercase letters followed by lowercase letters with lowercase counterparts and prepend underscores
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
      .replace(/([a-z\d])([A-Z])/g, "$1_$2")
      // Replace spaces, hyphens, and periods with underscores
      .replace(/\s+|\.|-/g, "_")
      // Convert the entire string to lowercase
      .toLowerCase()
  );
}

function camelCase(inputString: string): string {
  return (
    inputString
      // Split the string into words using a regular expression that finds spaces, underscores, hyphens, and periods
      .split(/\s+|_+|-+|\./)
      // Process each word
      .map((word, index) =>
        // If it's the first word, make sure it's all lowercase
        index === 0
          ? word.toLowerCase()
          : // For subsequent words, capitalize the first letter and make the rest lowercase
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      // Join the words back together without any spaces
      .join("")
  );
}
