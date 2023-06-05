import styled from 'styled-components'

export const HomeBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-attachment: fixed;
  }

  .container {
    width: 80%;
    height: 90%;
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /* background-color: #fff; */

    background-attachment: fixed;
    background-color: inherit;
    background-attachment: fixed;
    .aside {
      border-top-left-radius: 1.5rem;
      border-bottom-left-radius: 1.5rem;
      width: 10rem;
      height: 100%;
      border: 1px solid #fff;
      /* background-color: pink; */
      /* background: hsla(0, 50%, 100%, 0.5); */
      background-color: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(6px);
    }

    .main {
      flex-grow: 1;
      height: 100%;
      background-color: #fff;
      border-top-right-radius: 1.5rem;
      border-bottom-right-radius: 1.5rem;
      padding-left: 1.5rem;
      padding-right: 2rem;

      .header {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 4rem;
        border-bottom: 1px solid #1677ff;
      }
    }
  }
`
