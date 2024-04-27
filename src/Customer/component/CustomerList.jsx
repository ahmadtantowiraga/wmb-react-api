import { IconEditCircle } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useState } from "react";
import CustomerService from "../../service/CustomerService";



function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const customerService = useMemo(() => CustomerService(), []);
  const { handleSubmit, register } = useForm();

  const search = searchParam.get("customerName") || "";
  const page = searchParam.get("page") || "1";
  const size = searchParam.get("size") || "10";

  const [paging, setPaging] = useState({
    page: page,
    size: size,
    totalElement: 0,
    totalPages: 1,
    hasPrevious: false,
    hasNext: false,
  });

  const onSubmitSearch = ({ search }) => {
    setSearchParam({ customerName: search || "", page: "1", size: "10" });
  };

  const handleNextPage = () => {
    if (page >= paging.totalPages) return;
    setSearchParam({ customerName: "", page: +page + 1, size: size });
  };

  const handlePreviousPage = () => {
    if (page <= 1) return;
    setSearchParam({ customerName: "", page: +page - 1, size: size });
  };

  const navigatePage = (page) => {
    if (!page) return;
    setSearchParam({ customerName: "", page: page, size: size });
  };

  const handleDelete = async (id) => {
    console.log(id);
    if (!confirm("apakah yakin customer ini ingin dihapus?")) return;
    try {
      const response = await customerService.deleteById(id);
      if (response.statusCode === 200) {
        const data = await customerService.getAll();
        setCustomers(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const data = await customerService.getAll({
          customerName: search,
          page: page,
          size: size,
        });
        setCustomers(data.data);
        setPaging(data.pagingResponse);
      } catch (error) {
        console.log(error);
      }
    };
    getCustomers();
  }, [page, customerService, search, searchParam, size]);

  return (
    <div className="p-4 shadow-sm rounded-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Customer List</h3>
        <Link className="btn btn-primary" to="/customer/new">
          <i className="me-2">
            <IconPlus />
          </i>
          Tambah Customer
        </Link>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <div className="row">
          <div className="col-12">
            <select
              className="form-select"
              name="size"
              id="size"
              onChange={(e) => {
                setSearchParam({
                  tableName: search,
                  page,
                  size: e.target.value,
                });
              }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmitSearch)} autoComplete="off">
          <input
            {...register("search")}
            placeholder="search"
            className="form-control"
            type="search"
            name="search"
            id="search"
          />
        </form>
      </div>
      <hr />
      <div className="table-responsive mt-4 d-flex justify-content-center align-items-center">
        <table className="table overflow-auto w-25">
          <thead>
            <tr className="table-info">
              <th>No</th>
              <th>Nama</th>
              <th>Phone</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.id} className="table-light">
                <td>{index + 1}</td>
                <td>{customer.customerName}</td>
                <td>{customer.mobilePhoneNo}</td>
                <td>
                  <div className="btn-group">
                    <Link
                      to={`/customer/update/${customer.id}`}
                      className="btn btn-primary"
                    >
                      <i>
                        <IconEditCircle />
                      </i>
                    </Link>
                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="btn btn-danger"
                    >
                      <i className="text-white">
                        <IconTrash />
                      </i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex align-items-center justify-content-between mt-4">
        <small>
          Show data {customers.length} of {paging.totalElement}
        </small>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li
              className={`page-item ${!paging.hasPrevious ? "disabled" : ""}`}
            >
              <button
                disabled={!paging.hasPrevious}
                onClick={handlePreviousPage}
                className="page-link"
              >
                Previous
              </button>
            </li>
            {[...Array(paging.totalPages)].map((_, index) => {
              const currentPage = index + 1;
              return (
                <li
                  key={index}
                  className={`page-item ${
                    paging.page === currentPage ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() => navigatePage(currentPage)}
                    className="page-link"
                  >
                    {currentPage}
                  </button>
                </li>
              );
            })}
            <li className={`page-item ${!paging.hasNext ? "disabled" : ""}`}>
              <button
                disabled={!paging.hasNext}
                className="page-link"
                onClick={handleNextPage}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default CustomerList;
