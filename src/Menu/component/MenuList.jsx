import { IconEditCircle } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MenuService from "../../service/MenuService";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useState } from "react";

function MenuList() {
  const [menus, setMenus] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const menuService = useMemo(() => MenuService(), []);
  const { handleSubmit, register } = useForm();

  const search = searchParam.get("menuName") || "";
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
    setSearchParam({ menuName: search || "", page: "1", size: "10" });
  };

  const handleNextPage = () => {
    if (page >= paging.totalPages) return;
    setSearchParam({ menuName: "", page: +page + 1, size: size });
  };

  const handlePreviousPage = () => {
    if (page <= 1) return;
    setSearchParam({ menuName: "", page: +page - 1, size: size });
  };

  const navigatePage = (page) => {
    if (!page) return;
    setSearchParam({ menuName: "", page: page, size: size });
  };

  const handleDelete = async (id) => {
    console.log(id);
    if (!confirm("apakah yakin menu ini ingin dihapus?")) return;
    try {
      const response = await menuService.deleteById(id);
      if (response.statusCode === 200) {
        const data = await menuService.getAll();
        setMenus(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getMenus = async () => {
      try {
        const data = await menuService.getAll({
          menuName: search,
          page: page,
          size: size,
        });
        setMenus(data.data);
        setPaging(data.pagingResponse);
      } catch (error) {
        console.log(error);
      }
    };
    getMenus();
  }, [page, menuService, search, searchParam, size]);

  return (
    <div className="p-4 shadow-sm rounded-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Menu List</h3>
        <Link className="btn btn-primary" to="/menu/new">
          <i className="me-2">
            <IconPlus />
          </i>
          Tambah Menu
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
                  menuName: search,
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
              <th>Nama</th>
              <th>Harga</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
              <tr key={menu.id}>
                <td>{index + 1}</td>
                <td>{menu.menuName}</td>
                <td>{menu.price}</td>
                <td>
                  <img
                    className="img-fluid"
                    width={100}
                    height={100}
                    src={menu.imageResponse.url}
                    alt={menu.imageResponse.name}
                  />
                </td>
                <td>
                  <div className="btn-group">
                    <Link
                      to={`/menu/update/${menu.id}`}
                      className="btn btn-primary"
                    >
                      <i>
                        <IconEditCircle />
                      </i>
                    </Link>
                    <button
                      onClick={() => handleDelete(menu.id)}
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
          Show data {menus.length} of {paging.totalElement}
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

export default MenuList;
