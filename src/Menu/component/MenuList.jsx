import { IconEditCircle } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function MenuList() {
    const [products, setProducts] = useState([]);
 
  return (
    <div className="p-4 shadow-sm rounded-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Menu List</h3>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <div className="row">
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
              <th>Nama</th>
              <th>Harga</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <img
                    className="img-fluid"
                    width={100}
                    height={100}
                    src={product.image.url}
                    alt={product.image.name}
                  />
                </td>
                <td>
                  <div className="btn-group">
                    <Link
                      to={`/dashboard/product/update/${product.id}`}
                      className="btn btn-primary"
                    >
                      <i>
                        <IconEditCircle />
                      </i>
                    </Link>
                    <button
                   
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
          Show data 
        </small>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li
              className={`page-item `}
            >
              <button

                className="page-link"
              >
                Previous
              </button>
            </li>

            <li className={`page-item`}>
              <button
  
                className="page-link"
        
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
