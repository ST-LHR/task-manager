// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { baseUrl } from '../../../configs/urlConstant';

// export const todosApi = createApi({
//   reducerPath: 'todosApi',
//   baseQuery: fetchBaseQuery({ baseUrl:baseUrl}),
//   endpoints: (builder) => ({

//     fetchAllTodos: builder.query({
//         query: () => ({
//           url: "product/v1/allproducts",
//           method: 'GET',
//         }),
//       }),

//     // Define other endpoints as needed, e.g., addProduct, deleteProduct, etc.
//     onError: (error) => {
//       console.error('An error occurred:', error);
//     },
//   }),
// });

// export const { useFetchAllTodosQuery } = todosApi;


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from '../../utils/firebase';
import { collection, onSnapshot , query} from "firebase/firestore";

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({}),
  endpoints: (builder) => ({
    fetchAllTodos: builder.query({
      query: async () => {
        try {
          const q = query(collection(db, "todos"));
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let todosArr = [];
            querySnapshot.forEach((doc) => {
              todosArr.push({ ...doc.data(), id: doc.id });
            });
            return todosArr;
          });
        } catch (error) {
          throw error;
        }
      },
    }),
    // Define other endpoints for Firebase operations as needed
  }),
});

export const { useFetchAllTodosQuery } = todosApi;
