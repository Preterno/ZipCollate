import React, { useEffect, useState, useRef } from "react";
import { CaretIcon, CheckIcon } from "./SvgIcon";
import { useAppContext } from "../context/AppContext";
import "../styles/custom-scroll.css";

function DropDown() {
  const fileExtensions = [
    ".7z",
    ".aac",
    ".app",
    ".avi",
    ".bat",
    ".bin",
    ".bmp",
    ".csv",
    ".doc",
    ".docx",
    ".exe",
    ".flac",
    ".gif",
    ".gz",
    ".html",
    ".jpeg",
    ".jpg",
    ".js",
    ".lock",
    ".log",
    ".m4a",
    ".m4v",
    ".mkv",
    ".mov",
    ".msi",
    ".ogg",
    ".pdf",
    ".png",
    ".ppt",
    ".pptx",
    ".rar",
    ".rtf",
    ".sh",
    ".svg",
    ".tar",
    ".tiff",
    ".tmp",
    ".txt",
    ".wav",
    ".webm",
    ".wmv",
    ".zip",
    ".xml",
    ".json",
  ];

  const { updateFormData } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredFile, setHoveredFile] = useState(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    searchRef.current.focus();
  };

  const addFile = (fileExtension) => {
    setSelectedFiles((prev) =>
      prev.includes(fileExtension)
        ? prev.filter((file) => file !== fileExtension)
        : [...prev, fileExtension],
    );
    searchRef.current.focus();
  };

  const filteredExtensions = fileExtensions.filter((ext) =>
    ext.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const updateSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const updateIsOpen = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", updateIsOpen);
    return () => {
      document.removeEventListener("mousedown", updateIsOpen);
    };
  }, [inputRef, dropdownRef]);

  useEffect(() => {
    updateFormData("excludeList", selectedFiles);
  }, [selectedFiles]);

  return (
    <div className="relative" ref={inputRef}>
      <div
        className="flex cursor-pointer items-center justify-between w-64 px-4 py-1 text-white bg-[#2C394B] rounded-lg shadow-custom-medium hover:bg-[#374B5F] transition-colors duration-200"
        onClick={handleOpen}
      >
        <input
          type="text"
          className="text-white text-lg bg-inherit p-1 pl-0 m-0 w-52 max-md:text-base outline-none placeholder-white"
          placeholder={`Search types (${selectedFiles.length} excluded)`}
          onClick={(e) => isOpen && e.stopPropagation()}
          ref={searchRef}
          value={searchTerm}
          onChange={updateSearchTerm}
        />
        <CaretIcon turn={isOpen} />
      </div>
      {isOpen && (
        <div
          className="absolute w-64 mt-1 bg-[#1E2A3B] rounded-lg shadow-xl border border-[#FF4C29]/20 max-h-36 overflow-y-auto custom-scrollbar max-sm:text-sm max-sm:h-32"
          ref={dropdownRef}
        >
          <div className="py-1">
            {filteredExtensions.map((fileExtension, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-4 py-1.5 hover:bg-[#2C394B] cursor-pointer group"
                onClick={() => addFile(fileExtension)}
                onMouseEnter={() => setHoveredFile(fileExtension)}
                onMouseLeave={() => setHoveredFile(null)}
              >
                <div className="text-white group-hover:text-[#FF4C29] transition-colors duration-200">
                  {fileExtension}
                </div>
                {selectedFiles.includes(fileExtension) && (
                  <CheckIcon
                    color={hoveredFile === fileExtension ? "#FF4C29" : "white"}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropDown;
