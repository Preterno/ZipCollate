import React, { useState } from "react";
import shortenName from "./shortenName";
import {
  CheckIcon,
  PlusIcon,
  MinusIcon,
  ExclamationIcon,
} from "../components/SvgIcon";

function ResultContent({
  name,
  data,
  zipNo,
  iconColors = {
    identical: "#4CAF50",
    different: "#FFA726",
    unique: "#42A5F5",
    missing: "#EF5350",
  },
}) {
  const [hovered, setHovered] = useState(false);

  const isPresent = zipNo === 1 ? data.in_zip1 : data.in_zip2;
  const shortenedName = shortenName(name);

  let background = "bg-secondary";
  let iconColor = "";
  let Icon = null;
  let status = "";

  if (data.identical) {
    background = "bg-[#4CAF50]/50";
    iconColor = iconColors.identical;
    Icon = CheckIcon;
    status = " contents are identical in both ZIPs";
  } else if (data.in_zip1 && data.in_zip2) {
    background = "bg-[#FFA726]/50";
    iconColor = iconColors.different;
    Icon = ExclamationIcon;
    status = " contents differ between the ZIPs";
  } else if (isPresent) {
    background = "bg-[#42A5F5]/50";
    iconColor = iconColors.unique;
    Icon = PlusIcon;
    status = " is unique to this ZIP";
  } else {
    background = "bg-[#EF5350]/50";
    iconColor = iconColors.missing;
    Icon = MinusIcon;
    status = " is missing in this ZIP";
  }

  const size = isPresent ? (zipNo === 1 ? data.size1 : data.size2) : "";

  return (
    <div
      className="relative py-0.5 pl-0 pr-6 max-sm:pr-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex gap-1 pl-0.5 items-center">
        <Icon color={iconColor} />
        <div
          className={`flex-grow py-1 cursor-pointer z-10 font-medium text-lg flex justify-between items-center ${background} border-b max-sm:text-base max-sm:py-0.5 border-white/10 hover:bg-opacity-80 transition-colors duration-200`}
        >
          <div className="p-0 flex gap-1 items-center min-h-7">
            {isPresent ? shortenedName : ""}
          </div>
          <div className="text-left text-gray-200 ">{size}</div>
        </div>
      </div>
      {hovered && (
        <div className="absolute top-10 right-24 z-50 p-2 w-40 text-sm bg-[#334756] rounded-md shadow-md transition-opacity duration-1000 opacity-100">
          Status: <span className="break-all">{name}</span> {status}
        </div>
      )}
    </div>
  );
}

export default ResultContent;
