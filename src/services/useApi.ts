import api,{apiPath} from "./api"
import {useAppStore} from "@/stores/appStore";
import {useAuthStore} from "@/stores/useAuthStore";
import {useRouter} from "vue-router";

const useApi = () => {
  const appStore = useAppStore()
  const  {setAuth} = useAuthStore()
  const router = useRouter()
  const {setLoading,showSnackbar} = appStore
  return {
    // broadcast
    async registerBroadcast (socketId:string,channel:string) {
      try{
        // setLoading(true)
        return await api.post(apiPath.broadcaster,{
          socket_id: socketId,
          channel_name: channel
        })

      }catch(error){
        console.log(error)
      }finally {
        // setLoading(false)
      }
    },
    // check unique field value
    async checkUnique (field: string, value: string){
      try{
        setLoading(true)
        const res = await api.post(apiPath.uniqueCheck,{
          field,
          value
        })
        return res.data.is_unique
      }catch(error){
        console.log(error)
      }finally {
        setLoading(false)
      }
    },
    async checkToken (token: string){
      try{
        setLoading(true)
        const res = await api.post(apiPath.tokenCheck,{
          token,
        })
        return res.data.is_valid
      }catch(error){
        console.log(error)
      }finally {
        setLoading(false)
      }
    },
    // register a new account
    async registerAccount (data: {name:string,email:string,password:string}) {
      try{
        setLoading(true)
        const res = await api.post(apiPath.register,data)
        return res.data.data
      }catch(error){
        console.log(error)
      }finally {
        setLoading(false)
      }
    },
    // login with email and password
    async loginAccount (form: {g_recaptcha_token:string,email:string,password:string}) {
      try{
        setLoading(true)
        let {data} = await api.post(apiPath.login,form)
        const response = data.data
        setAuth(response.token,response.user)
        return await router.push('/')
      }catch(error){
        console.log('login Account',error)
        const message = error.response.data.message
        showSnackbar(message,'error',4000)
      }finally {
        setLoading(false)
      }
    }
  }
}

export default useApi
