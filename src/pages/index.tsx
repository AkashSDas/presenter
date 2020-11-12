import fs from "fs";
import { GetStaticProps } from "next";
import Link from "next/link";
import path from "path";
import React from "react";

interface Props {
  files: string[];
}

const IndexPage: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <h1>Presenter</h1>

      <pre>
        {props.files.map((file, idx) => (
          <div key={idx}>
            <Link href={`${file.replace(".md", "")}`}>
              <a>{file.replace(".md", "")}</a>
            </Link>
          </div>
        ))}
      </pre>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
  const contentsDirPath = path.join("src", "contents");
  const files = fs.readdirSync(contentsDirPath);

  return {
    props: {
      files: files,
    },
  };
};

export default IndexPage;
