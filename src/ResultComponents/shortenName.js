function shortenName(name, len = 25) {
  return name.length < len
    ? name
    : name.substring(0, len / 2) +
        "..." +
        name.substring(name.length - len / 2);
}

export default shortenName;
