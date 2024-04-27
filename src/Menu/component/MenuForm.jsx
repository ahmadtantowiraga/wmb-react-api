import { useState } from "react";
import { IconX } from "@tabler/icons-react";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useParams } from "react-router-dom";
import MenuService from "../../service/MenuService";
import { useEffect } from "react";
import { useMemo } from "react";

const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "name wajib di isi!"),
  price: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), "Harga harus berupa angka")
    .transform((val) => parseInt(val))
    .refine((val) => val >= 0, "harga harus lebih dari 0"),
  image: z.any(),
});

function MenuForm() {
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
  const menuService = useMemo(() => MenuService(), []);
  const { id } = useParams();

  const [previewImage, setPreviewImage] = useState(
    "https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw"
  );

  const handleImageChange = (e) => {
    const { files } = e.target;
    const urlImage = URL.createObjectURL(files[0]);
    setPreviewImage(urlImage);
  };

  const handleBack = () => {
    clearForm();
    navigate("/menu");
  };

  const onSubmit = async (data) => {
    try {
      const form = new FormData();
      const menu = {
        id: id,
        menuName: data.name,
        price: data.price,
      };
      form.append("menu", JSON.stringify(menu));
      form.append("image", data.image[0]);
      if (id){
        await menuService.update(form)
      }else{
        await menuService.create(form);
      }
      
      clearForm();
      navigate("/menu");
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
      const getMenuById = async () => {
        try {
          const response = await menuService.getById(id);
          const currentMenu = response.data;
          setValue("id", currentMenu.id);
          setValue("name", currentMenu.menuName);
          setValue("price", currentMenu.price);
          setPreviewImage(currentMenu.imageResponse.url);
        } catch (error) {
          console.log(error);
        }
      };
      getMenuById();
    }
  }, [id, menuService, setValue]);

  return (
    <div className="shadow-sm p-4 rounded-2">
      <h2 className="mb-4">Form Menu</h2>
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
        <div className="row-rows-cols-2">
          <div className="mb-3">
            <label htmlFor="price" className="form-label required">
              Harga
            </label>
            <input
              {...register("price")}
              type="number"
              className={`form-control ${errors.price && "is-invalid"}`}
              name="price"
              id="price"
            />
            {errors.price && (
              <div className="invalid-feedback">{errors.price.message}</div>
            )}
          </div>

        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            <span className="required">Gambar</span>
            <br />
            <img
              className="img-thumbnail img-fluid"
              width={200}
              height={200}
              src={previewImage}
              alt="product"
            />
          </label>
          <input
            {...register("image")}
            onChange={handleImageChange}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            className={`form-control ${errors.image && "is-invalid"}`}
            name="image"
            id="image"
          />
          {errors.image && (
            <div className="invalid-feedback">{errors.image.message}</div>
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

export default MenuForm;
