import { defineConfig } from 'astro/config';
import rehypeInternalLinks from './src/plugins/rehype-internal-links.mjs';

export default defineConfig({
  site: 'https://pitch-atlas-lac.vercel.app',
  trailingSlash: 'never',
  build: { format: 'file' },
  markdown: { rehypePlugins: [rehypeInternalLinks] },
});
