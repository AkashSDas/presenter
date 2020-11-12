import fs from "fs";
import matter from "gray-matter";
import marked from "marked";
import path from "path";
import React from "react";

interface Props {
  htmlString: string;
  data: {
    [key: string]: any;
  };
}

const Content: React.FC<Props> = ({ htmlString, data }: Props) => {
  console.log(data);

  return (
    <div>
      <pre>
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      </pre>
    </div>
  );
};

export const getStaticPaths = () => {
  const contentsDirPath = path.join("src", "contents");
  const files = fs.readdirSync(contentsDirPath);
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticProps = ({ params }: Params) => {
  const markdownWithMetaData = fs
    .readFileSync(path.join("src", "contents", params.slug + ".md"))
    .toString();

  const parsedMarkdown = matter(markdownWithMetaData);
  const htmlString = marked(parsedMarkdown.content);

  return {
    props: {
      htmlString,
      data: parsedMarkdown.data,
    },
  };
};

export default Content;
