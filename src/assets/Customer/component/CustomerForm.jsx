
// import { IconX } from "@tabler/icons-react";
// import { IconDeviceFloppy } from "@tabler/icons-react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect } from "react";
// import TableService from "../../../service/TableService";


// const schema = z.object({
//   id: z.string().optional(),
//   name: z.string().min(1, "name wajib di isi!"),
// });

// function CustomerForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//     clearErrors,
//     reset,
//     setValue,
//   } = useForm({
//     mode: "onChange",
//     resolver: zodResolver(schema),
//   });
//   const navigate = useNavigate();
//   const tableService = TableService();
//   const { id } = useParams();


//   const handleBack = () => {
//     clearForm();
//     navigate("/table");
//   };

//   const onSubmit = async (data) => {
//     try {
//       const table = {
//         id: id,
//         tableName: data.name,
//       };
//       if (id){
//         await tableService.update(table)
//       }else{
//         await tableService.create(table);
//       } 
//       clearForm();
//       navigate("/table");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const clearForm = () => {
//     clearErrors();
//     reset();
//   };

//   useEffect(() => {
//     if (id) {
//       const getTableById = async () => {
//         try {
//           const response = await tableService.getById(id);
//           const currentTable = response.data;
//           setValue("id", currentTable.id);
//           setValue("name", currentTable.tableName);
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       getTableById();
//     }
//   }, [id, tableService, setValue]);

//   return (
//     <div className="shadow-sm p-4 rounded-2">
//       <h2 className="mb-4">Form Table</h2>
//       <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label required">
//             Nama
//           </label>
//           <input
//             {...register("name")}
//             type="text"
//             className={`form-control ${errors.name && "is-invalid"}`}
//             name="name"
//             id="name"
//           />
//           {errors.name && (
//             <div className="invalid-feedback">{errors.name.message}</div>
//           )}
//         </div>

//         <div className="d-flex gap-2">
//           <button
//             type="submit"
//             disabled={!isValid}
//             className="d-flex align-items-center btn btn-primary"
//           >
//             <i className="me-2">
//               <IconDeviceFloppy />
//             </i>
//             Simpan
//           </button>
//           <button
//             onClick={handleBack}
//             type="button"
//             className="d-flex align-items-center btn btn-danger text-white"
//           >
//             <i className="me-2">
//               <IconX />
//             </i>
//             Batal
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default CustomerForm;
