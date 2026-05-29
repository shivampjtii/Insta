import React, { useRef, useState } from 'react'
import { usePost } from '../hooks/usePost';
import "../styles/createPost.scss"
import { useNavigate } from 'react-router';

const CreatePost = () => {
    const postImageInputFieldRef = useRef(null);
    const [caption, setCaption] = useState("");
    const navigate = useNavigate();

    const { loading, handleCreatePost } = usePost();

    const handleForm = async (e)=>{
        e.preventDefault();
        const file = postImageInputFieldRef.current.files[0];
        await handleCreatePost(file, caption)
        // setCaption("");
        navigate("/")

    }

    if(loading){
        return (
            <main>
                <h1>Creating Post</h1>
            </main>
        )
    }

  return (
    <main className='create-post-page'>
        <div className="form-container">
            <h1>Create Post</h1>
            <form onSubmit={handleForm}>
                <label className='post-image-label' htmlFor="postImage">Select Image</label>
                <input ref={postImageInputFieldRef} hidden type="file" name="postImage" id="postImage" />
                <input value={caption} onChange={(e)=>setCaption(e.target.value)} type="text" name="caption" id="caption" placeholder='Enter Caption'/>
                <button className='button'>Create Post</button>
            </form>
        </div>
    </main>
  )
}

export default CreatePost