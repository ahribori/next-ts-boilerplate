import React from 'react';
import { useRouter } from 'next/router';

const Article = () => {
  const router = useRouter();
  const { articleId } = router.query;

  return <div>ArticleId: {articleId}</div>;
};

export default Article;
