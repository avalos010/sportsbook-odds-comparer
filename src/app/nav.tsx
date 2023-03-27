import Logo from "../../public/next.svg";
import Image from "next/image";

function Nav() {
  return (
    <nav className=" bg-cyan-600 w-full border-b-2 p-4">
      <div className="flex justify-center items-center">
        <Image
          className="image w-32"
          src={Logo}
          alt="Logo for sportsbook odds comparer tool"
        />
      </div>
      <div className="flex gap-4 justify-center p-3">
        <a>NBA</a>
        <a>MLB</a>
        <a>XFL</a>
        <a>MMA</a>
        <a>Soccer</a>
      </div>
    </nav>
  );
}

export default Nav;
