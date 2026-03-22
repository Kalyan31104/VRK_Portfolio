console.log("Hello from Node.js!");
console.log("Node version:", process.version);
console.log("CWD:", process.cwd());
console.log("Trying to require express...");
try {
  const express = require("express");
  console.log("Express loaded successfully");
} catch (err) {
  console.error("Failed to load express:", err.message);
}
console.log("Test complete");
