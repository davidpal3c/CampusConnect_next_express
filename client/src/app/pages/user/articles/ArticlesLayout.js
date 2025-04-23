import { ArticlesProvider } from "../../../_utils/articles-context";

const ArticlesLayout = ({ children }) => {
  return <ArticlesProvider>{children}</ArticlesProvider>;
};

export default ArticlesLayout;
