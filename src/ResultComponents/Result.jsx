import React, { useRef, useEffect } from "react";
import ResultHeader from "./ResultHeader";
import ResultBox from "./ResultBox";
import shortenName from "./shortenName";
import Download from "./Download";
import AnimationWrapper from "../components/AnimationWrapper";
import { useAppContext } from "../context/AppContext";

function Result({ result }) {
  const { isLoading } = useAppContext();
  const resultView = useRef();

  useEffect(() => {
    resultView.current.scrollIntoView();
  }, [isLoading]);

  return (
    <AnimationWrapper>
      <div className="p-4 flex gap-12 flex-col max-sm:gap-10" ref={resultView}>
        <div>
          <h1 className="text-4xl font-medium text-center max-sm:text-3xl">
            Comparison Results
          </h1>
          <h2 className="text-xl pt-2 font-thin text-center">
            Click or hover over the file name for more information.
          </h2>
        </div>
        <div className="flex-1 flex max-compare:flex-col gap-12 items-center justify-center">
          <div className="flex justify-center flex-col">
            <ResultHeader
              name={shortenName(result.zip1_name, 20)}
            ></ResultHeader>
            <ResultBox files={result.comparison} zipNo={1}></ResultBox>
          </div>
          <div className="flex justify-center flex-col">
            <ResultHeader
              name={shortenName(result.zip2_name, 20)}
            ></ResultHeader>
            <ResultBox files={result.comparison} zipNo={2}></ResultBox>
          </div>
        </div>
        <div className="flex justify-center pb-10">
          <Download result={result}></Download>
        </div>
      </div>
    </AnimationWrapper>
  );
}

export default Result;
