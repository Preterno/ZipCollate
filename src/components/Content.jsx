import Files from "./Files";
import ExcludeFile from "./ExcludeFile";
import Compare from "./Compare";
import AnimationWrapper from "./AnimationWrapper";

function Content() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-12 py-5 max-sm:py-10 max-sm:gap-10">
      <AnimationWrapper>
        <h1 className="text-3xl font-medium px-16 text-center max-sm:px-3 max-sm:text-2xl">
          Compare Two Zip Files Quickly for Accurate Results, Ensuring No Data
          Is Left Behind.
        </h1>
      </AnimationWrapper>

      <AnimationWrapper>
        <Files />
      </AnimationWrapper>

      <AnimationWrapper position="z-10">
        <ExcludeFile />
      </AnimationWrapper>

      <AnimationWrapper>
        <Compare />
      </AnimationWrapper>
    </div>
  );
}

export default Content;
