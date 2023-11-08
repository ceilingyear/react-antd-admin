/**
 * 
 * @param isFull 当前是否为全屏，默认为false
 */
export default function browserFull(isFull = false) {
  if (!isFull) {
    const element = document.documentElement as any
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    }
  } else {
    const useDocument = document as any
    if (useDocument.exitFullscreen) {
      useDocument.exitFullscreen()
    } else if (useDocument.mozCancelFullScreen) {
      useDocument.mozCancelFullScreen()
    } else if (useDocument.webkitExitFullscreen) {
      useDocument.webkitExitFullscreen()
    } else if (useDocument.msExitFullscreen) {
      useDocument.msExitFullscreen()
    }
  }
}