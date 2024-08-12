import fs from 'fs'
import RSS from 'rss'
import { getAllPosts } from 'posts'

export default async function generateRssFeed() {
  const site_url =
    process.env.NODE_ENV === 'production' ? 'http://bensch.ac' : 'http://localhost:3000'

  const feedOptions = {
    title: "bensch.ac's blog | RSS Feed",
    description: 'posts on engineering, design, and more',
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/logo.jpeg`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  }

  const feed = new RSS(feedOptions)
  try {
    const posts = await getAllPosts()
    posts.map((post) => {
      feed.item({
        title: post.source.frontmatter.title as string,
        description: post.source.frontmatter.description as string,
        url: `${site_url}/blog/${post.source.frontmatter.slug}`,
        date: post.source.frontmatter.date as string,
      })
    })
  } catch (e) {}

  // Write the RSS feed to a file as XML.
  fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }))
}
