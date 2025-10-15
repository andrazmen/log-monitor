import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Header";

const Header = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Wrapper>
      <div className="header">
        <span className="logo" onClick={handleHome}>
          Log Monitor
        </span>
        <button className="button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </Wrapper>
  );
};

export default Header;
