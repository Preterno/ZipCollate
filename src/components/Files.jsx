import UploadFile from "./UploadFile";

function Files() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-[calc(640px+2rem)] px-3 md:gap-12">
      <div className="flex justify-center">
        <UploadFile number={1} />
      </div>
      <div className="flex justify-center">
        <UploadFile number={2} />
      </div>
    </div>
  );
}

export default Files;
