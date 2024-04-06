module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Main Colors
        'baby-blue': '#89cff0',
        'bleu-de-france': '#228be6',
        'jungle-green': '#29ab87',
        'mellow-yellow': '#f8de7e',
        'slate-gray': '#708090',
        'white-smoke': '#f5f5f5',

        // Accent Colors
        bubblegum: '#FF407D',
        gainsboro: '#dcdcdc',
        ink: '#27221f',
        silver: '#c0c0c0',
        zircon: '#e2e5e8',

        // Error and Correctness Colors
        'error-red': '#ff3333',
        'success-green': '#00cc00',

        // Additional  Colors
        peach: '#ffcc99',
        lavender: '#cc99ff',
        coral: '#ff6f61',
        mint: '#98ff98',
        goldenrod: '#daa520',
        violet: '#864AF9',
        eggplant: '#6420AA',
        magenta: '#910A67',
        'deep-magenta': '#720455',
        'border-magenta': '#662549',
      },
      screens: {
        xxs: '280px',
        xs: '320px',
      },
    },
  },
  plugins: [],
};
