const reactSelectStyle = {
  option: (provided: any, state: any) => {
    return {
      ...provided,
      color: state.isFocused ? 'var(--color-txt-light)' : 'var(--color-txt)',
      backgroundColor: state.isFocused ? 'var(--color-bg)' : 'none',
      cursor: 'pointer',
      margin: '3px',
      width: 'calc(100% - 6px)',
      padding:5,
      zIndex: 10,
    }
  },
  control: () => ({
    display: 'flex',
    padding: '0',
    borderRadius: '3px',
    border: 'none',
  }),
  input: (provided, _state) => ({
    ...provided,
    fontSize: '15px',
    minWidth: '50px',
    boxShadow: 'inset 0 -2px 0 rgba(255,255,255, 0.05)',
    color: 'var(--color-txt-light)',
  }),
  indicatorSeparator: () => ({
    width: '0',
    height: '60%',
    background: 'var(--color-arrd)',
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    display: state.isFocused ? 'none' : 'inherit',
    padding: '0 10px',
  }),
  dropdownIndicator: (_provided: any, state: any) => ({
    color: `var(${state.hover ? '--color-arrd-light' : '--color-arrd'})`,
    padding: '0 5px',
    cursor: 'pointer',
  }),
  valueContainer: (provided: any, state: any) => ({
    ...provided,
    padding: '0',
  }),

  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1,
      transition = 'opacity 300ms',
      fontSize = '14px',
      color = 'var(--color-arrd-light)'
    return { ...provided, color, fontSize, opacity, transition }
  },
  menuList: (provided: any) => ({
    ...provided,
    margin: '0',
    padding: '0',
    background: 'black',
    zIndex: 500,
    fontSize: '13px',
    borderRadius: '3px',
    border: 'none',
  }),
  multiValue: (provided: any) => ({
    ...provided,
    background: 'var(--color-arrd)',
    color: 'white',
    fontSize: '12px',
    padding: '5px'
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: 'white',
  }),
}

export default reactSelectStyle
