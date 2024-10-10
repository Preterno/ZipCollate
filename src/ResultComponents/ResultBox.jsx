import ResultContent from "./ResultContent";

function ResultBox(props) {
  return (
    <div className="w-96 mt-2 rounded-b-xl pb-5 shadow-custom-medium bg-secondary max-sm:w-80">
      <div className="bg-secondary text-xl px-6 py-2 font-medium flex justify-between border-white border-b-2 max-sm:text-lg max-sm:py-1">
        <span className="pl-0.5">Name</span>
        <span>Size</span>
      </div>
      <div className="pt-2 max-sm:pt-1">
        {Object.entries(props.files).map(([fileName, fileData], index) => (
          <ResultContent
            zipNo={props.zipNo}
            key={fileName}
            name={fileName}
            data={fileData}
          />
        ))}
      </div>
    </div>
  );
}

export default ResultBox;
