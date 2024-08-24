import fs from 'fs'
import path from 'path'
import { globby } from 'globby'
import prettier from 'prettier'

// Get the slug of all static pages in our app.
// Get the slug of all dynamically generated pages (blogs etc) in our app.
// Create a sitemap.xml format file and loop over all these slugs and add the <url></url> tag to specify each slug.
// Format the output with prettier using HTML parser.
// Save the output inside the public folder as sitemap.xml

async function generateSiteMap() {
  const pages = await globby([
    'pages/*.(t|j)sx',
    '!pages/_*.(t|j)sx', // for _app.tsx and _document.tsx
    '!pages/[*.(t|j)sx', // for [...page].tsx and [[...page]].tsx
    '!pages/api',
    '!pages/404.(t|j)sx',
    '!pages/500.(t|j)sx',
  ])

  const getPostSlugs = async () => {
    const posts = await fs.promises.readdir('./_posts')
    return posts.map((post) => post.replace('.mdx', ''))
  }

  const postSlugs = await getPostSlugs()

  const siteMap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .concat(postSlugs)
  .map((page) => {
    const path = page
      .replace('pages/', '/')
      .replace('public/', '/')
      .replace('.tsx', '')
      .replace('.jsx', '')
      .replace('.mdx', '')
      .replace('.md', '')
      .replace('/rss.xml', '')
    const route = path === '/index' ? '' : path
    return `
            <url>
              <loc>${'https://www.bensch.ac'}/${route}</loc>
            </url>
          `
  })
  .join('')}
  </urlset>
  `

  const formattedSiteMap = await prettier.format(siteMap, {
    parser: 'html',
  })

  fs.writeFileSync('public/sitemap.xml', formattedSiteMap)
}

generateSiteMap()
