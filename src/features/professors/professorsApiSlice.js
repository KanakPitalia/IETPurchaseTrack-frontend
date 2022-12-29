// import {
//     createSelector,
//     createEntityAdapter
// } from "@reduxjs/toolkit";
// import { apiSlice } from "../../app/api/apiSlice"

// const usersAdapter = createEntityAdapter({})

// const initialState = usersAdapter.getInitialState()

// export const professorsApiSlice = apiSlice.injectEndpoints({
//     endpoints: builder => ({
//         getUsers: builder.query({
//             query: () => ({
//                 url: '/professors',
//             validateStatus: (response, result) => {
//                 return response.status === 200 && !result.isError
//             },
//         }),
//             transformResponse: responseData => {
//                 const loadedUsers = responseData.map(user => {
//                     user.id = user._id
                    
//                     return user
//                 });
//                 return usersAdapter.setAll(initialState, loadedUsers)
//             },
//             providesTags: (result, error, arg) => {
//                 if (result?.ids) {
//                     return [
//                         { type: 'Professor', id: 'LIST' },
//                         ...result.ids.map(id => ({ type: 'Professor', id }))
//                     ]
//                 } else return [{ type: 'Professor', id: 'LIST' }]
//             }
//         }),
//         addNewUser: builder.mutation({
//             query: initialUserData => ({
//                 url: '/professors',
//                 method: 'POST',
//                 body: {
//                     ...initialUserData,
//                 }
//             }),
//             invalidatesTags: [
//                 { type: 'Professor', id: "LIST" }
//             ]
//         }),
//         updateUser: builder.mutation({
//             query: initialUserData => ({
//                 url: '/professors',
//                 method: 'PATCH',
//                 body: {
//                     ...initialUserData,
//                 }
//             }),
//             invalidatesTags: (result, error, arg) => [
//                 { type: 'Professor', id: arg.id }
//             ]
//         }),
//         deleteUser: builder.mutation({
//             query: ({ id }) => ({
//                 url: `/professors`,
//                 method: 'DELETE',
//                 body: { id }
//             }),
//             invalidatesTags: (result, error, arg) => [
//                 { type: 'Professor', id: arg.id }
//             ]
//         }),
//     }),
// })

// export const {
//     useGetUsersQuery,
//     useAddNewUserMutation,
//     useUpdateUserMutation,
//     useDeleteUserMutation,
// } = professorsApiSlice

// // returns the query result object
// export const selectUsersResult = professorsApiSlice.endpoints.getUsers.select()

// // creates memoized selector
// const selectUsersData = createSelector(
//     selectUsersResult,
//     usersResult => usersResult.data // normalized state object with ids & entities
// )

// //getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//     selectAll: selectAllUsers,
//     selectById: selectUserById,
//     selectIds: selectUserIds
//     // Pass in a selector that returns the users slice of state
// } = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)





// -------------------------------



import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const professorsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: '/professors',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Professor', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Professor', id }))
                    ]
                } else return [{ type: 'Professor', id: 'LIST' }]
            }
        }),
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/professors',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'Professor', id: "LIST" }
            ]
        }),
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/professors',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Professor', id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/professors`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Professor', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = professorsApiSlice

// returns the query result object
export const selectUsersResult = professorsApiSlice.endpoints.getUsers.select()

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)