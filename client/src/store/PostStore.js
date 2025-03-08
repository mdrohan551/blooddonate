import {create} from 'zustand';
import axios from 'axios';

const PostStore = create((set)=>({
    PostList:[],
    PostListRequest:async () =>{
        let res = await axios.get('/api/v1/get-post');
        if(res.data['status']==='success'){
         set({PostList:res.data['data']})
        }
    },

    likePost: async (postId) => {
        const res = await axios.post(`/api/v1/like-post/${postId}`, );
        if (res.data.status === "success") {
            return res.data;
        } else {
            throw new Error(res.data.message);
        }
    },
    commentForm:{
        text:""
    },
    commentFromChange:(name,value)=>{
        set((state)=>({
            commentForm:{
                ...state.commentForm,
                [name]:value
            }
        }))
    },
    commentPost: async (postId,comments) => {
        const res = await axios.post(`/api/v1/comment-post/${postId}`, { text: comments });

        if (res.data.status === "success") {
            set({  commentForm:{
                    text:""
                },})
            return res.data;
        }else {
            return res.data;
        }
    },
    isFormSubmit: false,
    PostForm: { post: "", image: "" },
    PostFormChange: (name, value) => {
        set((state) => ({
            PostForm: {
                ...state.PostForm,
                [name]: value
            }
        }));
    },


    CreatePostRequest: async (postbody) => {
        set({ isFormSubmit: true });
        try {
            let res = await axios.post(`/api/v1/create-post`, postbody);
            set({ isFormSubmit: false });
            set({ PostForm: { post: "", image: "" }})
            return res.data;
        } catch (error) {
            set({ isFormSubmit: false });
            console.error('Error creating post:', error);
            return { status: 'error', message: 'Failed to create post' };
        }
    },
    UserPostDetails:{},
    UserPostDetailsRequest:async () =>{
            let res = await axios.get('/api/v1/get-post-user');
            if(res.data.status === "success"){
                set({UserPostDetails:res.data['data']})
            }
    },

    singlePostDetails:[],
    singlePostRequest:async (id) =>{
        let res = await  axios.get(`/api/v1/read-post/${id}`)
        if(res.data.status === "success"){
            set({singlePostDetails:res.data['data']})
        }
    },


}));
export default PostStore;