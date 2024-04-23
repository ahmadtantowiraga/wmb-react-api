import { IconShoppingBagPlus } from "@tabler/icons-react";
import { IconEye } from "@tabler/icons-react";
import { Link } from "react-router-dom";

function TransactionList() {
  return (
    <div className="p-4 shadow-sm rounded-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Transaction List</h3>
        <Link
          to="/dashboard/transaction/new"
          className="btn btn-primary d-flex align-items-center"
        >
          <i className="me-1">
            <IconShoppingBagPlus />
          </i>
          Buat Transaksi Baru
        </Link>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <div className="row">
          <div className="col-12">
            <select className="form-select" name="sizeOpt" id="sizeOpt">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
        <form autoComplete="off">
          <input
            placeholder="search"
            className="form-control"
            type="search"
            name="search"
            id="search"
          />
        </form>
      </div>

      <hr />
      <div className="table-responsive mt-4">
        <table className="table overflow-auto">
          <thead>
            <tr>
              <th>No</th>
              <th>Customer</th>
              <th>Tanggal Transaksi</th>
              <th>Status Transaksi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Avatar</td>
              <td>{new Date().toDateString()}</td>
              <td>
                <span className="badge text-bg-success text-white">
                  Settlement
                </span>
              </td>
              <td>
                <button className="btn btn-primary">
                  <i className="me-2">
                    <IconEye />
                  </i>
                  Lihat Detail
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="d-flex align-items-center justify-content-between mt-4">
        <small>Show data 1 of 10</small>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#">
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default TransactionList;
