import React, { useEffect, useState } from "react";
import { LoadingIcon } from "../components/SvgIcon";

function Download({ result }) {
  const [isClicked, setIsClicked] = useState(false);

  const generateSummary = (result) => {
    const currentDate = new Date().toLocaleString();
    const comparisonResult = result.comparison;

    return {
      general_info: {
        comparison_date: currentDate,
        zip1_name: result.zip1_name,
        zip2_name: result.zip2_name,
        excluded_extensions: result.exclude_list.join(", "),
      },
      comparison_summary: {
        total_files_zip1: Object.values(comparisonResult).filter(
          (file) => file.in_zip1,
        ).length,
        total_files_zip2: Object.values(comparisonResult).filter(
          (file) => file.in_zip2,
        ).length,
        identical_files: Object.values(comparisonResult).filter(
          (file) => file.identical,
        ).length,
        different_files: Object.values(comparisonResult).filter(
          (file) => file.in_zip1 && file.in_zip2 && !file.identical,
        ).length,
        unique_to_zip1: Object.values(comparisonResult).filter(
          (file) => file.in_zip1 && !file.in_zip2,
        ).length,
        unique_to_zip2: Object.values(comparisonResult).filter(
          (file) => file.in_zip2 && !file.in_zip1,
        ).length,
      },
      detailed_comparison: comparisonResult,
    };
  };

  const createSummary = (summary) => {
    const generalInfo = Object.entries(summary.general_info);
    const comparisonSummary = Object.entries(summary.comparison_summary);
    const detailedComparison = Object.entries(summary.detailed_comparison);

    let csvContent = "data:text/csv;charset=utf-8,";

    csvContent += "General Information\n";
    generalInfo.forEach(([key, value]) => {
      csvContent += `${key},${value}\n`;
    });
    csvContent += "\n";

    csvContent += "Comparison Summary\n";
    comparisonSummary.forEach(([key, value]) => {
      csvContent += `${key},${value}\n`;
    });
    csvContent += "\n";

    csvContent += "Detailed File Comparison\n";
    csvContent +=
      "File Name,In ZIP 1,In ZIP 2,Size in ZIP 1,Size in ZIP 2,Identical\n";
    detailedComparison.forEach(([fileName, fileInfo]) => {
      csvContent += `${fileName},${fileInfo.in_zip1 || ""},${fileInfo.in_zip2 || ""},${fileInfo.size1 || ""},${fileInfo.size2 || ""},${fileInfo.identical || ""}\n`;
    });

    return encodeURI(csvContent);
  };

  const downloadCSV = () => {
    const summary = generateSummary(result);
    const csvContent = createSummary(summary);
    setIsClicked(false);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", "zip_comparison_summary.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="w-80 max-sm:w-72 py-4 text-center bg-accent rounded-xl shadow-custom-strong cursor-pointer hover:bg-onHover transition-colors duration-200"
      onClick={() => {
        setIsClicked(true);
        downloadCSV();
      }}
    >
      {!isClicked ? (
        <h1 className="text-3xl max-sm:text-2xl">Download Summary</h1>
      ) : (
        <LoadingIcon />
      )}
    </div>
  );
}

export default Download;
