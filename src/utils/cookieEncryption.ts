// npm install crypto-js
import CryptoJS from "crypto-js";

const keyWords = "njh666"

export default {
  /**
   * 
   * @param cookie 设置cookie的key和value
   * @param exdays 设置cookie存保存时间
   */
  setCookie(cookie: { key: string, value: string }, exdays: number) {
    const exdate = new Date(); //获取时间
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
    // Encrypt，加密
    const cipherPsw = CryptoJS.TripleDES.encrypt(
      cookie.value + "",
      keyWords
    ).toString()
    //字符串拼接cookie
    window.document.cookie = cookie.key + "=" + cipherPsw + ";path=/;expires=" + exdate;
  },
  /**
   * 
   * @param key 获取cookie的键名
   * @returns 返回cookie对象
   */
  getCookie(...key: string[]) {
    if (document.cookie.length > 0) {
      const arr = document.cookie.split("; ");
      const data = arr.map((item) => {
        const arr2 = item.split("=", 2); //再次切割
        const thisCookieArr = []
        for (const item of key) {
          //判断查找相对应的值
          if (arr2[0] == item) {
            // Decrypt，将解密后的内容赋值给账号
            const bytes = CryptoJS.TripleDES.decrypt(arr2[1], keyWords);
            thisCookieArr.push({ [item]: bytes.toString(CryptoJS.enc.Utf8) })
          }
        }
        return thisCookieArr
      }).flatMap(item => item).filter(item => item)
      return data
    }
  },
  //清除cookie
  clearCookie(...cookieName: string[]) {
    cookieName.forEach((item) => {
      document.cookie = `${item}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    })

  },
  //清除所有cookie
  clearAllCookie() {
    const cookie = document.cookie
    let cookieArr: any = cookie.split('; ')
    cookieArr = cookieArr.map((item: any) => {
      return item.split('=')[0]
    }).flat(1)
    this.clearCookie(...cookieArr)
  },

}