import DropDown from "./DropDown";

function ExcludeFile() {
  return (
    <div className="flex justify-center items-center gap-6 max-sm:flex-col max-md:gap-2">
      <h2 className="text-2xl max-md:text-[1.35rem]">
        Select file types to exclude:{" "}
      </h2>
      <DropDown></DropDown>
    </div>
  );
}

export default ExcludeFile;
