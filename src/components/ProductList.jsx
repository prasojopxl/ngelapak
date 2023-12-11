import { useDispatch } from "react-redux";
import { addCartItem, minCartItem } from "../redux/cartSlice"
import { useSelector } from "react-redux";
import { cartSelector, productSelector } from "../utils/var";
import _ from "lodash"
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { sortProduct, filterProduct, getData } from "../redux/productSlice";
import { motion } from "framer-motion"


export default function ProductList() {
    const listCart = useSelector(cartSelector)
    const listProd = useSelector(productSelector)
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.isLoading);

    const addProduct = (products) => {
        dispatch(addCartItem(products))
    }

    const removeCartItem = (products) => {
        dispatch(minCartItem(products))
    }

    const getSortBy = (sortValue) => {
        dispatch(sortProduct(sortValue))
    }

    const getFilterBy = (filterValue) => {
        dispatch(filterProduct(filterValue))
    }

    const listCategory = () => {
        let getUniq = _.uniqBy(getData, "category")
        return _.map(getUniq, "category")
    }
    return (
        <>
            {
                isLoading ? <div className="flex justify-center items-center w my-7">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            loop: Infinity
                        }}
                    >
                        <div className="w-[100px] h-[100px] bggradient flex justify-center items-center text-center text-white rounded-md">
                            <div>
                                <div>Nge</div>
                                <div>Loading</div>
                            </div>
                        </div>
                    </motion.div >
                </div> :
                    <div className="wrapper">
                        <div className="flex justify-between my-7">
                            <div className="relative flex gap-2 items-center">
                                Category
                                <select className="bg-blue-50 px-4 py-2 capitalize" onChange={(e) => getFilterBy(e.target.value)}>
                                    <option value="All" >All</option>
                                    {
                                        listCategory().map((item, i) => {
                                            return (
                                                <option key={i} value={item}>{item}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="right flex gap-2 items-center">
                                Sort By
                                <select className="bg-blue-50 px-4 py-2 text-black" onChange={(e) => getSortBy(e.target.value)}>
                                    <option value="atoz">A to Z</option>
                                    <option value="ztoa">Z to A</option>
                                    <option value="lowprice">Low Price</option>
                                    <option value="highprice">High Price</option>
                                </select>

                            </div>
                        </div >
                        <div className="w-full h-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 py-9">
                            {
                                listProd.map((item) => {
                                    return (
                                        <div key={item.id} className="bg-white group rounded-xl border shadow p-4 w-full">
                                            <div className="relative w-[80%] h-[350px] mx-auto overflow-hidden">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ease-in-out" />
                                            </div>
                                            <div className="flex flex-col gap-6  mt-8">
                                                {
                                                    _.find(listCart, { id: item.id }) ? (
                                                        null
                                                    ) : <button
                                                        type="button"
                                                        className="bg-slate-700 hover:bg-slate-900 text-white text-sm py-3 px-8 font-bold  rounded-lg"
                                                        onClick={() => addProduct(item)}
                                                    >
                                                        Buy Now
                                                    </button>

                                                }
                                                {
                                                    _.find(listCart, { id: item.id }) ? (
                                                        <div className="flex justify-between max-w-[200px] mx-auto items-center">
                                                            <button
                                                                type="button"
                                                                className="bg-c-red hover:bg-red-800 text-white text-sm py-3 px-8 font-bold  rounded-lg"
                                                                onClick={() => removeCartItem(item)}
                                                            >
                                                                -
                                                            </button>

                                                            <div className="text-lg min-w-[20px] text-center px-4">
                                                                {
                                                                    _.find(listCart, { id: item.id }).quantity
                                                                }
                                                            </div>

                                                            <button
                                                                type="button"
                                                                className="bg-slate-700 hover:bg-slate-900 text-white text-sm py-3 px-8 font-bold  rounded-lg"
                                                                onClick={() => addProduct(item)}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    ) : null
                                                }
                                                <div className="flex flex-col gap-2">
                                                    <h4 className="opacity-50 mt-0 uppercase text-sm">{item.category}</h4>
                                                    <h3 className="font-bold text-2xl mb-0">{item.title}</h3>
                                                    <div className="flex items-center gap-[2px] text-xs">
                                                        {item.rating.rate > 1 ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
                                                        {item.rating.rate > 2 ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
                                                        {item.rating.rate > 3 ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
                                                        {item.rating.rate > 4 ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
                                                        {item.rating.rate == 5 ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
                                                        {item.rating.rate} From <div>{item.rating.count}</div>
                                                    </div>

                                                    <h3 className=" text-lg font-light  py-1">$<i>{item.price}</i></h3>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div >

            }
        </>
    )
}
