import { toast } from 'react-toastify'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getStudents, getStudent, deleteStudent } from 'apis/students.api'
import { useQueryString } from 'utils/utils'
import classNames from 'classnames'

const LIMIT = 10
export default function Students() {
  /**
   * - Hãy nhớ: Tên function là Students thì các kiểu dữ liệu (data type) được dùng trong
   * function thì không được giống với tên function.
   * - Ví dụ: ở đây có tên function là Students thì khi sử dụng kiểu dữ liệu thì tên phải khác
   * với Student.
   *
   * - Cho nên chỗ này sử dụng kiểu <StudentsType> là như vậy đó. Hiểu chưa 👍
   * - Lần này ta đặt chỗ đó là kiểu <Students> mà khi run lên thì bị lỗi, nên đổi tên lại
   * thành <StudentsType> 👍
   */

  /**
   * ❌❌❌
   * - Dưới đây là cách setup cái students khi mà chúng ta gọi với cách thông thường.
   * - Khi dùng cách này thì setup rất dài. Kiểu như là setting đi setting lại như là
   * isLoading này, và gọi lại 2 cái state như là students, isLoading
   * - Và chúng ta cũng sẽ tự quản lý cái việc mà setLoading là true, setLoading là false
   * ❌❌❌
   */

  /**
   * - ✅ Nhắc lại kẻo quên:
   * - <StudentsType> là một kiểu generic type
   */

  // const [students, setStudents] = useState<StudentsType>([])
  // const [isLoading, setIsLoading] = useState<boolean>(false)

  /**
   * Đoạn này có nghĩa là gọi API của getStudents
   */

  // useEffect(() => {
  //   setIsLoading(true)
  //   getStudents(1, 10)
  //     .then((res) => {

  /**
   * - data này có kiểu Students. Students được khai báo ở file students.api.ts
   * - Được truyền vào từ đây nè => http.get<Students>
   */
  //       setStudents(res.data)
  //     })

  /**
   * - Ở đây ta dùng .finally()
   * - Khi nào nó sẽ nhảy vào .finally() ?
   * - Thì khi mà api nó gọi xong hoặc là gọi bị lỗi thì nó sẽ chạy vào .finally()
   * - .finally() này nó nhận vào cái callback
   */

  //     .finally(() => {
  //       setIsLoading(false)
  //     })
  // }, [])

  /**
   * ✅✅✅
   * - Dùng cách thông thường dài quá, nên ta sẽ dùng cách React Query
   * - Trước khi dùng thì chúng ta sẽ cài React Query và setup React Query
   *
   * - 👉 Thì bây giờ chúng ta sẽ convert đoạn code trên thành code React Query
   * ✅✅✅
   */

  const queryClient = useQueryClient()

  /**
   * - queryString này chúng ta khai báo cái interface cho nó.
   * - Ở đây chúng ta khai báo interface là { page?: string }
   */

  const queryString: {
    page?: string
  } = useQueryString()

  /**
   * Dòng này có nghĩa là khi mà page chưa có, tức là page = undefined thì sẽ lấy page = 1
   */

  const page = Number(queryString.page) || 1
  console.log('page', page)

  /**
   * Nếu giá trị của tùy chọn "keepPreviousData" là "true", điều đó có nghĩa là khi thực hiện refetch (tải lại dữ liệu từ máy chủ), dữ liệu cũ sẽ được giữ lại và hiển thị
   * trên trang web trong khi dữ liệu mới đang được tải về từ máy chủ. Việc giữ lại dữ liệu cũ có thể
   * giúp tránh tình trạng màn hình trống trong khi đang tải dữ liệu mới và giúp cải thiện trải
   * nghiệm người dùng.
   */

  /**
   * Nó retry khi mà mạng internet của chúng ta nó có vấn đề
   * Ví dụ như: Chúng ta đang GET API mà bị rớt mạng thì nó sẽ retry lại cho chúng ta
   * Ở đây set giá trị retry = 0 thì khi nó bị rớt mạng thì nó không retry lại nữa
   */

  const studentsQuery = useQuery({
    queryKey: ['students', page],
    queryFn: () => {
      const controller = new AbortController()

      setTimeout(() => {
        controller.abort()
      }, 5000)
      return getStudents(page, LIMIT, controller.signal)
    },
    keepPreviousData: true,
    retry: 0
  })

  const deleteStudentMutation = useMutation({
    mutationFn: (id: number | string) => deleteStudent(id),
    onSuccess: (_, id) => {
      toast.success(`Xóa thành công student với id là ${id}`)
      queryClient.invalidateQueries({
        queryKey: ['students', page],
        exact: true
      })
    }
  })

  const refetchStudents = () => {
    studentsQuery.refetch()
  }

  const cancelRequestStudents = () => {
    queryClient.cancelQueries({
      queryKey: ['students', page]
    })
  }

  const fetchStudent = (second: number) => {
    const id = '6'
    queryClient.prefetchQuery({
      queryKey: ['student', id],
      queryFn: () => getStudent(id),
      staleTime: second * 1000
    })
  }

  /**
   * Đoạn code này có nghĩa là khi mình hover chuột qua các user thì nó
   * tự động load data liệu luôn, để khi người dùng click vào user đó thì dữ liệu đó đã tải trước rồi
   * Khi người dùng click vào user nào đó thì nó sẽ load ra dữ liệu luôn chứ không cần chờ thời gian (timeout) nữa
   */

  const handlePrefetchStudent = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ['student', String(id)],
      queryFn: () => getStudent(id),
      staleTime: 10 * 1000
    })
  }

  const handleDeleteStudent = (id: number) => {
    deleteStudentMutation.mutate(id)
  }

  const totalStudents = Number(studentsQuery.data?.headers['x-total-count'] || 0)
  const totalPage = Math.ceil(totalStudents / LIMIT)
  return (
    <div>
      <h1 className='text-lg'>Students</h1>
      <div>
        <button className='mt-6 rounded bg-blue-500 px-5 py-2 text-white' onClick={() => fetchStudent(10)}>
          Click 10s
        </button>
      </div>
      <div>
        <button className='mt-6 rounded bg-blue-500 px-5 py-2 text-white' onClick={() => fetchStudent(2)}>
          Click 2s
        </button>
      </div>
      <div>
        <button className='mt-6 rounded bg-pink-700 px-5 py-2 text-white' onClick={refetchStudents}>
          Refetch Students
        </button>
      </div>
      <div>
        <button className='mt-6 rounded bg-pink-700 px-5 py-2 text-white' onClick={cancelRequestStudents}>
          {' '}
          Cancel Request Students
        </button>
      </div>
      <div className='mt-6'>
        <Link
          to='/students/add'
          className='rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
        >
          Add Student
        </Link>
      </div>

      {studentsQuery.isLoading && (
        <div role='status' className='mt-6 animate-pulse'>
          <div className='dark: mb-4 h-4 rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <span className='sr-only'>Loading...</span>
        </div>
      )}
      {!studentsQuery.isLoading && (
        <Fragment>
          <div className='relative mt-6 overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
              <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    #
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Avatar
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Name
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Email
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    <span className='sr-only'>Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentsQuery.data?.data.map((student) => (
                  <tr
                    key={student.id}
                    className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
                    onMouseEnter={() => handlePrefetchStudent(student.id)}
                  >
                    <td className='px-6 py-4'>{student.id}</td>
                    <td className='px-6 py-4'>
                      <img src={student.avatar} alt='student' className='h-5 w-5' />
                    </td>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      {student.last_name}
                    </th>
                    <td className='px-6 py-4'>{student.email}</td>
                    <td className='px-6 py-4 text-right'>
                      <Link
                        to={`/students/${student.id}`}
                        className='mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500'
                      >
                        Edit
                      </Link>
                      <button
                        type='button'
                        className='font-medium text-red-600 disabled:opacity-50 dark:text-red-500'
                        onClick={() => handleDeleteStudent(student.id)}
                        disabled={deleteStudentMutation.isPending}
                      >
                        {deleteStudentMutation.isPending ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='mt-6 flex justify-center'>
            <nav aria-label='Page navigation example'>
              <ul className='inline-flex -space-x-px'>
                <li>
                  {page === 1 ? (
                    <span className='cursor-not-allowed rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700'>
                      Previous
                    </span>
                  ) : (
                    <Link
                      className='rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                      to={`/students?page=${page - 1}`}
                    >
                      Previous
                    </Link>
                  )}
                </li>

                {Array(totalPage)
                  .fill(0)
                  .map((_, index) => {
                    const pageNumber = index + 1
                    const isActive = page === pageNumber
                    return (
                      <li key={pageNumber}>
                        <Link
                          className={classNames(
                            'border border-gray-300 px-3 py-2 leading-tight hover:bg-gray-100 hover:text-gray-700',
                            {
                              'bg-gray-100 text-gray-700': isActive,
                              'bg-white text-gray-500': !isActive
                            }
                          )}
                          to={`/students?page=${pageNumber}`}
                        >
                          {pageNumber}
                        </Link>
                      </li>
                    )
                  })}

                <li>
                  {page === totalPage ? (
                    <span className='cursor-not-allowed rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700'>
                      Next
                    </span>
                  ) : (
                    <Link
                      className='rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                      to={`/students?page=${page + 1}`}
                    >
                      Next
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </Fragment>
      )}
    </div>
  )
}
