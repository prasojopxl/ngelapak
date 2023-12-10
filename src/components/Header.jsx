import cartImage from "../assets/cart.svg"
import { useSelector } from "react-redux";
import { selectCartTotalItems } from "../redux/cartSlice";

export default function Header() {
    const cartItem = useSelector(selectCartTotalItems)
    return (
        <div className=" bg-blue-500 text-blue-50">
            <div className="wrapper flex justify-between py-4">
                <a href="/">Logo</a>
                <div className="relative">
                    <img src={cartImage} width={20} alt="cart" />
                    <span className="absolute top-[-10px] left-[-7px] bg-red-500 text-white px-1 rounded text-xs">{cartItem > 0 ? cartItem : null}</span>
                </div>
            </div>
        </div>
    )
}
