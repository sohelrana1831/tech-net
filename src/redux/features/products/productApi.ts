import { api } from '@/redux/api/apiSlices';

const productAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => `/products`,
    }),

    getSingleProduct: builder.query({
      query: (id) => `/product/${id}`,
    }),

    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comment'],
    }),

    getProductComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comment'],
    }),
  }),
});

export const {
  useGetProductCommentQuery,
  useGetProductQuery,
  useGetSingleProductQuery,
  usePostCommentMutation,
} = productAPI;
