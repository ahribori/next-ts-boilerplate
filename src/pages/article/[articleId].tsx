import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Article {
  id: string;
  title: string;
  content: string;
}

interface IProps {
  article: Article;
}

const Article: NextPage<IProps> = ({ article }) => {
  const router = useRouter();
  const { articleId } = router.query;

  return (
    <div>
      ArticleId: {articleId}
      <main>
        <h1>{article.title}</h1>
        <h3>{article.content}</h3>
      </main>
    </div>
  );
};

Article.getInitialProps = async ({ query }) => {
  const { articleId } = query;
  const articleRequest = await axios.get(`http://localhost:3000/api/article/${articleId}`);
  return {
    article: articleRequest.data,
  };
};

export default Article;
