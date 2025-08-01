#!/bin/bash

# Remove Tailwind CSS v4 and its PostCSS plugin
npm uninstall tailwindcss @tailwindcss/postcss

# Install Tailwind CSS v3
npm install -D tailwindcss@^3.4.1 postcss@^8.4.38 autoprefixer@^10.4.19

# Update postcss.config.js for v3
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# Update tailwind.config.js back to CommonJS
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# Restore the v3 import syntax in index.css
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

echo "Downgrade to Tailwind CSS v3 completed!"