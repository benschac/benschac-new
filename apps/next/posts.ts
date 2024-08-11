import fs from 'node:fs'
// import matter from 'gray-matter'
import { join } from 'node:path'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
export type Author = {
  name: string
  picture: string
}

export type Post = {
  slug: string
  title: string
  date: string
  coverImage: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
  preview?: boolean
}

const postsDirectory = join(`${process.cwd()}`, '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const mdxSource = await serialize(fileContents, { parseFrontmatter: true })
  return { source: mdxSource }
}

export async function getAllPosts() {
  const slugs = await getPostSlugs()
  let Promises = []
  for (const slug of slugs) {
    Promises.push(getPostBySlug(slug))
  }

  const posts = await Promise.all(Promises)
  // const posts = await slugs.map(async (slug) => {
  //   const res = await getPostBySlug(slug)
  //   return res
  // })
  // sort posts by date in descending order
  // .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
