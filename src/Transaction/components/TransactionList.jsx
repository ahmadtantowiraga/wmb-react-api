import { IconShoppingBagPlus } from "@tabler/icons-react";
import { IconEye } from "@tabler/icons-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import TransactionService from "../../service/TransactionService";
import { useMemo } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const transactionService = useMemo(() => TransactionService(), []);
  const { handleSubmit, register } = useForm();

  
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
      if (search.length > 0){
        setTransactions(transactions?.filter(transaction => transaction.customerName.toLowerCase() === search.toLowerCase()));
      }else{
        const getTransactions = async () => {
          try {
            const data = await transactionService.getAll();
            setTransactions(data.data);
            setPaging(data.pagingResponse);
          } catch (error) {
            console.log(error);
          }
        };
        getTransactions();
      } 
  };


  const handleNextPage = () => {
    if (page >= paging.totalPages) return;
    setSearchParam({ customerId: "", page: +page + 1, size: size });
  };

  const handlePreviousPage = () => {
    if (page <= 1) return;
    setSearchParam({ customerId: "", page: +page - 1, size: size });
  };

  const navigatePage = (page) => {
    if (!page) return;
    setSearchParam({ customerId: "", page: page, size: size });
  };

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await transactionService.getAll({
          page: page,
          size: size,
        });
        setTransactions(data.data);
        setPaging(data.pagingResponse);
      } catch (error) {
        console.log(error);
      }
    };
    getTransactions();
  }, [page, transactionService, searchParam, size]);
  return (
    <div className="p-4 shadow-sm rounded-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Transaction List</h3>
        <Link
          to="/transaction/new"
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
            <select
              className="form-select"
              name="sizeOpt"
              id="sizeOpt"
              onChange={(e) => {
                setSearchParam({
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
      <div className="table-responsive mt-4">
        <table className="table overflow-auto">
          <thead>
            <tr>
              <th>No</th>
              <th>Customer Name</th>
              <th>Tanggal Transaksi</th>
              <th>Status Transaksi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((transaction, index) => (
              <tr key={transaction.id}>
                <td>{index + 1}</td>
                <td>{transaction.customerName}</td>
                <td>{transaction.date}</td>
                <td>
                  <span className={`badge ${transaction.paymentResponse.transactionStatus==='settlement' ? "text-bg-success" : "text-bg-danger"} text-white`}>
                    {transaction.paymentResponse.transactionStatus}
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
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex align-items-center justify-content-between mt-4">
        <small>Show data {transactions?.length} of {paging.totalElement}</small>
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

export default TransactionList;
