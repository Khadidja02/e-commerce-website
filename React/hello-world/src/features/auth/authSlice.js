import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";



const user = JSON.parse(localStorage.getItem('user'))


const initialState = {
    user : user ? user : null,
    userInfo : {},
    isError : false,
    isSuccess: false,
    isLoading : false,
    message : "",
}

export const signup = createAsyncThunk(
    "auth/signup", 
    async (userData, thunkAPI)=>{
        try {
            return await authService.signup(userData)
        }catch(err){
            const message= (err.response && err.response.data && err.response.data.message) ||
            err.message || err.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const login= createAsyncThunk(
    "auth/login", 
    async (userData, thunkAPI)=>{
        try {
            return await authService.login(userData)
        }catch(err){
            const message= (err.response && err.response.data && err.response.data.message) ||
            err.message || err.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const activate = createAsyncThunk(
    "auth/activate", 
    async (userData, thunkAPI)=>{
        try {
            return await authService.activate(userData)
        }catch(err){
            const message= (err.response && err.response.data && err.response.data.message) ||
            err.message || err.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const resetPassword = createAsyncThunk(
    "auth/resetPassword", 
    async (userData, thunkAPI)=>{
        try {
            return await authService.resetPassword(userData)
        }catch(err){
            const message= (err.response && err.response.data && err.response.data.message) ||
            err.message || err.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const resetPasswordConfirm = createAsyncThunk(
    "auth/resetPasswordConfirm", 
    async (userData, thunkAPI)=>{
        try {
            return await authService.resetPasswordConfirm(userData)
        }catch(err){
            const message= (err.response && err.response.data && err.response.data.message) ||
            err.message || err.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const logout = createAsyncThunk(
    "auth/logout",
    async()=>{
        const sessionTimeoutMs = 120 * 60 * 1000; // 120 minutes in milliseconds
        setTimeout(() => {
            // Dispatch the actual logout action after the session timeout
            authService.logout();
        }, sessionTimeoutMs);
        
    }
)
export const userinfo = createAsyncThunk(
    "auth/userInfo",
    async(_,thunkAPI)=>{
        try{
            const accessToken = thunkAPI.getState().auth.user.access
            return await authService.userinfo(accessToken)
        }catch(err){
            const message= (err.response && err.response.data && err.response.data.message) ||
            err.message || err.toString()

            return thunkAPI.rejectWithValue(message)
        }
        
    }
)

export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers :{
        reset: (state) =>{
            state.isError = false
            state.isLoading = false
            state.isSuccess =false
            state.message = false
        } 
    },
    extraReducers:(builder)=>{
        builder
            .addCase(signup.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(signup.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(signup.rejected, (state, action)=>{
                state.isLoading = false
                state.isSuccess = false
                state.isError= true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action)=>{
                state.isLoading = false
                state.isSuccess = false
                state.isError= true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state)=>{
                state.user = null
            })
            .addCase(resetPassword.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(resetPassword.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(resetPassword.rejected, (state, action)=>{
                state.isLoading = false
                state.isSuccess = false
                state.isError= true
                state.message = action.payload
                state.user = null
            })
            .addCase(resetPasswordConfirm.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(resetPasswordConfirm.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(resetPasswordConfirm.rejected, (state, action)=>{
                state.isLoading = false
                state.isSuccess = false
                state.isError= true
                state.message = action.payload
                state.user = null
            })
            .addCase(activate.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(activate.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(activate.rejected, (state, action)=>{
                state.isLoading = false
                state.isSuccess = false
                state.isError= true
                state.message = action.payload
                state.user = null
            })
            .addCase(userinfo.fulfilled, (state, action)=>{
                state.userInfo = action.payload
            })
          }
})

export const {reset} = authSlice.actions

export default authSlice.reducer