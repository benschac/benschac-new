import { HomeScreen } from 'app/features/home/screen'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { GetAllPosts, getAllPosts } from 'posts'
export type PageProps = {
  source: GetAllPosts
}

export const getStaticProps = (async () => {
  const posts = (await getAllPosts()).sort((a, b) => {
    return (
      new Date(b.source.frontmatter.date as string).getTime() -
      new Date(a.source.frontmatter.date as string).getTime()
    )
  })
  return { props: { source: posts } }
}) satisfies GetStaticProps<PageProps>

export default function Page(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { source } = props
  return <HomeScreen source={source} />
}
