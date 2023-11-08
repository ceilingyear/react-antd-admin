import axios from "axios"

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_PATH,
  timeout: 5000,
})

const successCode = 200

// request拦截器（给每个请求加上token）
service.interceptors.request.use(
  (config) => {
    // const authorization = '&authorization=' + localStorage.getItem('authorization')
    // if (config.data === '' || config.data && !config.data.includes('authorization')) {
    //   config.data = config.data.concat(authorization)
    // }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    console.log(response.status)
    if (response.status !== successCode) {
      // Message.error(res.msg);
      return Promise.reject(new Error(res.msg || "Error"))
    } else {
      return res
    }
  },
  (error) => {
    console.log("err" + error) // for debug
    // Message.error('网络请求失败，请重试~');
    return Promise.reject(error)
  }
)

/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export const get = (url: string, params = {}) => {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export const post = (url: string, data = {}) => {
  return new Promise((resolve, reject) => {
    service.post(url, JSON.stringify(data)).then(
      (response) => {
        resolve(response)
      },
      (err) => {
        reject(err)
      }
    )
  })
}
