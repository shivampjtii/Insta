import { useContext, useEffect } from "react";
import { createPost, getFeed, likePost, unLikePost } from "../services/post.api";
import { PostContext } from "../post.context";

export const usePost = ()=>{
    const context = useContext(PostContext);
    const {loading, setLoading, post, setPost, feed, setFeed} = context;



    const handleGetFeed = async ()=>{
        setLoading(true);
        const feed = await getFeed();
        // console.log(feed)
        setFeed(feed.posts)
        setLoading(false)
    }

    useEffect(()=>{
        handleGetFeed()
    },[])

    const handleCreatePost = async (imageFile, caption)=>{
        setLoading(true)
        const data = await createPost(imageFile, caption)
        setFeed([data.post, ...feed])
        setLoading(false)
    }

    const handleLike = async (postId)=>{
        setLoading(true);
        const data = await likePost(postId);
        await handleGetFeed();
        setLoading(false)
    }
    
    const handleUnLike = async (postId)=>{
        setLoading(true);
        const data = await unLikePost(postId);
        await handleGetFeed();
        setLoading(false)
    }

    return {loading, feed, post, handleGetFeed, handleCreatePost, handleUnLike, handleLike}
}