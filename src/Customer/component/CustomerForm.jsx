
import { IconX } from "@tabler/icons-react";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import CustomerService from "../../service/CustomerService";
import { useMemo } from "react";



const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "name wajib di isi!"),
  phone: z.string().min(12, "phone wajib di isi minimal 12 karakter!"),
});

function CustomerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const customerService = useMemo(() => CustomerService(), []);
  const { id } = useParams();


  const handleBack = () => {
    clearForm();
    navigate("/customer");
  };

  const onSubmit = async (data) => {
    try {
      const customer = {
        id: id,
        customerName: data.name,
        mobilePhoneNo: data.phone,
      };
      if (id){
        await customerService.update(customer)
      }else{
        await customerService.create(customer);
      } 
      clearForm();
      navigate("/customer");
    } catch (err) {
      console.log(err);
    }
  };

  const clearForm = () => {
    clearErrors();
    reset();
  };

  useEffect(() => {
    if (id) {
      const getCustomerById = async () => {
        try {
          const response = await customerService.getById(id);
          const currentCustomer = response.data;
          setValue("id", currentCustomer.id);
          setValue("name", currentCustomer.customerName);
          setValue("phone", currentCustomer.mobilePhoneNo);
        } catch (error) {
          console.log(error);
        }
      };
      getCustomerById();
    }
  }, [id, customerService, setValue]);

  return (
    <div className="shadow-sm p-4 rounded-2">
      <h2 className="mb-4">Form Customer</h2>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="mb-3">
          <label htmlFor="name" className="form-label required">
            Nama
          </label>
          <input
            {...register("name")}
            type="text"
            className={`form-control ${errors.name && "is-invalid"}`}
            name="name"
            id="name"
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label required">
            Phone
          </label>
          <input
            {...register("phone")}
            type="text"
            className={`form-control ${errors.phone && "is-invalid"}`}
            name="phone"
            id="phone"
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone.message}</div>
          )}
        </div>

        <div className="d-flex gap-2">
          <button
            type="submit"
            disabled={!isValid}
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

export default CustomerForm;
