"use client";

import { ArticleInterface } from "@/app/pages/user/props";
import Link from "next/link";

export function ArticleCard(props: ArticleInterface) {
  let { article_id, title, author, type, datePublished, imageUrl } = props;

  datePublished = new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(
    new Date(datePublished)
  );

  return (
    <div className="border-gray-100 rounded-2xl shadow-lg border-2 hover:border-saitRed hover:shadow-saitRed-100 hover:shadow-lg hover:scale-105 duration-300 ease-in-out">
      <Link href={`/articles/${article_id}`} passHref>
        <img
          src={imageUrl || "/img_placeholder.png"}
          alt="Article Image"
          className="w-full h-40 object-cover rounded-t-2xl"
        />
        <div className="p-4">
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-bold">{title}</h2>
            <span className="text-sm text-gray-500 ml-auto italic">
              {datePublished}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Author: {author}</p>
        </div>
      </Link>
    </div>
  );
}

export function ArticleFeaturedCard(props: ArticleInterface) {
  let { article_id, title, author, type, datePublished, imageUrl, content } =
    props;

  datePublished = new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(
    new Date(datePublished)
  );

  return (
    <div className="w-full h-[500px] border-gray-100 hover:border-saitLighterBlue rounded-2xl shadow-lg border-2 overflow-hidden mb-8">
      <Link
        className="flex flex-col lg:flex-row h-full"
        href={`articles/${article_id}`}
        passHref
      >
        <img
          src={imageUrl || "/img_placeholder.png"}
          alt="Article Image"
          className="w-full lg:w-1/2 h-64 lg:h-auto object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-t-none"
        />

        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="flex flex-col items-center mb-4">
            <h2 className="lg:text-4xl text-lg font-bold mb-4">{title}</h2>
            <div className="flex items-center mb-4">
              <div className="flex items-center rounded-md text-white font-semibold italic bg-saitLighterBlue p-2">
                Most Recent
              </div>

              <div className="ml-auto text-right">
                <p className="lg:text-sm text-gray-500 italic">
                  {datePublished}
                </p>
                <p className="lg:text-sm text-gray-500 italic">
                  Author: {author}
                </p>
              </div>
            </div>
          </div>
          <p className="align-middle">
            {content.split(" ").length > 50
              ? content.split(" ").slice(0, 50).join(" ") + "..."
              : content}
            ...
          </p>
        </div>
      </Link>
    </div>
  );
}
