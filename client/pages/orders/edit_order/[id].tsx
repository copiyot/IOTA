import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";

import NavBar from "../../../components/NavBar";

const schema = yup
  .object({
    state: yup.string().required("State is required"),
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

  const onSubmit: SubmitHandler<FormData> = async (submitData) => {
    const { state } = submitData;

    const submitInventoryData = {
      state,
      itemId: data.item.id,
    };

    const JSONdata = JSON.stringify(submitInventoryData);

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    try {
      const res = await fetch(
        `http://localhost:4040/orders/${data.id}`,
        options
      );
      const resData = await res.json();

      if (resData.error) {
        alert(`${resData.message}`);
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
          <h2 className="font-bold text-2x1 text-[#002D74]">EDIT ORDER</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-row items-center justify-between mt-10">
              <span className="font-bold text-2x1 text-[#002D74]">
                Item name:
              </span>
              <span>{data.item.name}</span>
            </div>

            <div className="flex flex-row items-center justify-between mt-10">
              <span className="font-bold text-2x1 text-[#002D74]">
                Quantity:
              </span>
              <span>{data.quantity}</span>
            </div>

            <select
              id="item"
              className="p-2 rounded-xl border w-72 font-medium text-[#002D74]"
              defaultValue={data.state}
              {...register("state")}
            >
              <option value="Delivered">Delivered</option>
              <option value="Ordered">Ordered</option>
            </select>
            <div className="text-[13px] text-[#bf1650]">
              {errors.state?.message}
            </div>

            <button className="bg-[#002D74] w-72 rounded-xl text-white py-2 hover:scale-105 duration-300 sm:self-center">
              EDIT
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const id = context.query.id;
    const res = await fetch(`http://localhost:4040/orders/${id}`);
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
