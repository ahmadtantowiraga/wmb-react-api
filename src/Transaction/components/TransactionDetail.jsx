
import { useMemo } from "react";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import TransactionService from "../../service/TransactionService";
import { useParams } from "react-router-dom";

function TransactionDetail() {
  const [transactionDetail, setTransactionDetail] = useState([]);
  const transactionService = useMemo(() => TransactionService(), []);
  const { id } = useParams();

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const data = await transactionService.getById(id);
        setTransactionDetail(data.data.transactionDetailResponse);
      } catch (error) {
        console.log(error);
      }
    };
    getTransaction();
  }, [transactionService, id]);

  return (
    <div className="p-4 shadow-sm rounded-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Transaction Detail</h3>
        <Link className="btn btn-primary" to="/transaction">
          Kembali
        </Link>
      </div>
      <hr />
      <div className="table-responsive mt-4 d-flex justify-content-center align-items-center">
        <table className="table overflow-auto w-25">
          <thead>
            <tr className="table-info">
              <th>No</th>
              <th>Nama</th>
              <th>qty</th>
              <th>price</th>
            </tr>
          </thead>
          <tbody>
            {transactionDetail.map((transDetail, index) => (
              <tr key={transDetail.id} className="table-light">
                <td>{index + 1}</td>
                <td>{transDetail.menuName}</td>
                <td>{transDetail.qty}</td>
                <td>{transDetail.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionDetail;
