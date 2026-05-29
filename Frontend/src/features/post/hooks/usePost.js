import { useContext, useEffect } from "react";
import { createPost, getFeed } from "../services/post.api";
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

    return {loading, feed, post, handleGetFeed, handleCreatePost}
}