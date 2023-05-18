import { PDFDownloadLink } from "@react-pdf/renderer";
import NavBar from "../../components/NavBar";
import Link from "next/link";

const Orders = ({ data }) => {
  return (
    <>
      <NavBar />
      <div className="bg-gray-100 min-h-screen md:p-10 p-2">
        <Link
          href="/orders/create_order"
          className="bg-[#002D74] rounded-md text-white p-2 hover:scale-105 duration-300"
        >
          Add Order
        </Link>
        <div className="text-center text-2xl font=[Poppins] text-[#002D74]">
          Orders
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
                    Item Name
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Quantity
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    State
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Edit Order
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((order, index) => (
                  <tr
                    key={order.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {++index}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {order.item.name}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {order.quantity}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {order.state}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <Link
                        href={`orders/edit_order/${order.id}`}
                        className="bg-[#002D74] rounded-md text-white p-2 hover:scale-105 duration-300"
                      >
                        Edit
                      </Link>
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
    const res = await fetch("http://localhost:4040/orders");
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

export default Orders;
