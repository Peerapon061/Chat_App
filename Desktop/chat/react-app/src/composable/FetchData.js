import { jwtDecode } from "jwt-decode";

const api='http://localhost:3333';
// const api='http://localhost:3333';

const FetchRegister= async(data)=>{
    try {
        const response = await fetch(api+"/api/register",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        })
        // console.log(response.json())
        return {status:response.ok,message:response.json()};
    } catch (error) {
        console.log(error)
    }
}

const FetchLogin=async(data)=>{
    try {
        const response = await fetch(api+"/api/login",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        })
        if(response.ok){
            return response.json().then((result)=>{
                localStorage.setItem('authToken',result.token)
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const FetchChatRoom=async()=>{
    const token = localStorage.getItem('authToken')
    try {
        const response = await fetch(api+"/api/room",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(response.ok){
            return response.json()
        }
    } catch (error) {
        console.log(error)
    }
}

const FetchCreateRoom=async(data)=>{
    const token = localStorage.getItem('authToken')
    try {
        const response = await fetch(api+"/api/room",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(data)
        })
        if(response.ok){
            console.log("created!!")
        }
    } catch (error) {
        console.log(error)
    }
}

const FetchAllChatRoom=async()=>{
    const token = localStorage.getItem('authToken')
    try {
        const response = await fetch(api+"/api/rooms",{
            method:"GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if(response.ok){
            return response.json()
        }
    } catch (error) {
        console.log(error)
    }
}
const FetchDeleteRoom=async(roomId)=>{
    const token = localStorage.getItem('authToken')
    try {
        const response = await fetch(api+`/api/room/${roomId}`,{
            method:"DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if(response.ok){
            
        }
    } catch (error) {
        console.log(error)
    }
}


const FetchChatHistory=async(roomId)=>{
    const token = localStorage.getItem('authToken')
    try {
        const response = await fetch(api+`/api/messages/${roomId}`,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(response.ok){
            // console.log(response)
            return response.json()
        }
    } catch (error) {
        console.log(error)
    }
}

const FetchUser=async()=>{
    const token = localStorage.getItem('authToken')
    try {
        const response = await fetch(api+"/api/users",{
            method:"GET",
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        if(response.ok){
            return response.json()
        }
    } catch (error) {
        console.log(error)
    }
}

const FetchSpecificUser=async(userId)=>{
    const token = localStorage.getItem('authToken')
    try {
        const response = await fetch(api+`/api/user/${userId}`,{
            method:"GET",
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        if(response.ok){
            return response.json()
        }
    } catch (error) {
        console.log(error)
    }
}

const FetchUpdate= async(data,userId)=>{
    const token = localStorage.getItem('authToken')
    try {
        const response = await fetch(api+`/api/users/${userId}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(data)
        })
        return {status:response.ok,message:response.json()};
    } catch (error) {
        console.log(error)
    }
}

const FetchUserExceptUserId=async(data)=>{
    const token = localStorage.getItem('authToken')
    const userInfo = jwtDecode(token)
    try {
        const response = await fetch(api+`/api/users/${userInfo.userId}`,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(data)
        })
        if(response.ok){
            return response.json()
        }
    } catch (error) {
        console.log(error)
    }
}

const FetchDeleteUser=async(userId)=>{
    const token = localStorage.getItem('authToken')
    try {
        const response = await fetch(api+`/api/users/${userId}`,{
            method:"DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if(response.ok){
            
        }
    } catch (error) {
        console.log(error)
    }
}
export {FetchRegister,FetchSpecificUser,FetchUpdate,FetchAllChatRoom,FetchLogin,FetchChatRoom,FetchCreateRoom,FetchDeleteRoom,FetchChatHistory,FetchUser,FetchUserExceptUserId,FetchDeleteUser}