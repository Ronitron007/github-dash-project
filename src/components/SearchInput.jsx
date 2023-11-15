import { TextField } from '@mui/material'
import _ from 'lodash'
import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'

const ClearButton = styled.button`
  float: right;
  top: -2.5rem;
  position: relative;
  background: none;
  border: none;
  width: min-content;
  left: 0rem;
  color: #9a9a9a;
  font-size: 1rem;
  font-weig &:hover {
    color: #000000;
  }
  &:focus,
  &:focus-visible {
    outline: none;
  }
`

const InputField = (props) => {
  const { setSearchString, inputName } = props
  const [inputField, setInputField] = React.useState('')
  let debouncedFunc = useCallback(
    _.debounce(setSearchString, 250, {
      leading: true,
      trailing: true,
    }),
    [],
  )
  const clearInput = () => {
    setSearchString('')
    setInputField('')
  }
  const handleInputChange = (e) => {
    setInputField(e.target.value)
    debouncedFunc(e.target.value)
  }
  return (
    <div className="w-500 mx-auto">
      <TextField
        fullWidth
        variant="standard"
        label={`Search ${inputName}`}
        id="standard"
        value={inputField}
        onChange={(e) => handleInputChange(e)}
      />
      <ClearButton onClick={clearInput}>
        {inputField ? 'clear' : null}
      </ClearButton>
    </div>
  )
}

export default InputField
