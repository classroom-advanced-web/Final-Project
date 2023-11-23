import { Link } from "react-router-dom";
import RightSideHeader from "./RightSideHeader";

const Header = () => {
  return (
    <header className="sticky top-0 w-full border-b-[1px] bg-white py-5 shadow-sm">
      <div className="container flex items-center justify-between ">
        <h2 className="text-3xl font-bold">
          <Link to="/">Classroom</Link>
        </h2>
        <RightSideHeader />
      </div>
    </header>
  );
};
export default Header;
