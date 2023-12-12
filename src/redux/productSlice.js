import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { fetchData } from "../utils/services"
import _ from "lodash"

export const getDataAll = await fetchData("/products")
export const getData= createAsyncThunk("products/fetchData", async()=> {
    const response = await fetchData("/products")
    return response
} )

const initialState = {
    isLoading:false,
    isError:null,
    productItems: [],
}

export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        productInfo: (state,action)=> {
            state.productItems = action.payload;
            state.isLoading = true;
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
                state.productItems = getDataAll
            }
            if(category !== "All") {
                state.productItems = _.filter(getDataAll, (item) => {
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
            if(searchValue === "") {
                state.productItems = getDataAll
            }
            if(searchValue !== "") {
                state.productItems = _.filter(getDataAll, (item) => {
                    if (searchValue === "") {
                        return item
                    } else {
                        return item.title.toLowerCase().includes(searchValue.toLowerCase())
                    }
                })
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productItems = action.payload;
            })
            .addCase(getData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error;
            });
    },
})

export const {productInfo, sortProduct, filterProduct, searchProduct} = productSlice.actions
export default productSlice;
