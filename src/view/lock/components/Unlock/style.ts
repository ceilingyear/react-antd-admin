import styled from "styled-components";

export default styled.div`
.title {
  color: #fff;
  text-align: center;
  font-size: 32px;
  margin: 0;
  display: flex;
  align-items: flex-end;

  .unlock-btn {
    color: #aaa;
    font-size: 16px;
    font-weight: normal;
    margin-left: 10px;
    cursor: pointer;
  }
}

.unlock-modal {
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .el-input-group__append {
    background: #409eff !important;
    border-color: #409eff !important;
  }

  .btn-unlock {
    background: #409eff !important;
    color: #fff !important;

    i{
      transform: scale(1.5);
    }
  }
}

.userinfo-unlock {
  margin-bottom: 30px;
  background-color: #c3c3c3;
  width: 80px;
  height: 80px;
  line-height: 80px;
  font-size: 18px;
  h3{
    color: #fff;
  }
}
.ant-form-item-required{
  color: white !important;
}
.btnText{
  color: red;
  font-size: 14px;
  padding: 0 5px;
  cursor: pointer;
}
.btnText:first-child{
  margin-left: -20px;
  
  color: #1677ff;
}

`