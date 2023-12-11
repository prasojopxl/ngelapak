import {createSlice} from "@reduxjs/toolkit"
import { fetchData } from "../utils/services"
import _ from "lodash"

export const getData = await fetchData("/products")

const initialState = {
    productItems: getData
}

export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        productInfo: (state,action)=> {
            console.log(action.payload);
        },
        sortProduct: (state, action)=> {
            const sortValue = action.payload
            if(sortValue === "atoz") {
                state.productItems = _.orderBy(state.productItems, ["title"], ["asc"])    
            }
            if(sortValue === "ztoa") {
                state.productItems = _.orderBy(state.productItems, ["title"], ["desc"])
            }
            if(sortValue === "lowprice") {
                state.productItems = _.orderBy(state.productItems, ["price"], ["asc"])
            }
            if(sortValue === "highprice") {
                state.productItems = _.orderBy(state.productItems, ["price"], ["desc"])
            }
        },
        filterProduct: (state, action)=> {
            const category = action.payload
            if(category === "All") {
                state.productItems = getData
            }
            if(category !== "All") {
                state.productItems = _.filter(getData, (item) => {
                    if (category === "All") {
                        return item
                    } else {
                        return item.category === category
                    }
                })
            }
        },
        searchProduct: (state, action)=> {
            const searchValue = action.payload
            state.productItems = _.filter(getData, (item) => {
                if (searchValue === "") {
                    return item
                } else {
                    return item.title.toLowerCase().includes(searchValue.toLowerCase())
                }
            })
        }
    }
})

export const {productInfo, sortProduct, filterProduct, searchProduct} = productSlice.actions
export default productSlice;
