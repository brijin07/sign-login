import service from "./axiosconfig"


export const signuser=async(body)=>{   
  return await service.post("/signup",body)
}

export const login=async(body)=>{   
  return await service.post("/login",body)
}

export const sentotp=async(email,otp)=>{   
  return await service.post("/verify-otp",{email,otp})
}