import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const proposalsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = proposalsAdapter.getInitialState()

export const proposalsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProposals: builder.query({
            query: () => ({
                url: '/proposals',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            }),
            transformResponse: responseData => {
                const loadedProposals = responseData.map(proposal => {
                    proposal.id = proposal._id
                    return proposal
                });
                return proposalsAdapter.setAll(initialState, loadedProposals)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Proposal', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Proposal', id }))
                    ]
                } else return [{ type: 'Proposal', id: 'LIST' }]
            }
        }),
        addNewProposal: builder.mutation({
            query: initialProposal => ({
                url: '/proposals',
                method: 'POST',
                body: {
                    ...initialProposal,
                }
            }),
            invalidatesTags: [
                { type: 'Proposal', id: "LIST" }
            ]
        }),
        updateProposal: builder.mutation({
            query: initialProposal => ({
                url: '/proposals',
                method: 'PATCH',
                body: {
                    ...initialProposal,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Proposal', id: arg.id }
            ]
        }),
        deleteProposal: builder.mutation({
            query: ({ id }) => ({
                url: `/proposals`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Proposal', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetProposalsQuery,
    useAddNewProposalMutation,
    useUpdateProposalMutation,
    useDeleteProposalMutation,
} = proposalsApiSlice

// returns the query result object
export const selectProposalsResult = proposalsApiSlice.endpoints.getProposals.select()

// creates memoized selector
const selectProposalsData = createSelector(
    selectProposalsResult,
    proposalsResult => proposalsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllProposals,
    selectById: selectProposalById,
    selectIds: selectProposalIds
    // Pass in a selector that returns the notes slice of state
} = proposalsAdapter.getSelectors(state => selectProposalsData(state) ?? initialState)