import NavBar from "../components/NavBar";
import Link from "next/link";

const Home = ({ data }) => {
  const onDeleteHandler = async (id: number) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      await fetch(`http://localhost:4040/items/${id}`, options);
    } catch (error) {
      alert("Ooops something went wrong");
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-gray-100 min-h-screen md:p-10 p-2">
        <Link
          href="/create_item"
          className="bg-[#002D74] rounded-md text-white p-2 hover:scale-105 duration-300"
        >
          Add Item
        </Link>
        <div className="text-center text-2xl font=[Poppins] text-[#002D74]">
          Items
        </div>
        <div className="overflow-auto rounded-lg shadow mt-5">
          {data === "Ooops something went wrong" ? (
            "Ooops something went wrong"
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    No
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Name
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Price
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Edit Item
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Delete Item
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((item, index) => (
                  <tr
                    key={item.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {++index}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {item.price}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <Link
                        href={`item/edit_item/${item.id}`}
                        className="bg-[#002D74] rounded-md text-white p-2 hover:scale-105 duration-300"
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <div
                        onClick={() => onDeleteHandler(item.id)}
                        className="bg-[#002D74] rounded-md text-white p-2 w-16 hover:scale-105 duration-300"
                      >
                        Delete
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch("http://localhost:4040/items");
    const data = await res.json();

    return { props: { data } };
  } catch (error) {
    return {
      props: {
        data: "Ooops something went wrong",
      },
    };
  }
}

export default Home;
