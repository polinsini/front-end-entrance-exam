import { defineConfig } from 'vite';
import { viteExternalsPlugin } from 'vite-plugin-externals';

export default defineConfig({
 
  plugins: [
    viteExternalsPlugin({
      jspdf: 'jsPDF',
      html2canvas: 'html2canvas',
    }),
  ],
});

