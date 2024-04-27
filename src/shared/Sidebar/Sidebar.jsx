import { IconDoorExit, IconHome2, IconReceipt } from "@tabler/icons-react";
import PropTypes from "prop-types";
import { IconTable } from "@tabler/icons-react";
import { IconMeat } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconBrandSuperhuman } from "@tabler/icons-react";

export default function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = ()=>{
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
      <div
        className={"bg-success p-2 bg-opacity-30 text-white p-4 shadow"}
        style={{ width: 350, minHeight: "100dvh" }}
      >
        <div className="font-logo text-center mb-5">
          <h2 className="fs-3">
            <i>
              <b>Warung Makan Bahari</b> WMB
            </i>
          </h2>
        </div>
        <nav>
          <ul className="d-flex flex-column gap-3 nav-list list-unstyled">
            <p className="fw-bold mt-4">Navigation</p>
            <Link to="/" className="text-white text-decoration-none" href="/">
            <li className="cursor-pointer text-white">
              <i className="me-3">
                <IconHome2 />
              </i>
              <span>Dasboard</span>
            </li>
            </Link>
            <Link to="/menu" className="text-white text-decoration-none" href="/">
            <li  className="cursor-pointer text-white">
              <i className="me-3">
                <IconMeat />
              </i>
              <span>Menu</span>
            </li>
            </Link>
            <Link to="/customer" className="text-white text-decoration-none" href="/">
            <li  className="cursor-pointer text-white">
              <i className="me-3">
                <IconBrandSuperhuman />
              </i>
              <span>Customer</span>
            </li>
            </Link>
            <Link to="/table" className="text-white text-decoration-none" href="/">
            <li className="cursor-pointer text-white">
              <i className="me-3">
                <IconTable />
              </i>
              <span>Table</span>
            </li>
            </Link>
            <Link to="/transaction" className="text-white text-decoration-none" href="/">
            <li className="cursor-pointer text-white">
              <i className="me-3">
                <IconReceipt />
              </i>
              <span>Transaction</span>
            </li>
            </Link>
            <hr />
            <li onClick={handleLogout} className="cursor-pointer text-white">
              <i className="me-3">
                <IconDoorExit />
              </i>
              <span>Logout</span>
            </li>
          </ul>
        </nav>
      </div>
    );
  }


Sidebar.propTypes = {
  handlePage: PropTypes.func,
  handleAuthentication: PropTypes.func,
  dataMenu: PropTypes.array,
  dataTable:PropTypes.array,
  handleDataMenu:PropTypes.func,
  handleDataTable: PropTypes.func,
};
