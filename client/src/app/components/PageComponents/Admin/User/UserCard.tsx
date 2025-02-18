import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

export default function UserCard({
  color = "blue",
  title = "",
  articles = [],
  onClickViewAll,
}: {
  color?: string;
  title: string;
  articles: any[];
  onClickViewAll: MouseEventHandler;
}) {
  const router = useRouter();
  const truncatedArticles = articles.slice(0, 3); // take top 3 articles

  return (
    <div className={`bg-blue-200 p-2 rounded-xl shadow-md`}>
      <div className="flex">
        <h2 className={`text-lg text-blue-600 font-semibold`}>{title}</h2>
        <button
          onClick={onClickViewAll}
          className="ml-auto mr-2 font-semibold text-sm"
        >
          View All
        </button>
      </div>
      {truncatedArticles.map((article) => (
        <div
          key={article.article_id}
          onClick={() => {
            router.push(`/users/articles/${article.article_id}`);
          }}
          className="bg-saitWhite flex flex-col cursor-pointer rounded-md shadow-md mb-2 p-2"
        >
          <div className="font-bold">{article.title}</div>
          <div className="truncate text-sm">{article.content}</div>
        </div>
      ))}
    </div>
  );
}
