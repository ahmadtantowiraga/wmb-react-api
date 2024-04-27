// import { IconEditCircle } from "@tabler/icons-react";
// import { IconTrash } from "@tabler/icons-react";
// import { IconPlus } from "@tabler/icons-react";
// import { useMemo } from "react";
// import { useSearchParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useEffect } from "react";
// import { useState } from "react";
// import TableService from "../../service/TableService";

// function CustomerList() {
//   const [tables, setTables] = useState([]);
//   const [searchParam, setSearchParam] = useSearchParams();
//   const tableService = useMemo(() => TableService(), []);
//   const { handleSubmit, register } = useForm();

//   const search = searchParam.get("tableName") || "";
//   const page = searchParam.get("page") || "1";
//   const size = searchParam.get("size") || "10";

//   const [paging, setPaging] = useState({
//     page: page,
//     size: size,
//     totalElement: 0,
//     totalPages: 1,
//     hasPrevious: false,
//     hasNext: false,
//   });

//   const onSubmitSearch = ({ search }) => {
//     setSearchParam({ tableName: search || "", page: "1", size: "10" });
//   };

//   const handleNextPage = () => {
//     if (page >= paging.totalPages) return;
//     setSearchParam({ tableName: "", page: +page + 1, size: size });
//   };

//   const handlePreviousPage = () => {
//     if (page <= 1) return;
//     setSearchParam({ tableName: "", page: +page - 1, size: size });
//   };

//   const navigatePage = (page) => {
//     if (!page) return;
//     setSearchParam({ tableName: "", page: page, size: size });
//   };

//   const handleDelete = async (id) => {
//     console.log(id);
//     if (!confirm("apakah yakin table ini ingin dihapus?")) return;
//     try {
//       const response = await tableService.deleteById(id);
//       if (response.statusCode === 200) {
//         const data = await tableService.getAll();
//         setTables(data.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const getTables = async () => {
//       try {
//         const data = await tableService.getAll({
//           tableName: search,
//           page: page,
//           size: size,
//         });
//         setTables(data.data);
//         setPaging(data.pagingResponse);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getTables();
//   }, [page, tableService, search, searchParam, size]);

//   return (
//     <div className="p-4 shadow-sm rounded-2">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h3>Table List</h3>
//         <Link className="btn btn-primary" to="/table/new">
//           <i className="me-2">
//             <IconPlus />
//           </i>
//           Tambah Table
//         </Link>
//       </div>
//       <div className="d-flex justify-content-between align-items-center mt-4">
//         <div className="row">
//           <div className="col-12">
//             <select
//               className="form-select"
//               name="size"
//               id="size"
//               onChange={(e) => {
//                 setSearchParam({
//                   tableName: search,
//                   page,
//                   size: e.target.value,
//                 });
//               }}
//             >
//               <option value="10">10</option>
//               <option value="25">25</option>
//               <option value="50">50</option>
//               <option value="100">100</option>
//             </select>
//           </div>
//         </div>
//         <form onSubmit={handleSubmit(onSubmitSearch)} autoComplete="off">
//           <input
//             {...register("search")}
//             placeholder="search"
//             className="form-control"
//             type="search"
//             name="search"
//             id="search"
//           />
//         </form>
//       </div>
//       <hr />
//       <div className="table-responsive mt-4 d-flex justify-content-center align-items-center">
//         <table className="table overflow-auto w-25">
//           <thead>
//             <tr className="table-info">
//               <th>No</th>
//               <th>Nama</th>
//               <th>Aksi</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tables.map((table, index) => (
//               <tr key={table.id} className="table-light">
//                 <td>{index + 1}</td>
//                 <td>{table.tableName}</td>
//                 <td>
//                   <div className="btn-group">
//                     <Link
//                       to={`/table/update/${table.id}`}
//                       className="btn btn-primary"
//                     >
//                       <i>
//                         <IconEditCircle />
//                       </i>
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(table.id)}
//                       className="btn btn-danger"
//                     >
//                       <i className="text-white">
//                         <IconTrash />
//                       </i>
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="d-flex align-items-center justify-content-between mt-4">
//         <small>
//           Show data {tables.length} of {paging.totalElement}
//         </small>
//         <nav aria-label="Page navigation example">
//           <ul className="pagination">
//             <li
//               className={`page-item ${!paging.hasPrevious ? "disabled" : ""}`}
//             >
//               <button
//                 disabled={!paging.hasPrevious}
//                 onClick={handlePreviousPage}
//                 className="page-link"
//               >
//                 Previous
//               </button>
//             </li>
//             {[...Array(paging.totalPages)].map((_, index) => {
//               const currentPage = index + 1;
//               return (
//                 <li
//                   key={index}
//                   className={`page-item ${
//                     paging.page === currentPage ? "active" : ""
//                   }`}
//                 >
//                   <button
//                     onClick={() => navigatePage(currentPage)}
//                     className="page-link"
//                   >
//                     {currentPage}
//                   </button>
//                 </li>
//               );
//             })}
//             <li className={`page-item ${!paging.hasNext ? "disabled" : ""}`}>
//               <button
//                 disabled={!paging.hasNext}
//                 className="page-link"
//                 onClick={handleNextPage}
//               >
//                 Next
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// }

// export default CustomerList;
