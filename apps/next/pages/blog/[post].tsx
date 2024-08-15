import { PostScreen } from 'app/features/blog/post-screen'
import { PostLayout } from '@my/ui'
import { getAllPosts, getPostBySlug, GetPostBySlug } from 'posts'
import { GetStaticProps } from 'next'

import type { GetStaticPaths, InferGetStaticPropsType } from 'next'
import { NextPageWithLayout } from 'pages/_app'
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

const Page: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { source } = props
  return <PostScreen source={source.source} />
}

Page.getLayout = (page) => {
  return <PostLayout>{page}</PostLayout>
}

export default Page
