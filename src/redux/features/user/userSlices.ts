import { auth } from '@/lib/firebase';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

interface ICredential {
  email: string;
  password: string;
}
// Define a type for the slice state
interface IUser {
  users: {
    email: string | null;
  };
  isLodging: boolean;
  isError: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: IUser = {
  users: {
    email: null,
  },
  isLodging: false,
  isError: false,
  error: null,
};

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ email, password }: ICredential) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);

    return data.user.email;
  }
);
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: ICredential) => {
    const data = await signInWithEmailAndPassword(auth, email, password);

    return data.user.email;
  }
);

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.users.email = action.payload;
    },
    setLodging: (state, action: PayloadAction<boolean>) => {
      state.isLodging = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        (state.isLodging = true), (state.isError = false), (state.error = null);
      })
      .addCase(createUser.fulfilled, (state, action) => {
        (state.users.email = action.payload), (state.isLodging = false);
      })
      .addCase(createUser.rejected, (state, action) => {
        (state.users.email = null),
          (state.isError = false),
          (state.error = action.error.message!);
      })
      .addCase(loginUser.pending, (state) => {
        (state.isLodging = true), (state.isError = false), (state.error = null);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.users.email = action.payload), (state.isLodging = false);
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.users.email = null),
          (state.isError = false),
          (state.error = action.error.message!);
      });
  },
});

export const { setUser, setLodging } = usersSlice.actions;

export default usersSlice.reducer;
