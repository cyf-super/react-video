import styled from 'styled-components'

export const HeaderCSS = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .search {
    .ant-input-affix-wrapper {
      width: 18rem;
      border-radius: 20px;
      border: 1px solid #ccc;
      input {
        padding-left: 5px;
        font-family: monospace;
        font-style: italic;
      }
    }
  }
`
