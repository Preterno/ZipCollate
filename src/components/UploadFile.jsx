import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClearIcon, UploadIcon, LockIcon, UnlockIcon } from "./SvgIcon";
import { useAppContext } from "../context/AppContext";

function UploadFile({ number }) {
  const { updateFormData, setErrorState } = useAppContext();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileStatus, setFileStatus] = useState(false);
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (
      (file && file.type === "application/x-zip-compressed") ||
      file.type === "application/zip" ||
      file.type === "multipart/x-zip" ||
      file.type === "application/octet-stream" ||
      file.name.endsWith(".zip")
    ) {
      setUploadedFile(file);
      setFileName(file.name);
      setFileStatus(true);
    } else {
      setErrorState(true, "File must be in zip format");
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setFileName(file.name);
      setFileStatus(true);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setFileStatus(false);
    setFileName("");
    setPassword("");
    setShowPasswordInput(false);
    setUploadedFile(null);
    updateFormData("file" + number, null);
    updateFormData("password" + number, "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const togglePassword = (e) => {
    e.stopPropagation();
    setShowPasswordInput(!showPasswordInput);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    updateFormData("file" + number, uploadedFile);
  }, [uploadedFile, number]);

  useEffect(() => {
    updateFormData("password" + number, password);
  }, [password, number]);

  return (
    <div
      className={`bg-secondary rounded-3xl relative shadow-custom-strong p-5
      w-[320px] min-w-0 max-w-full h-64 
      flex flex-col items-center justify-center
      overflow-hidden text-center
      ${!fileStatus ? "cursor-pointer" : ""}
      hover:bg-[#374B5F] transition-colors duration-200 
      ${dragging ? "bg-[#374B5F]" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={fileStatus ? undefined : handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {fileStatus && (
          <motion.div
            className="clearButton absolute top-2 right-2 z-10 cursor-pointer"
            onClick={handleClear}
            role="button"
            tabIndex={0}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ClearIcon className="w-6 h-6 2xl:w-8 2xl:h-8" />
          </motion.div>
        )}
      </AnimatePresence>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".zip"
        onChange={handleChange}
      />

      <AnimatePresence>
        {!fileStatus ? (
          <motion.div
            className="flex flex-col items-center justify-center h-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <UploadIcon
              className={`w-16 h-16 2xl:w-20 2xl:h-20 ${
                dragging || isHovered ? "opacity-75" : ""
              }`}
            />
            <h1
              className={`text-[1.35rem] mt-1 md:text-2xl
                          ${dragging || isHovered ? "opacity-75" : ""}`}
            >
              Upload a File
            </h1>
            <h2
              className={`text-base 2xl:text-lg font-light
                          ${dragging || isHovered ? "opacity-75" : ""}`}
            >
              or Drag and Drop
            </h2>
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-xl md:text-2xl">
              <span className="break-all ">
                {fileName.length < 25
                  ? fileName
                  : fileName.substring(0, 10) +
                    "..." +
                    fileName.substring(fileName.length - 10)}{" "}
              </span>
              is selected
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fileStatus && (
          <motion.div
            className="absolute bottom-4 left-5 right-3"
            initial={{ opacity: 0, height: "auto" }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <div
                className="filePassword cursor-pointer py-1"
                onClick={togglePassword}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {showPasswordInput ? (
                    <UnlockIcon className="w-6 h-6 2xl:w-8 2xl:h-8" />
                  ) : (
                    <LockIcon className="w-6 h-6 2xl:w-8 2xl:h-8" />
                  )}
                </motion.div>
              </div>
              {showPasswordInput && (
                <motion.input
                  type="text"
                  className="w-full px-2 py-1 text-sm 2xl:text-lg mr-2 text-primary rounded placeholder-primary outline-none bg-accent"
                  placeholder="Enter password (if any)"
                  onChange={handlePasswordChange}
                  value={password}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  autoFocus
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UploadFile;
