import styled from "styled-components"

export default styled.div`
  .nav {
    height: 100%;
    width: 200px;
    /* background-color: #001529; */
  }
  .logo {
    width: 100%;
    background-color: #001529;
    padding: 20px;
    display: flex;
    align-items: center;
    &_title {
      font-weight: 700;
      font-size: 18px;
      width: 110px;
      height: 100%;
      display: flex;
      align-items: center;
      word-wrap: break-word;
      color: white;
      margin-left: 10px;
    }
  }
`
