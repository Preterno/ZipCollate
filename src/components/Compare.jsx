import React from "react";
import { useAppContext } from "../context/AppContext";
import { LoadingIcon } from "./SvgIcon";

function Compare() {
  const { toggleResult, isLoading, formData, setErrorState } = useAppContext();

  const isZipFile = (file) => {
    return (
      file.type === "application/x-zip-compressed" ||
      file.type === "application/zip" ||
      file.type === "multipart/x-zip" ||
      file.type === "application/octet-stream" ||
      file.name.endsWith(".zip")
    );
  };

  const maxSize = 50 * 1024 * 1024;

  const handleClick = () => {
    if (!formData.file1 || !formData.file2) {
      setErrorState(true, "One or both files are missing");
    } else if (!isZipFile(formData.file1) || !isZipFile(formData.file2)) {
      setErrorState(true, "Both files must be in zip format");
    } else if (formData.file1.size === 0 || formData.file2.size === 0) {
      setErrorState(true, "One or both ZIP files are empty");
    } else if (formData.file1.size > maxSize || formData.file2.size > maxSize) {
      setErrorState(true, "File size exceeds the 50MB limit");
    } else {
      setErrorState(false, "");
      toggleResult();
    }
  };

  return (
    <div className="relative z-0">
      <div
        className="h-fit w-44 px-7 py-4 max-sm:px-4 bg-accent rounded-xl text-center shadow-custom-strong cursor-pointer hover:bg-onHover transition-colors duration-200"
        onClick={handleClick}
      >
        {!isLoading && <h1 className="text-3xl max-sm:text-2xl">Compare</h1>}
        {isLoading && <LoadingIcon />}
      </div>
    </div>
  );
}

export default Compare;
