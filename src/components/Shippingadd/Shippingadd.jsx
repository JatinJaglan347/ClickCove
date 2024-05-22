// RegisterForm.js
import React from "react";
import { useForm } from "react-hook-form";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { Link } from 'react-router-dom';

const fields = [
  {
    label: "Alternate Email (optional)",
    type: "email",
    placeholder: "user@example.com",
    required: false,
    gridCols: 2,
  },
  {
    label: "Phone *",
    type: "tel",
    placeholder: "123456789",
    required: true,
    gridCols: 2,
  },
  {
    label: "Address *",
    type: "text",
    placeholder: "#123 Main St, City, Country",
    required: true,
    gridCols: 2,
  },
  {
    label: "Country *",
    type: "text",
    placeholder: "Country",
    required: true,
    gridCols: 1,
  },
  {
    label: "State *",
    type: "text",
    placeholder: "abc",
    required: true,
    gridCols: 1,
  },
  {
    label: "City *",
    type: "text",
    placeholder: "xyz",
    required: true,
    gridCols: 1,
  },
  {
    label: "Pincode *",
    type: "number",
    placeholder: "XXXXX",
    required: true,
    gridCols: 1,
  },
];

export default function Shippingadd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // You can perform further actions with the form data here
  };
  return (
    <div className="">
      <div className="container mx-auto ">
        <div className="lg:w-7/12 mg:p-10 pb-10 pt-5 w-full p-10 flex flex-wrap justify-center  my-20 rounded-md mx-auto bg-[#141314] border border-[#222122]  text-[#D8D6DC] shadow-xl shadow-[#0c0c0c]">
          <div className="pb-8 pt-5">
            <h1 className="text-3xl font-bold">Billing Address</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-start items-center w-full m-auto"
          >
            <div className="grid grid-cols-1 mb-8 md:grid-cols-2 gap-7 w-full">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className={`text-left flex flex-col gap-2 w-full ${
                    field.gridCols === 2 ? "md:col-span-2" : ""
                  }`}
                >
                  <label className="font-semibold">{field.label}</label>
                  <input
                    {...register(field.label.toLowerCase(), {
                      required: field.required,
                    })}
                    className={`border border-gray-300 focus:ring-gray-400 disabled:opacity-50 bg-transparent  placeholder:text-gray-400 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500 ${
                      field.gridCols === 2 ? "md:w-full" : ""
                    }`}
                    type={field.type}
                    placeholder={field.placeholder}
                  />
                  {errors[field.label.toLowerCase()] && (
                    <span>This field is required</span>
                  )}
                </div>
              ))}
            </div>

            <div className="w-full text-left">
            <Link to="/">
              <button
                type="submit"
                className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-[#000000] text-white text-md font-bold border border-[#000000] rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-[#27252B] hover:text-gray-400 lg:m-0 md:px-6"
                title="Confirm Order"
              >
                <span>Checkout</span>
                <HiOutlineArrowCircleRight size={20} />
              </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}