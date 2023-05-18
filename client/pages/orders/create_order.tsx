import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";

import NavBar from "../../components/NavBar";

const schema = yup
  .object({
    quantity: yup.number().required("Quantity is required").min(1),
    itemId: yup.number().required("Item is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const CreateOrder = ({ data }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { quantity, itemId } = data;

    const submitData = {
      itemId,
      quantity,
      state: "Ordered",
    };

    const JSONdata = JSON.stringify(submitData);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    try {
      const res = await fetch("http://localhost:4040/orders", options);
      const resData = await res.json();

      if (resData) {
        if (resData.error) {
          alert(`${resData.message}`);
        }
      }
      router.push("/orders");
    } catch (error) {
      alert("Ooops something went wrong: Contact admin");
    }
  };

  return data === "Ooops something went wrong" ? (
    "Ooops something went wrong"
  ) : (
    <>
      <NavBar />
      <div className="bg-gray-50 min-h-screen md:p-10 p-2">
        <div className="bg-gray-100 rounded-2xl shadow-lg max-w-3x1 p-5 items-center">
          <h2 className="font-bold text-2x1 text-[#002D74]">
            Add an item you wan&apos;t delivered
          </h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="p-2 rounded-xl border"
              type="number"
              {...register("quantity")}
              placeholder="Quantiy"
            />
            <div className="text-[13px] text-[#bf1650]">
              {errors.quantity?.message}
            </div>

            <label
              className="bg-white text-[#002D74] w-72 p-2 flex items-center justify-between rounded"
              htmlFor="item"
            >
              Select an Item
            </label>
            <select
              id="item"
              className="p-2 rounded-xl border w-72 font-medium text-[#002D74]"
              {...register("itemId")}
            >
              {data.map((order) => (
                <option key={order.id} value={order.id}>
                  {order.name}
                </option>
              ))}
            </select>
            <div className="text-[13px] text-[#bf1650]">
              {errors.itemId?.message}
            </div>

            <button className="bg-[#002D74] w-72 rounded-xl text-white py-2 hover:scale-105 duration-300 sm:self-center">
              Place Order
            </button>
          </form>
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

export default CreateOrder;
