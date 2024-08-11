import { HomeScreen } from 'app/features/home/screen'
import { GetStaticProps } from 'next'
import { getAllPosts } from 'posts'
type GetAllPosts = Awaited<ReturnType<typeof getAllPosts>>
type PageProps = {
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

export default function Page(props: any) {
  console.log(props)
  return <HomeScreen pagesMode={true} />
}
