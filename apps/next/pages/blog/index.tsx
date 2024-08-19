import { HomeScreen } from 'app/features/home/screen'
// import { NewScreen } from 'app/features/home/new-screen'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { GetAllPosts, getAllPosts } from 'posts'
import generateRssFeed from 'utils/rss'
export type PageProps = {
  source: GetAllPosts
}

export const getStaticProps = (async () => {
  const posts = await getAllPosts()
  generateRssFeed()
  return { props: { source: posts } }
}) satisfies GetStaticProps<PageProps>

export default function Page(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { source } = props
  // @ts-expect-error
  return <HomeScreen source={source} />
}
