import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export const LoginBC = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const ModalFrame = styled.div`
  width: 45rem;
  height: 30rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2rem;
  background-color: #fff;

  .logo {
    margin-right: 2rem;
  }

  .main {
    text-align: center;
    .form {
      width: 16rem;
    }
    .ant-input-affix-wrapper {
      height: 2.5rem;
      input {
        padding-left: 5px;
      }
    }
    .ant-btn {
      width: 100%;
      margin-top: 1rem;
      font-size: 1.2rem;
      border-radius: 1.5rem;
      height: 2.7rem;
      border-color: #1677ff;
      outline: none;

      /* background-color: green; */
      &:hover {
        background-color: black;
        border-color: black;
        transition: all 0.7s;
      }
    }
  }
`
