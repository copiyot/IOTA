import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";

import NavBar from "../../../components/NavBar";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    price: yup.number().required("Price is required"),
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
    const { name, price } = submitData;

    const submitInventoryData = {
      name,
      price,
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
        `http://localhost:4040/items/${data.id}`,
        options
      );
      const resData = await res.json();

      if (resData.error) {
        alert(`${resData.message}`);
      }
      router.push("/");
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
          <h2 className="font-bold text-2x1 text-[#002D74]">EDIT ITEM</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="p-2 rounded-xl border"
              type="text"
              defaultValue={data.name}
              {...register("name")}
              placeholder="Item name"
            />
            <div className="text-[13px] text-[#bf1650]">
              {errors.name?.message}
            </div>

            <input
              className="p-2 rounded-xl border"
              type="number"
              defaultValue={data.price}
              {...register("price")}
              placeholder="Price"
            />
            <div className="text-[13px] text-[#bf1650]">
              {errors.price?.message}
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
    const res = await fetch(`http://localhost:4040/items/${id}`);
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
