/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { addCartItem, minCartItem, selectCartItems, selectCartTotalItems, selectCartTotalPrices } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

export default function Modal(props) {
    const cartItem = useSelector(selectCartItems)
    const totalCartItem = useSelector(selectCartTotalItems)
    const totalPrice = useSelector(selectCartTotalPrices)
    const dispatch = useDispatch()

    const addProduct = (products) => {
        dispatch(addCartItem(products))
    }

    const removeCartItem = (products) => {
        dispatch(minCartItem(products))
    }

    console.log(cartItem)
    return (
        <div className="fixed z-10 inset-0">
            <div className="bg-black opacity-50 fixed w-full h-full"></div>
            <div className="fixed  top-[50%] transform -translate-y-[50%] left-[50%] translate-x-[-50%]">
                <div onClick={props.onClose} className="bg-red-500 w-[20px] h-[20px] rounded-full flex items-center justify-center text-[10px] text-white cursor-pointer -right-[10px] -top-[10px] absolute">X</div>
                <div className="bg-white min-w-[200px] min-h-[100px] max-w-[600px] lg:w-[600px] rounded-md p-5">
                    {
                        totalCartItem > 0 ?
                            <div>
                                {
                                    cartItem.map(item => {
                                        return (
                                            <div key={item.id} className="flex  gap-7 p-4">
                                                <div>
                                                    <img src={item.image} className="max-w-[100px]" alt={item.title} />
                                                </div>
                                                <div className="text-left flex flex-col gap-2">
                                                    <div className="text-2xl font-bold">{item.title}</div>
                                                    <div className="text-md">Price: ${item.price}</div>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            className="bg-c-red hover:bg-red-800 text-white text-sm py-3 px-8 font-bold  rounded-lg"
                                                            onClick={() => removeCartItem(item)}
                                                        >
                                                            -
                                                        </button>
                                                        <div className="text-lg min-w-[20px] text-center">{item.quantity}</div>
                                                        <button
                                                            type="button"
                                                            className="bg-slate-700 hover:bg-slate-900 text-white text-sm py-3 px-8 font-bold  rounded-lg"
                                                            onClick={() => addProduct(item)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="bg-slate-200 p-4 font-extrabold text-xl rounded-lg flex justify-between items-center gap-2">
                                    <div>Total Price: ${totalPrice}</div>
                                    <a target="_blank" href={`https://wa.me/628174821904?text=Hello%20I%20want%20to%20buy%20${totalCartItem}%20items%20with%20total%20price%20${totalPrice}`} className="bg-c-red hover:bg-red-800 text-white text-sm py-3 px-8 font-bold  rounded-lg" rel="noreferrer">Checkout</a>
                                </div>
                            </div>
                            : <div className="text-center p-7 font-medium">Your cart is empty</div>
                    }
                </div>
            </div>
        </div>
    )
}
