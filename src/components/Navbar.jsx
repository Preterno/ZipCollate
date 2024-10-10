import { GithubIcon } from "./SvgIcon";

function Navbar() {
  return (
    <div className="flex justify-between px-16 text-3xl p-2 bg-secondary text-white shadow-custom-medium max-sm:px-5">
      <h1 className="title text-white self-center cursor-pointer">
        Zip<span className="title text-accent">Collate</span>
      </h1>
      <a href="https://www.github.com" className="h-fit w-fit self-center">
        <GithubIcon />
      </a>
    </div>
  );
}

export default Navbar;
