import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { articleId },
  } = req;

  res.json({
    id: articleId,
    title: `Article ${articleId}`,
    content: `Article ${articleId} content`,
  });
};
