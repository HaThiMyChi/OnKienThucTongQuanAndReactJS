import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { getRules } from '../../utils/rules'
import Input from '../../components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type Schema } from '../../utils/rules'
import { registerAccount } from '../../apis/auth.api'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'

type FormData = Schema

export default function Register() {
  // watch() lắng nghe formState này
  // getValues() đọc formState này
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  // const rules = getRules(getValues)
  // Omit trong TypeScript Dùng để tạo type mới, bỏ field confirm_password.
  // omit trong lodash Dùng để tạo object mới, bỏ field confirm_password.
  // confirm_password chỉ dùng ở frontend để validate password nhập lại có khớp hay không. Sau khi validate xong, mình không cần gửi confirm_password lên backend, nên dùng omit để remove field này trước khi call API.

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  // Về data trong handleSubmit(data):
  // data được react-hook-form tự động thu thập từ các Input field thông qua register()

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess(data) {
        console.log('Đăng ký thành công', data)
      },
      onError(error) {
        console.log('Lỗi:', error)
      }
    })
  })

  const value = watch()
  console.log('value', value)

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                name='email'
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
                register={register}
              />

              <Input
                name='password'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={errors.password?.message}
                placeholder='Password'
                autoComplete='on'
              />

              <Input
                name='confirm_password'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm Password'
                autoComplete='on'
              />

              <div className='mt-2'>
                <button className='w-full bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'>
                  Đăng ký
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-red-400' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
