module.exports = {
    // Purge unused styles in production to reduce file size
    purge: [
      './src/**/*.{js,jsx,ts,tsx}', // Look for class names in all JS, JSX, TS, and TSX files in the src directory
      './public/index.html'         // Also look for class names in the public/index.html file
    ],
    
    // Dark mode settings (can be 'false', 'media' or 'class')
    darkMode: 'media', // Update darkMode setting
  
    theme: {
      extend: {}, // Extend the default theme with custom settings (left empty here)
      
      // Custom breakpoints for responsive design
      screens: {
        'sm': '640px',  // Small screens (min-width: 640px)
        'md': '768px',  // Medium screens (min-width: 768px)
        'lg': '1024px', // Large screens (min-width: 1024px)
        'xl': '1280px', // Extra large screens (min-width: 1280px)
        '2xl': '1536px' // 2x extra large screens (min-width: 1536px)
      },
    },
    
    variants: {
      extend: {}, // Extend variants for additional utilities (left empty here)
    },
    
    plugins: [], // Add plugins to extend Tailwind CSS (left empty here)
  };  