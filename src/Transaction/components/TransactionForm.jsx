
import { IconX } from "@tabler/icons-react";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { useMemo } from "react";
import TransactionService from "../../service/TransactionService";
import TableService from "../../service/TableService";
import { useState } from "react";
import CustomerService from "../../service/CustomerService";

function TransactionForm() {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const transactionService = useMemo(() => TransactionService(), []);
  const tableService = useMemo(() => TableService(), []);
  const customerService = useMemo(() => CustomerService(), []);
  const [tables, setTables] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [transaction, setTransaction] = useState(
     {
      customerId: "5dab5c74-9e84-4a95-8f59-b2cb9704bdb0",
      tableId: "66aeb65a-6742-4b54-89f3-605994b0b6c8",
      transactionTypeID: "TA",
      transactionDetail: []
  }
  );  

  const handleBack = () => {
    clearForm();
    navigate("/transaction");
  };

  const onSubmit = async (data) => {
    try {
      await transactionService.create(transaction);
      clearForm();
      navigate("/transaction");
    } catch (err) {
      console.log(err);
    }
  };

  const clearForm = () => {
    reset();
  };

  useEffect(() => {
    const getTables = async () => {
      try {
        const data = await tableService.getAll();
        setTables(data.data);
        const dataCust = await customerService.getAll();
        setCustomers(dataCust.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTables();
  }, [tableService, customerService]);

  return (
    <div className="shadow-sm p-4 rounded-2">
      <h2 className="mb-4">Form Transaction</h2>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <label htmlFor="customer" className="form-label required">
            Customer
          </label>
        <div className="col-12 w-25">
            <select
              className="form-select"
              name="sizeOpt"
              id="sizeOpt"
              onChange={(e) => {
                  setTransaction({
                    ...transaction,
                    customerId: e.target.value
                  })
              }}
            >
              {customers.map((customer, index)=>(
                <option key={index+1} value={customer.id}>{customer.customerName}</option>
              ))}
            </select>
          </div>
        <label htmlFor="table" className="form-label required mt-3">
            Table
          </label>
        <div className="col-12 w-25">
            <select
              className="form-select"
              name="sizeOpt"
              id="sizeOpt"
              onChange={(e) => {
                  setTransaction({
                    ...transaction,
                    tableId: e.target.value
                  })
              }}
            >
              {tables.map((table, index)=>(
                <option key={index+1} value={table.id}>{table.tableName}</option>
              ))}
            </select>
          </div>

        <div className="d-flex gap-2 mt-4">
          <button
            type="submit"
            className="d-flex align-items-center btn btn-primary"
          >
            <i className="me-2">
              <IconDeviceFloppy />
            </i>
            Simpan
          </button>
          <button
            onClick={handleBack}
            type="button"
            className="d-flex align-items-center btn btn-danger text-white"
          >
            <i className="me-2">
              <IconX />
            </i>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
