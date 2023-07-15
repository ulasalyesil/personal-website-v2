import React from "react";
import Article from "@/components/Article";
import writingsContent from "../../../public/data/writingsContent.json";

export default function Page() {
  return (
    <Article articleData={writingsContent[1]} />
  )
}
