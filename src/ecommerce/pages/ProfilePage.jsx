

import React from 'react'
import { useSelector } from 'react-redux'
import { Footer, Navbar } from '../../ui/components'
import { VITE_API_URL } from '../../api/ecommerceApi'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAuthStore, useCategoryStore, useCheckoutStore, useProductStore, useUiStore } from '../../hooks'
import { Outlet } from 'react-router-dom'
import { ProductModal } from '../components/ProductModal'
import { CategoryList, CategoryModal, CheckoutList, ProductList, ProductModalUpdate, UsersList } from '../components'
import { Select } from '@mui/material'
import { MenuItem } from '@mui/material'
import { filtered } from '../components/hooks/filtered'
import { filteredUsers } from '../components/hooks/filteredUsers'
import { filteredCheckouts } from '../components/hooks/filteredCheckouts'
import { filteredSales } from '../components/hooks/filteredSales'
import { filteredCategory } from '../components/hooks/filteredCategory'
import { SalesList } from '../components/SalesList'



export const ProfilePage = () => {

    const { startUpdateUserBackground, startUpdateUserImg, user } = useAuthStore();

    const [onOpen, setOnOpen] = useState(false);

    const { users } = useSelector(state => state.users);

    const onHandleClick = () => {
        setOnOpen(!onOpen)
    }


    // file preview con inputRef 
    let inputRef

    const imageMimeType = /image\/(png|jpg|jpeg)/i;

    const [file, setFile] = useState(null);

    const [fileDataURL, setFileDataURL] = useState(null);

    const changeHandler = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setFile(file);
    }
    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(file);
            startUpdateUserBackground({ file, id: user.uid })
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);

    // button of the url image
    let inputRef2

    const [file2, setFile2] = useState(null);

    const [fileDataURL2, setFileDataURL2] = useState(null);

    const changeHandler2 = (e) => {
        const file2 = e.target.files[0];
        if (!file2.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setFile2(file2);

    }
    useEffect(() => {
        let fileReader2, isCancel2 = false;
        if (file2) {
            fileReader2 = new FileReader();
            fileReader2.onload = (e) => {
                const { result2 } = e.target;
                if (result2 && !isCancel2) {
                    setFileDataURL2(result2)
                }
            }
            fileReader2.readAsDataURL(file2);
            startUpdateUserImg({ file: file2, id: user.uid })
        }
        return () => {
            isCancel2 = true;
            if (fileReader2 && fileReader2.readyState === 1) {
                fileReader2.abort();
            }
        }

    }, [file2]);

    const { openProductModal, openProductModal2 } = useUiStore();
    const { setActiveProduct, products, startLoadingProducts, startSavingProduct, startDeleteProduct, startNextPage, startSearchProduct } = useProductStore();
    const { startLoadingCategory, category } = useCategoryStore();
    const { checkouts } = useCheckoutStore();

    const handleClickNew = ({ product }) => {
        setActiveProduct(null);
        openProductModal()
    }

    const handleClick2 = () => {
        setActiveProduct(null);
        openProductModal2()
    }



    const [currentPage, setCurrentPage] = useState(0)

    let [search, setSearch] = useState('');

    const onSearchEvent = ({ target }) => {
        setCurrentPage(0)
        setSearch(target.value)
    }

    let [searchPro, setSearchPro] = useState('');
    let [targetSearch, setTargetSearch] = useState('products');

    const onSearchSubmit = (event) => {
        event.preventDefault()
        setSearchPro(search)

        startSearchProduct({ search: search })
    }

    const onInputChange = ({ target }) => {
        setTargetSearch(target.value)
    }

    const productList = filtered({ searchPro, currentPage: currentPage, filterItem: products, filterText: search, user })
    const categoryList = filteredCategory({ searchPro, currentPage: currentPage, filterItem: category, filterText: search })
    const checkoutList = filteredCheckouts({ searchPro, currentPage: currentPage, filterItem: checkouts, filterText: search, user })
    const usersList = filteredUsers({ searchPro, currentPage: currentPage, filterItem: users, filterText: search })
    const salesList = filteredSales({ searchPro, currentPage: currentPage, filterItem: checkouts, filterText: search, user })


    const prevPage = () => {
        if (currentPage > 0)
            setCurrentPage(currentPage - 5);
    }

    const nextPage = () => {

        if (products.length > currentPage + 5) {
            setCurrentPage(currentPage + 5);
            return;
        }
        else if (users.length > currentPage + 5) {
            setCurrentPage(currentPage + 5);
            return;
        }
        else if (category.length > currentPage + 5) {
            setCurrentPage(currentPage + 5);
            return;
        }
    }


    return (
        <>
            <Navbar />
            <div className='relative flex w-full h-auto'>
                <div className='relative w-full h-80 flex'>
                    <div className='absolute flex items-center w-full h-80 justify-center overflow-hidden'>
                        {fileDataURL ?
                            <>
                                {
                                    <img src={fileDataURL} alt={`user background image`} className='w-full object-cover -z-10' />
                                }
                            </> : (
                                <img src={user.urlBackgroundImgThumb} alt={`user background image`} className='w-full object-cover -z-10' />
                            )}
                    </div>
                    <div className='w-40 h-40 ml-6 items-center z-10 absolute justify-center flex rounded-full overflow-hidden mb-1 bottom-0'>
                        <div className={`absolute w-52 h-52 overflow-hidden rounded-full flex justify-center items-center`}>
                            <input
                                type="file"
                                name="file"
                                hidden={true}
                                ref={refParam2 => inputRef2 = refParam2}
                                id="image"
                                onChange={changeHandler2}
                            />
                            <button
                                type='button'
                                onClick={() => inputRef2.click()}
                                id={'button'}
                                className="w-full"
                            >
                                {fileDataURL2 ?
                                    <p className="img-preview-wrapper">
                                        {
                                            <img src={fileDataURL2} key={user.urlImgThumb} alt="preview" />
                                        }
                                    </p> : (
                                        <img src={user.urlImgThumb} key={user.urlImgThumb} className='w-full ' />
                                    )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=''>
                <div className='relative w-auto mx-10 mt-2 '>
                    <div className='flex flex-row items-center'>
                        <h1 className='text-2xl text-gray-700 font-semibold select-none cursor-pointer'>{user.firstName} {user.lastName}</h1>
                        <button type='button' onClick={onHandleClick}>
                            <i className="fa-solid text-gray-700 fa-pen-to-square text-[20px] ml-1 mt-1"></i>
                        </button>
                    </div>
                    <div className={`absolute ${(onOpen === true && 'flex' || 'hidden')} flex-col left-5 w-48 h-auto bg-white rounded-b-2xl`}>
                        <Link to={'/settings/profile'} className='font-medium py-2 hover:text-gray-500 hover:bg-slate-200 rounded-md px-3 text-gray-600'>Change Name</Link>
                        <input
                            type="file"
                            name="file"
                            hidden={true}
                            ref={refParam => inputRef = refParam}
                            id="image"
                            onChange={changeHandler}
                        />
                        <button
                            type='button'
                            onClick={() => inputRef.click()}
                            id={'button'}
                            className=" text-gray-600 text-left py-2 px-3 font-medium hover:text-gray-500 hover:bg-slate-200 rounded-md"
                        >
                            Change Background
                        </button>
                    </div>
                    {
                        (user.role === 'ADMIN_ROLE') && <p className='font-medium text-gray-600 text-xl'>Admin</p> || (user.role === 'USER_ROLE') && <p className='font-medium text-gray-600 text-xl'>User</p>
                    }

                </div>
                <div className='flex flex-col mx-10 mt-5'>
                    <h1 className='font-medium text-gray-600'>Products Sold: {user.totalProductsSold}</h1>
                    <h1 className='font-medium text-gray-600'>Total $ Sold: $ {user.totalSold}</h1>
                    <h1 className='font-medium text-gray-600'>Products Purchased: {user.totalProductsPurchased}</h1>
                    <h1 className='font-medium text-gray-600'>Total Spend: $ {user.totalSpend}</h1>
                </div>
            </div>
            {/* // Own Product section */}
            <div className='mt-10 w-full text-center'>
                <h1 className='text-3xl font-medium text-gray-600 mb-5'>{((targetSearch === 'products') ? 'Products' : null) || ((targetSearch === 'users') ? 'Users' : null) || ((targetSearch === 'category') ? 'Category' : null) || ((targetSearch === 'checkouts') ? 'Checkout' : null) || ((targetSearch === 'sales') ? 'Sales' : null)}</h1>
                {
                    (user.role === 'ADMIN_ROLE')
                        ? <>
                            <Select
                                onChange={onInputChange}
                                defaultValue={'products'}
                            >
                                <MenuItem value='products' >Products</MenuItem>
                                <MenuItem value='category'>Categories</MenuItem>
                                <MenuItem value='users'>Users</MenuItem>
                                <MenuItem value='checkouts'>Checkouts</MenuItem>
                                <MenuItem value='sales'>Sales</MenuItem>
                            </Select>
                        </>
                        : null
                }
                {
                    (user.role === 'USER_ROLE')
                        ? <>
                            <Select
                                onChange={onInputChange}
                                defaultValue={'products'}
                            >
                                <MenuItem value='products' >Products</MenuItem>
                                <MenuItem value='checkouts'>Checkouts</MenuItem>
                                <MenuItem value='sales'>Sales</MenuItem>
                            </Select>
                        </>
                        : null
                }
            </div>
            <div className='md:mt-10 w-full flex flex-wrap justify-center items-center'>
                <div className="bg-white p-8 rounded-md w-full">
                    <div className="flex flex-col md:flex-row items-center justify-between pb-6">
                        <div>
                            <h2 className="text-gray-600 text-sm font-semibold uppercase">{targetSearch} Order</h2>
                            <span className="text-xs">All products item</span>
                        </div>
                        <div className="flex flex-col md:flex-row  items-center justify-between">
                            <div className="flex bg-gray-50 items-center p-2 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fillRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clipRule="evenodd" />
                                </svg>

                                <form onSubmit={onSearchSubmit}>
                                    <input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder={`${(targetSearch === 'products') && 'Search by product name' || (targetSearch === 'category') && 'Search by category name' || (targetSearch === 'users') && 'Search by first name' || (targetSearch === 'checkouts') && 'Search by last 8 characters of the order id'}`} value={search} onChange={onSearchEvent} title={`${(targetSearch === 'products') && 'Search by product name' || (targetSearch === 'category') && 'Search by category name' || (targetSearch === 'users') && 'Search by first name' || (targetSearch === 'checkouts') && 'Search by Order Id' || (targetSearch === 'sales') && 'Search sales'}`} />
                                </form>
                            </div>
                            <div className="flex flex-col md:flex-row lg:ml-40 md:ml-10 md:space-x-8">
                                {
                                    user.role === 'ADMIN_ROLE' && (targetSearch === 'category') ?
                                        (
                                            <button className="bg-indigo-600 mb-5 mt-5 md:mb-0 md:mt-0 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" onClick={handleClick2}>New Category</button>
                                        )
                                        :
                                        (
                                            null
                                        )
                                }
                                {
                                    (targetSearch === 'products') ?
                                        (
                                            <button className="mb-5 mt-5 md:mb-0 md:mt-0 bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" onClick={handleClickNew}>New Product</button>
                                        )
                                        :
                                        (
                                            null
                                        )
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="-mx-4 sm:-mx-8 md:px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            {
                                                (user.role === 'ADMIN_ROLE')
                                                    ? (
                                                        <>
                                                            {
                                                                (targetSearch === 'products')
                                                                    ? (
                                                                        <>
                                                                            <th
                                                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Product Name
                                                                            </th>
                                                                            <th
                                                                                className="hidden md:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Seller
                                                                            </th>
                                                                            <th
                                                                                className="hidden md:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Created at
                                                                            </th>
                                                                            <th
                                                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Price
                                                                            </th>
                                                                            <th
                                                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Status
                                                                            </th>
                                                                        </>
                                                                    )
                                                                    : null
                                                            }
                                                            {
                                                                (targetSearch === 'users')
                                                                    ? (
                                                                        <>
                                                                            <th
                                                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                User Name
                                                                            </th>
                                                                            <th
                                                                                className="hidden md:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Google
                                                                            </th>
                                                                            <th
                                                                                className=" px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Role
                                                                            </th>
                                                                            <th
                                                                                className="hidden md:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Products
                                                                            </th>
                                                                            <th
                                                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Status
                                                                            </th>
                                                                        </>
                                                                    )
                                                                    : null
                                                            }
                                                            {
                                                                (targetSearch === 'category')
                                                                    ? (
                                                                        <>
                                                                            <th
                                                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Category Name
                                                                            </th>
                                                                            <th
                                                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">

                                                                            </th>
                                                                            <th
                                                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">

                                                                            </th>
                                                                            <th
                                                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">

                                                                            </th>
                                                                            <th
                                                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Status
                                                                            </th>
                                                                        </>
                                                                    )
                                                                    : null
                                                            }
                                                            {
                                                                (targetSearch === 'checkouts')
                                                                    ? (
                                                                        <>
                                                                            <th
                                                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Products
                                                                            </th>
                                                                            <th
                                                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Order ID
                                                                            </th>
                                                                            <th
                                                                                className="px-5 hidden md:table-cell py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Total Price
                                                                            </th>
                                                                            <th
                                                                                className="px-5 hidden md:table-cell  py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Created at
                                                                            </th>
                                                                            <th
                                                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Status
                                                                            </th>
                                                                        </>
                                                                    )
                                                                    : null
                                                            }
                                                            {
                                                                (targetSearch === 'sales')
                                                                    ? (
                                                                        <>
                                                                            <th
                                                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Sales
                                                                            </th>
                                                                            <th
                                                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Order ID
                                                                            </th>
                                                                            <th
                                                                                className="px-5 hidden md:table-cell py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Total Price
                                                                            </th>
                                                                            <th
                                                                                className="px-5 hidden md:table-cell  py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Created at
                                                                            </th>
                                                                            <th
                                                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                                Status
                                                                            </th>
                                                                        </>
                                                                    )
                                                                    : null
                                                            }
                                                        </>
                                                    )
                                                    : <>
                                                        <>
                                                            <th
                                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                Product Name
                                                            </th>
                                                            <th
                                                                className="hidden md:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                Seller
                                                            </th>
                                                            <th
                                                                className="hidden md:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                Created at
                                                            </th>
                                                            <th
                                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                Price
                                                            </th>
                                                            <th
                                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                                Status
                                                            </th>
                                                        </>
                                                    </>
                                            }

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            (user.role === 'ADMIN_ROLE')
                                                ? <>
                                                    {
                                                        (targetSearch === 'products')
                                                            ? (
                                                                <>
                                                                    {
                                                                        productList.map((product, index) => (
                                                                            (product.user.firstName === user.firstName)
                                                                                ?
                                                                                <ProductList className='cursor-pointer' startSavingProduct={startSavingProduct} startDeleteProduct={startDeleteProduct} key={index} {...product} product={product} />
                                                                                : null
                                                                        ))
                                                                    }
                                                                </>
                                                            )
                                                            : null
                                                    }
                                                    {
                                                        (targetSearch === 'users')
                                                            ? (
                                                                <>
                                                                    {
                                                                        usersList.map((user, index) => (
                                                                            <UsersList key={index} {...user} />
                                                                        ))
                                                                    }
                                                                </>
                                                            )
                                                            : null
                                                    }
                                                    {
                                                        (targetSearch === 'category')
                                                            ? (
                                                                <>
                                                                    {
                                                                        categoryList.map((category, index) => (
                                                                            <CategoryList key={index} {...category} />
                                                                        ))
                                                                    }
                                                                </>
                                                            )
                                                            : null
                                                    }
                                                    {
                                                        (targetSearch === 'checkouts')
                                                            ? (
                                                                <>
                                                                    {
                                                                        checkoutList.map((checkout, index) => (
                                                                            <CheckoutList key={index} {...checkout} />
                                                                        ))
                                                                    }
                                                                </>
                                                            )
                                                            : null
                                                    }
                                                    {
                                                        (targetSearch === 'sales')
                                                            ? (
                                                                <>
                                                                    {
                                                                        salesList.map((sales, index) => (
                                                                            <SalesList key={index} {...sales} />
                                                                        ))
                                                                    }
                                                                </>
                                                            )
                                                            : null
                                                    }
                                                </>
                                                : <>
                                                    {/* {
                                                        productList.map((product, index) => (
                                                            (product.user.firstName === user.firstName)
                                                                ?
                                                                <ProductList className='cursor-pointer' startSavingProduct={startSavingProduct} startDeleteProduct={startDeleteProduct} key={index} {...product} />
                                                                : null
                                                        ))
                                                    } */}
                                                </>
                                        }
                                        {
                                            (user.role === 'USER_ROLE')
                                                ? <>
                                                    {
                                                        (targetSearch === 'products')
                                                            ? (
                                                                <>
                                                                    {
                                                                        productList.map((product, index) => (
                                                                            (product.user.firstName === user.firstName)
                                                                                ?
                                                                                <ProductList className='cursor-pointer' startSavingProduct={startSavingProduct} startDeleteProduct={startDeleteProduct} key={index} {...product} product={product} />
                                                                                : null
                                                                        ))
                                                                    }
                                                                </>
                                                            )
                                                            : null
                                                    }
                                                    {
                                                        (targetSearch === 'checkouts')
                                                            ? (
                                                                <>
                                                                    {
                                                                        checkoutList.map((checkout, index) => (
                                                                            <CheckoutList key={index} {...checkout} />
                                                                        ))
                                                                    }
                                                                </>
                                                            )
                                                            : null
                                                    }
                                                    {
                                                        (targetSearch === 'sales')
                                                            ? (
                                                                <>
                                                                    {
                                                                        salesList.map((checkout, index) => (
                                                                            <CheckoutList key={index} {...checkout} />
                                                                        ))
                                                                    }
                                                                </>
                                                            )
                                                            : null
                                                    }
                                                </>
                                                : <>
                                                    {/* {
                                                        productList.map((product, index) => (
                                                            (product.user.firstName === user.firstName)
                                                                ?
                                                                <ProductList className='cursor-pointer' startSavingProduct={startSavingProduct} startDeleteProduct={startDeleteProduct} key={index} {...product} />
                                                                : null
                                                        ))
                                                    } */}
                                                </>
                                        }

                                    </tbody>
                                </table>
                                <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                                    <span className="text-xs xs:text-sm text-gray-900">
                                        {/* Showing 1 to {filteredProducts().length} of {products.length} Entries */}
                                        Showing 1 to {targetSearch === 'products' ? productList.length : null || targetSearch === 'category' ? categoryList.length : null || targetSearch === 'users' ? usersList.length : null || targetSearch === 'checkouts' ? checkoutList.length : null || targetSearch === 'sales' ? salesList.length : null} Entries
                                    </span>
                                    <div className="inline-flex mt-2 xs:mt-0">
                                        <button
                                            onClick={prevPage}
                                            className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                            Prev
                                        </button>
                                        &nbsp; &nbsp;
                                        <button
                                            onClick={nextPage}
                                            className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductModal />
            <ProductModalUpdate />
            <CategoryModal />
            <Footer />
        </>
    )
}