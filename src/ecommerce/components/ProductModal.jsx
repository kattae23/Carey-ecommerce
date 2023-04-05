import React, { useEffect, useMemo } from 'react'
import { useState } from 'react';
import Modal from 'react-modal';
import { useCategoryStore, useUiStore } from '../../hooks';
import { useProductStore } from '../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const size = ["S", "M", "L", "XL"]

const color = ["brown", "blue", "red", "green", "yellow"];

const validationSchema = yup.object({
  name: yup.string().required('The name is required'),
  category: yup.object().shape({
    label: yup.string().required("Category is required"),
    value: yup.object().required("Category is required")
  }).nullable().required("Category is required"),
  size: yup.array().max(3, "Only 3 tags are allowed").min(1, "Choose at least one size").required("Provide at least one size"),
  color: yup.array().max(3, "Only 3 tags are allowed").min(1, "Choose at least one color").required("Provide at least one color"),
  price: yup.number().transform((value) => (isNaN(value) ? undefined : value)).nullable().required('The price must be at least 1').min(1, 'The price must be at least 1'),
  description: yup.string().required('The description is required'),
  stock: yup.number().transform((value) => (isNaN(value) ? undefined : value)).nullable().required('The stock must be at least 1').min(1, 'The stock must be at least 1'),
})

Modal.setAppElement('#root');

export const ProductModal = () => {

  const imageMimeType = /image\/(png|jpg|jpeg|webp|gif)/i;

  const [file, setFile] = useState(null);

  const changeHandler = (e) => {
      const file = e.target.files[0];
      if (!file.type.match(imageMimeType)) {
          alert("Image mime type is not valid");
          return;
      }
      setFile(file);
  }


  const { isProductModalOpen, closeProductModal } = useUiStore();

  const { setActiveProduct, startSavingProduct } = useProductStore();
  const { category } = useCategoryStore();

  const onCloseModal = () => {
    closeProductModal()
    setActiveProduct(null)
    setFile(null);
  }


  const [isLoading, setIsLoading] = useState(false);


  const { register, formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: {

    },
    resolver: yupResolver(validationSchema)
  })
  const onSubmit = async ({ price, description, stock, name, category, color, size }) => {

    await startSavingProduct({ name, price, file, category: category.value, size: size, color: color, description, stock });
    onCloseModal()
  }

  const colors = [
    {
      value: "brown",
      label: "brown"
    },
    {
      value: "red",
      label: "red"
    },
    {
      value: "yellow",
      label: "yellow"
    },
    {
      value: "green",
      label: "green"
    },
    {
      value: "blue",
      label: "blue"
    },
    {
      value: "black",
      label: "black"
    }
  ];

  const sizes = [
    {
      value: "S",
      label: "S"
    },
    {
      value: "XL",
      label: "XL"
    },
    {
      value: "L",
      label: "L"
    },
    {
      value: "EG",
      label: "EG"
    },
    {
      value: "M",
      label: "M"
    },
  ]

  let catList = category.map(cat => ({
    value: {
      _id: cat._id,
      name: cat.name
    },
    label: cat.name
  }))

  // set value for default selection



  // handle onChange event of the dropdown

  return (
    <Modal
      isOpen={isProductModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className='Modal'
      overlayClassName='Overlay'
      closeTimeoutMS={200}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="px-5 py-7">
          <div className=''>
            <div className='flex flex-col'>
              <label className="font-semibold text-sm text-gray-600 pb-1 block outline-none" >Product</label>
              <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full" name="name" {...register('name')} />
              <label className="font-semibold text-sm text-gray-600 pb-1 block" >Category</label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="react-dropdown"
                    classNamePrefix="dropdown"
                    isSearchable={false}
                    options={catList} // set list of the data
                  />)}
              />
              <div className='mt-4 mb-1'>
                <div className="App">
                  <h3>Size</h3>
                  <Controller
                    name="size"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className="react-dropdown"
                        classNamePrefix="dropdown"
                        maximumSelectionLength={3}
                        isMulti
                        options={sizes} // set list of the data
                      />)}
                  />
                </div>
              </div>
              <div className='mb-1'>
                <div className="App">
                  <h3>Color</h3>
                  <Controller
                    name="color"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className="react-dropdown"
                        classNamePrefix="dropdown"
                        isMulti
                        options={colors} // set list of the data
                      />)}
                  />
                </div>
              </div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" >Price</label>
              <div className='flex flex-row items-baseline'>
                <input type="number" min={1} minLength={1} className="border rounded-lg pl-2 py-2 mt-1 mb-1 text-sm w-14 " name="price" {...register('price')} />
                $
              </div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" >Description</label>
              <div className='flex flex-row items-baseline'>
                <textarea type="text" className="border rounded-lg pl-2 py-2 mt-1 mb-1 text-sm w-full  resize-none outline-none" name="description" {...register('description')} />
              </div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block" >Stock</label>
              <div className='flex flex-row items-baseline'>
                <input type="number" className="border rounded-lg pl-2 py-2 mt-1 mb-1 text-sm w-14 " name="stock" {...register('stock')} />
              </div>
              <label className="font-semibold text-sm text-gray-600 pb-1 block">Product Images</label>
              <input type="file" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" name="file" {...register('file')} onChange={changeHandler}
              />
            </div>
          </div>
          {
            (errors.name) ? <p className="text-left text-red-700 mb-4">{errors.name?.message}</p> : null || (errors.price) ? <p className="text-left text-red-700 mb-4">{errors.price?.message}</p> : null || (errors.description) ? <p className="text-left text-red-700 mb-4">{errors.description?.message}</p> : null || (errors.stock) ? <p className="text-left text-red-700 mb-4">{errors.stock?.message}</p> : null || (errors.category) ? <p className="text-left text-red-700 mb-4">{errors.category?.message || errors.category?.label?.message || errors.category?.value?.message}</p> : null || (errors.size) ? <p className="text-left text-red-700 mb-4">{errors.size?.message || errors.size?.label?.message || errors.size?.value?.message}</p> : null || (errors.color) ? <p className="text-left text-red-700 mb-4">{errors.color?.message || errors.color?.label?.message || errors.color?.value?.message}</p> : null
          }
          <div className='w-full flex items-center justify-center'>
            <button type="button" className="transition max-w-[100px] duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block" onClick={handleSubmit(onSubmit)}>
              {
                (isLoading ? (
                  <Spinner className='text-blue-800' />
                ) : (
                  <>
                    <span className="inline-block mr-2">Create</span>
                    {/* <i className="fa-solid fa-arrow-right w-4 h-4 inline-block"></i> */}
                  </>
                ))
              }
            </button>
          </div>
        </div>
      </form>
    </Modal>
  )
}