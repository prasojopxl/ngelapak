import { useEffect, useState } from "react"
import { fetchData } from "../utils/services"
import { useDispatch } from "react-redux";
import { addCartItem, minCartItem } from "../redux/cartSlice"
import { useSelector } from "react-redux";
import { cartSelector } from "../utils/var";
import _ from "lodash"
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

export default function ProductList() {
    const [products, setProducts] = useState([])
    const [isLoading, setLoading] = useState(true)
    const listCart = useSelector(cartSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        fetchData("/products").then((data) => {
            setProducts(data)
            setLoading(false)
        })
    }, [])
    const addProduct = (products) => {
        dispatch(addCartItem(products))
    }
    const removeCartItem = (products) => {
        dispatch(minCartItem(products))
    }
    return (
        <div className="wrapper">
            {
                isLoading ? <div className="animate-pulse w-full h-[100px] bg-blue-50 flex justify-center items-center mt-9">Loading ...</div> :
                    <div className="w-full h-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 py-9">
                        {
                            products.map((products) => {
                                return (
                                    <div key={products.id} className="bg-white group rounded-xl border shadow p-4 w-full">
                                        <div className="relative w-[80%] h-[350px] mx-auto overflow-hidden">
                                            <img src={products.image} alt={products.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ease-in-out" />
                                        </div>
                                        <div className="flex flex-col gap-6  mt-8">
                                            {
                                                _.find(listCart, { id: products.id }) ? (
                                                    null
                                                ) : <button
                                                    type="button"
                                                    className="bg-blue-700 hover:bg-blue-800 text-white text-sm py-3 px-8 font-bold  rounded-lg"
                                                    onClick={() => addProduct(products)}
                                                >
                                                    Buy Now
                                                </button>

                                            }
                                            {
                                                _.find(listCart, { id: products.id }) ? (
                                                    <div className="flex justify-between max-w-[200px] mx-auto items-center">
                                                        <button
                                                            type="button"
                                                            className="bg-blue-700 hover:bg-blue-800 text-white text-sm py-3 px-8 font-bold  rounded-lg"
                                                            onClick={() => addProduct(products)}
                                                        >
                                                            +
                                                        </button>
                                                        <div className="text-lg min-w-[20px] text-center">
                                                            {
                                                                _.find(listCart, { id: products.id }).quantity
                                                            }
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="bg-red-700 hover:bg-red-800 text-white text-sm py-3 px-8 font-bold  rounded-lg"
                                                            onClick={() => removeCartItem(products)}
                                                        >
                                                            -
                                                        </button>
                                                    </div>
                                                ) : null
                                            }
                                            <div className="flex flex-col gap-2">
                                                <h4 className="opacity-50 mt-0 uppercase text-sm">{products.category}</h4>
                                                <h3 className="font-bold text-2xl mb-0">{products.title}</h3>
                                                <div className="flex items-center gap-[2px] text-xs">
                                                    {products.rating.rate > 1 ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
                                                    {products.rating.rate > 2 ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
                                                    {products.rating.rate > 3 ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
                                                    {products.rating.rate > 4 ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
                                                    {products.rating.rate == 5 ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
                                                    {products.rating.rate} From <div>{products.rating.count}</div>
                                                </div>

                                                <h3 className=" text-lg font-light  py-1">$<i>{products.price}</i></h3>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

            }
        </div>
    )
}
