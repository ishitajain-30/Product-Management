import Link from "next/link";
import RemoveBtn from "./RemoveBtn";

const getProducts = async () => {
  const apiUrl = process.env.API_URL;

  try {
    const res = await fetch(`${apiUrl}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    console.log("Fetched Products:", data);
    return data;
  } catch (error) {
    console.error("Error loading products:", error);
    return { products: [] };
  }
};

export default async function ProductsList() {
  const data = await getProducts();
  const products = data?.products || [];
  return (
    <main className="mainDes">
      <div className="productMainPage">
        <div className="alignheadandlink">
          <h2 className="productTitle">Product List</h2>

          <Link className="linkdesign" href="/addProduct">
            Add Products
          </Link>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Color</th>
                <th>Company</th>
                <th>Category</th>
                <th>Edit</th>
              </tr>
            </thead>
            {products?.map((p) => (
              <tbody key={p._id}>
                <tr>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.color}</td>
                  <td>{p.company}</td>
                  <td>{p.category}</td>
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <RemoveBtn id={p._id} />
                    <Link
                      className="linkdesignDelete"
                      href={`/editProduct/${p._id}`}
                    >
                      Edit{" "}
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </main>
  );
}
