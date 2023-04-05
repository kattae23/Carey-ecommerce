


import { createSlice } from '@reduxjs/toolkit';


export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        isLoadingUsers: true,
        users: [],
        activeUser: null,
        total: 0,
    },
    reducers: {
        onSetActiveUser: (state, { payload }) => {
            state.activeUser = payload
        },
        onAddNewUser: (state, { payload }) => {
            state.users.push(payload);
            state.activeUser = null;
        },
        onUpdateUser: (state, { payload }) => {
            state.users = state.users.map(user => {
                if (user.uid === payload.uid) {
                    return payload;
                }

                return user;
            })
        },
        onDeleteUser: (state) => {
            if (state.activeUser) {
                state.users = state.users.filter(user => user._id !== state.activeUser._id);
                state.activeUser = null;
            }
        },
        onLoadUsers: (state, { payload }) => {
            state.isLoadingUsers = false;
            // state.users = payload;
            state.users = payload.users
            state.total = payload.total
        },
        onNextPage: (state, { payload }) => {
            state.users = payload.users;
            state.total = payload.total
            state.activeUser = null;
        },
        onLogoutUsers: (state) => {
            state.isLoadingUsers = true;
            state.users = [];
            state.activeUser = null
        }
    }
});


export const {
    onAddNewUser,
    onDeleteUser,
    onLoadUsers,
    onLogoutUsers,
    onSetActiveUser,
    onUpdateUser,
    onNextPage,
} = usersSlice.actions;