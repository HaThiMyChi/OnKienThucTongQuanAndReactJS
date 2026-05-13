import { ref } from 'yup'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  )
}
