import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";

const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";

let initialState = {
  posts: [
    {
      id: 1,
      message: "Hi, how are you?",
      likeCount: 25
    },
    {
      id: 2,
      message: "It's my first post.",
      likeCount: 11
    },
    {
      id: 3,
      message: "Blablabla",
      likeCount: 8
    },
    {
      id: 4,
      message: "Data",
      likeCount: 13
    }
  ],
  profile: null,
  status: ""
};
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [
          ...state.posts,
          {
            id: 5,
            message: action.newPostText,
            likeCount: 15
          }
        ],
        newPostText: ""
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.postId)
      };

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.status
      };
    default:
      return state;
  }
};

export const addPost = newPostText => ({
  type: ADD_POST,
  newPostText
});

export const deletePost = postId => ({
  type: DELETE_POST,
  postId
});

export const setUserProfile = profile => ({
  type: SET_USER_PROFILE,
  profile
});

export const setStatus = status => ({
  type: SET_STATUS,
  status
});

export const getUserProfile = userId => dispatch => {
  usersAPI.getProfile(userId).then(response => {
    dispatch(setUserProfile(response.data));
  });
};

export const getStatus = userId => dispatch => {
  profileAPI.getStatus(userId).then(response => {
    dispatch(setStatus(response.data));
  });
};

export const updateStatus = status => dispatch => {
  profileAPI.updateStatus(status).then(response => {
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  });
};

export default profileReducer;
