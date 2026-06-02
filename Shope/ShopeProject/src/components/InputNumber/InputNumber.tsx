import React, { forwardRef, type InputHTMLAttributes, useState } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

// forwardRef giúp "chuyển tiếp" cái ref từ cha xuống thẻ input thực tế bên dưới
const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    errorMessage,
    className,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    onChange,
    value = '', // Giá trị mặc định là chuỗi rỗng để tránh lỗi khi value là undefined hoặc null
    ...rest
  },
  ref // ref này được nhận từ cha
) {
  const [localValue, setLocalValue] = useState<string>(value as string)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    // /^\d+$/ chỉ cho phép số nguyên dương.
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange(event)

      // Cập nhật localValue state
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      {/* Gắn ref nó vào thẻ input thật */}
      <input className={classNameInput} onChange={handleChange} value={value || localValue} {...rest} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
