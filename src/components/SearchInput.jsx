import { TextField } from '@mui/material'
import _ from 'lodash'
import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'

const ClearButton = styled.button`
  position: relative;
  border: none;
  width: min-content;
  left: -6rem;
  color: #9a9a9a;
  font-size: 1rem;
  font-weight: 400;
  background-color: #ffffff;
  &:hover {
    color: #000000;
  }
`

const InputField = (props) => {
  const { userInput, setUserInput } = props
  const [inputField, setInputField] = React.useState('')
  let debouncedFunc = useCallback(
    _.debounce(setUserInput, 250, {
      leading: true,
      trailing: true,
    }),
    [],
  )
  const clearInput = () => {
    setUserInput('')
    setInputField('')
  }
  const handleInputChange = (e) => {
    setInputField(e.target.value)
    debouncedFunc(e.target.value)
  }
  return (
    <>
      <TextField
        variant="standard"
        label="Search User"
        id="standard"
        value={inputField}
        onChange={(e) => handleInputChange(e)}
      />
      <ClearButton onClick={clearInput}>
        {userInput ? 'clear' : null}
      </ClearButton>
    </>
  )
}

export default InputField
