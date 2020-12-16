import React from 'react'
import classNames from 'classnames'

interface InputGroupProps{
    className?:string
    value:string
    error:string | undefined
    type: string
    placeholder: string
    setValue:(str:string) => void
}

const InputGroup:React.FC<InputGroupProps> = ({error,placeholder,className,value,setValue,type}) => {
    return <React.Fragment>
                            <div className={className}>
                        <input type={type}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                         className={classNames("w-full px-3 py-2 bg-gray-100 rounded outline-none gray__border transition duration-200 hover:bg-white focus:bg-white",{'error__border':error})}
                        placeholder={placeholder}/>
                    <small className="font-medium text-red-600">{error}</small>
                    </div>
    </React.Fragment>
}

export default InputGroup
