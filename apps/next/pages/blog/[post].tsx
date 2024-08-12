import { PostScreen } from 'app/features/blog/post-screen'
import { getAllPosts, getPostBySlug, GetPostBySlug } from 'posts'
import { GetStaticProps } from 'next'

import type { GetStaticPaths, InferGetStaticPropsType } from 'next'
type PageProps = { source: GetPostBySlug }

export const getStaticProps = (async (props) => {
  console.log(props)
  const post = Array.isArray(props?.params?.post) ? props?.params?.post[0] : props?.params?.post
  if (!post) {
    return {
      notFound: true,
    }
  }
  const posts = await getPostBySlug(post)
  return { props: { source: posts } }
}) satisfies GetStaticProps<PageProps>

export const getStaticPaths = (async () => {
  const posts = await getAllPosts()
  return {
    fallback: false,
    paths: posts.map((post: any) => ({
      params: { post: post.source.frontmatter.slug },
    })),
  }
}) as GetStaticPaths

export default function Page(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { source } = props
  return <PostScreen source={source.source} />
}
