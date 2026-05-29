import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

export async function getFeed(){
    try{
        const response = await api.get("/api/posts/feed");
        return response.data;
    }catch(err){
        console.log(err);
    }
}

export async function createPost(imageFile, caption){
    try{
        const formData = new FormData();
        formData.append("img", imageFile);
        formData.append("caption", caption)
        const response = await api.post("/api/posts", formData);
        return response.data
    }catch(err){
        console.log(err);
    }
}