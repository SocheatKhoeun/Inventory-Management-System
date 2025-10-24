import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const initialState = {
  getallCategory: null,
  isgetallCategory: false,
  iscreatedCategory: false,
  iscategoryremove: false,
  searchdata: null,
};

export const CreateCategory = createAsyncThunk(
  "category/createcategory",
  async (Category, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "category/createcategory",
        Category,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Create category error:",
        error.response?.data || error.message
      );
      // Handle specific HTTP status codes
      if (error.response?.status === 409) {
        return rejectWithValue(
          "Category already exists. Please use a different name."
        );
      }
      const serverMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Failed to create category";
      return rejectWithValue(serverMsg);
    }
  }
);

export const gettingallCategory = createAsyncThunk(
  "category/getcategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("category/getcategory", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Category retrieval failed"
      );
    }
  }
);

export const RemoveCategory = createAsyncThunk(
  "category/removecategory",
  async (CategoryId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `category/removecategory/${CategoryId}`,
        CategoryId,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Category delete failed"
      );
    }
  }
);

export const SearchCategory = createAsyncThunk(
  "category/searchcategory",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `category/searchcategory?query=${query}`,
        query,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "category adding failed"
      );
    }
  }
);

// New updateCategory thunk
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ categoryId, categoryData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `category/updatecategory/${categoryId}`,
        { updatedCategory: categoryData },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      const serverMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Failed to update category";
      return rejectWithValue(serverMsg);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(gettingallCategory.pending, (state) => {
        state.isgetallCategory = true;
      })
      .addCase(gettingallCategory.fulfilled, (state, action) => {
        state.isgetallCategory = false;
        // Handle both wrapped (categoriesWithCount) and unwrapped (direct array) responses
        state.getallCategory =
          action.payload.categoriesWithCount || action.payload;
      })

      .addCase(gettingallCategory.rejected, (state, action) => {
        state.isgetallCategory = false;
      })

      .addCase(CreateCategory.pending, (state) => {
        state.iscreatedCategory = true;
      })
      .addCase(CreateCategory.fulfilled, (state, action) => {
        state.iscreatedCategory = false;
        // Add new category to the list
        if (action.payload) {
          state.getallCategory = [
            ...(state.getallCategory || []),
            action.payload,
          ];
        }
        toast.success("Category created successfully!");
      })
      .addCase(CreateCategory.rejected, (state, action) => {
        state.iscreatedCategory = false;
        toast.error(action.payload || "Failed to create category");
      })

      .addCase(RemoveCategory.pending, (state) => {
        state.iscategoryremove = true;
      })

      .addCase(RemoveCategory.fulfilled, (state, action) => {
        state.iscategoryremove = true;
        state.getallCategory = state.getallCategory.filter(
          (category) => category._id !== action.meta.arg
        );
      })

      .addCase(RemoveCategory.rejected, (state, action) => {
        state.iscategoryremove = true;
      })

      .addCase(SearchCategory.fulfilled, (state, action) => {
        state.searchdata = action.payload;
      })

      .addCase(SearchCategory.rejected, (state, action) => {})

      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        // Refresh the list to show updated category
        toast.success("Category updated successfully!");
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload || "Failed to update category");
      });
  },
});

export default categorySlice.reducer;
