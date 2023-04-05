import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { addToCart } from "../../store/ecommerce/ecommerceSlice";
import { Footer, Navbar } from "../../ui/components"
import { getProductById } from "../hooks";
import { SearchPage } from "./SearchPage";



export const ProductPage = () => {


    const { id } = useParams()

    const dispatch = useDispatch()

    const [pro, setPro] = useState([]);

    const product = getProductById(id)

    useEffect(() => {
        if (product.length > 0) {
            setPro(product)
        }
    }, [product]);

    const [selectedOptionSize, setSelectedOptionSize] = useState([]);


    const [selectedOptionColor, setSelectedOptionColor] = useState([]);

    const [disabled, setDisabled] = useState(false);

    const onDisabled = () => {
        setDisabled(true)
    }

    let productSizeList;

    let productColorList;

    if (pro.length > 0) {
        productColorList = pro[0].color.map(color => ({
            value: color.value,
            label: color.label,
        }))

        productSizeList = pro[0].size.map(size => ({
            value: size.value,
            label: size.label,
        }))
    }

    if (pro.length > 0) {
        return (
            <>
                <Navbar />
                <div className="px-6 md:px-24 mt-5 md:my-20">
                    <div className="w-full relative">
                        <div className="w-full relative flex lg:flex-row items-center flex-col">
                            <div className="w-full lg:w-1/2 h-[350px] md:h-[520px] relative rounded-lg overflow-hidden flex items-center justify-center" >
                                <img src={pro[0].urlImgThumb} alt="" className='h-full  relative max-w-none rounded-lg' />
                            </div>
                            <div className="lg:w-1/2 flex justify-center items-center">
                                <div className="min-w-[400px] w-auto h-auto p-10">
                                    <h1 className="font-bold text-xl">{pro[0].name}</h1>
                                    <h1 className="font-bold text-xl text-orange-400 mb-2 mt-2">15% OFF</h1>
                                    <h1 className="font-bold text-gray-400 text-xl mb-4 mt-5">{pro[0].description}</h1>

                                    <h1 className="text-2x1 mb-2">Stock: </h1>
                                    <div className="text-2xl text-orange-600 font-bold mb-10">
                                        <h1>{pro[0].stock}</h1>
                                    </div>
                                    <div className='mb-4'>
                                        <div className="App">
                                            <h3>Size</h3>
                                            <Select
                                                defaultValue={[]}
                                                className="dropdown"
                                                placeholder="Select Option"
                                                value={selectedOptionSize} // set selected values
                                                options={productSizeList} // set list of the data
                                                onChange={setSelectedOptionSize} // assign onChange function
                                                single
                                                isClearable
                                            />
                                        </div>
                                    </div>
                                    <div className='mb-10'>
                                        <div className="App">
                                            <h3>Color</h3>
                                            <Select
                                                defaultValue={[]}
                                                className="dropdown"
                                                placeholder="Select Option"
                                                value={selectedOptionColor} // set selected values
                                                options={productColorList} // set list of the data
                                                onChange={setSelectedOptionColor} // assign onChange function
                                                single
                                                isClearable
                                            />
                                        </div>
                                    </div>
                                    <h1 className="text-2x1 mb-2">Price: </h1>
                                    <div className="text-2xl text-orange-600 font-bold mb-10">
                                        <h1>{pro[0].price} $</h1>
                                    </div>
                                    <h1 className="text-2x1 mb-2">Sales: </h1>
                                    <div className="text-2xl text-orange-600 font-bold mb-10">
                                        <h1>{pro[0].sold}</h1>
                                    </div>
                                    <div>

                                        <div className='w-full justify-center pt-2 pb-5 text-gray-800'>
                                            {
                                                (disabled == true) ? <p className=''>You need to choose the size and color.</p> : null
                                            }
                                            {
                                                (pro[0].stock < 1) ? <p className='mt-2'>This product is out of stock.</p> : null
                                            }
                                        </div>
                                        {
                                            (selectedOptionColor !== null && selectedOptionSize !== null && pro[0].stock !== 0) ? (
                                                (selectedOptionColor.length !== 0 && selectedOptionSize.length !== 0 && pro[0].stock !== 0) ?
                                                    <>
                                                        <button
                                                            className="py-3 px-7  bg-white text-gray-400 hover:text-gray-300 transition-all duration-150 font-medium text-sm border border-gray-400 uppercase rounded-lg" title="Add to Cart"
                                                            onClick={() =>
                                                                dispatch(
                                                                    addToCart({
                                                                        _id: pro[0]._id,
                                                                        name: pro[0].name,
                                                                        img: pro[0].img,
                                                                        urlImgThumb: pro[0].urlImgThumb,
                                                                        description: pro[0].description,
                                                                        user: pro[0].user,
                                                                        size: selectedOptionSize,
                                                                        color: selectedOptionColor,
                                                                        price: pro[0].price,
                                                                        amount: 1,
                                                                        totalPrice: pro[0].price,
                                                                    })
                                                                )
                                                            }
                                                        >
                                                            Add to Cart
                                                        </button>
                                                    </>
                                                    : <button onClick={onDisabled} className={`py-3 px-7  bg-white text-gray-400 hover:text-gray-300 transition-all duration-150 font-medium text-sm border border-gray-400 uppercase rounded-lg`} title="Add to Cart">
                                                        Add to Cart
                                                    </button>
                                            )
                                                :
                                                (
                                                    <button onClick={onDisabled} className={`py-3 px-7  bg-white text-gray-400 hover:text-gray-300 transition-all duration-150 font-medium text-sm border border-gray-400 uppercase rounded-lg`} title="Add to Cart">
                                                        Choose
                                                    </button>
                                                )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    } else {
        return (
            <>
                <Navbar />
                <div className="w-full h-[700px] flex justify-center relative flex-col bg-slate-100">
                    <div className="px-11 md:px-20 h-full flex justify-center flex-col relative">
                        <h1 className="lg:text-6xl text-4xl font-[800]">I have bad <br /> news for you</h1>
                        <p className="text-base text-gray-500 mt-7 font-normal">The product you are looking for might <br /> be removed or temporary unavailable</p>
                        <div className="mt-12">
                            <Link to={'/search'} className="mt-14 rounded-lg py-3 bg-blue-400 text-white px-3">
                                Back to Search
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}
