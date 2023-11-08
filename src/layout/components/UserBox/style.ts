import styled from "styled-components";

export default styled.div`
*{
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.box{
  display: flex;
  align-items: center;
  height: 100%;
}
.lang{
  cursor: pointer;
  line-height: 52px;
  transition: all .3s;
  padding: 0 20px;
}
.lang:hover{
  background-color: #f1f1f1;
}
.userInfo{
  width: 130px;
  padding: 10px 15px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  transition: all .3s;
  &_username{
    font-size: 14px;
  }
}
.userInfo:hover{
  background-color: #f1f1f1;
}
.icon{
  display: flex;
  align-items: center;
  font-size: 20px;
  padding: 0 20px;
  cursor: pointer;
  transition: all .3s;
  height: 52px
}
.icon:hover{
  background-color: #f1f1f1;
}
`