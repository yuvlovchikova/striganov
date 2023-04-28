import React from 'react'
import { StructuredText, Image as DatoCMSImage } from "react-datocms";
import { getArticleDetails, getArticlesPaths } from '@/lib/datocms'
import Link from 'next/link';
import styles from "./articles.module.css"

// articles/[slug].js
export default function Article({ article }) {

  console.log('Article >>', article)
  return <>
    <header className={'flex_center border margin_top2 pb_2'}>
      <p>
        Новости организации
      </p>

    </header>
    <Link className={styles.backToMain} href={"/#news"}>
      Назад
    </Link>
    <main className={'m_25 margin_top5'}>
      <h2 className='margin_bot5'>{article.title}</h2>

      <div className={'w50 '}>
        <DatoCMSImage data={article.mainPicture.responsiveImage} />
      </div>
      <div className='w50'>
        <StructuredText data={article.articleText} />
      </div>

    </main>
  </>
}

// Generates `/article/1` and `/article/2`
export async function getStaticPaths() {
  const articles = await getArticlesPaths()
  const paths = articles.map(x => ({ params: { slug: x.slug } }))
  return { paths, fallback: false, }
}

export async function getStaticProps(context) {
  const article = await getArticleDetails(context.params.slug)
  return {
    props: { article },
  }
}
