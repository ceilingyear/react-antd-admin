import styled from "styled-components";

export default styled.div`
.layout{
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow:hidden;
}
.contentBox{
  flex: 1;
  position: relative;
}
.topBox{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid #e0e4ef;
}
.content{
  padding: 10px;
  height: calc(100% - 120px) ;
  width: 100;
  overflow-x: hidden;
  overflow-y:auto;
  height: calc(100% - 120px) ;
  width: 100;
}
`