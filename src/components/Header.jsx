import cartImage from "../assets/cart.svg"
import { useSelector } from "react-redux";
import { selectCartTotalItems } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { searchProduct } from "../redux/productSlice";
import { motion } from "framer-motion"

export default function Header() {
    const cartItem = useSelector(selectCartTotalItems)
    const dispatch = useDispatch()

    const getSearch = (e) => {
        dispatch(searchProduct(e))
    }

    return (
        <div className="bggradient text-blue-50">
            <div className="wrapper flex justify-between py-4 items-center gap-2">
                <motion.div
                    animate={{
                        scale: [1, 2, 2, 1, 1],
                        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                    }}
                >
                    <a href="/" className="font-black text-3xl">NgeLapak</a>
                </motion.div>

                <motion.input
                    whileHover={{ scaleX: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="text"
                    placeholder="Search..."
                    className="py-2 px-4 rounded flex-1 max-w-sm text-black"
                    onChange={(e) => getSearch(e.target.value)}
                />
                <motion.div
                    className="relative cursor-pointer

                ">
                    <img src={cartImage} width={20} alt="cart" />
                    {
                        cartItem > 0 ? <span className="absolute flex items-center justify-center w-[17px] h-[17px] top-[-10px] left-[-7px] bg-red-500 text-white px-1 rounded-full text-[8px] border ">{cartItem}</span> : null
                    }
                </motion.div>
            </div>
        </div >
    )
}
