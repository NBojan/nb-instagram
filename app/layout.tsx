import './globals.css'
import type { Metadata } from 'next'
import { Navbar, UploadModal } from './components';
import { Cabin, Quicksand } from 'next/font/google'
import { ContextProvider } from "./context/context";

const cabin = Cabin({ 
  subsets: ['latin'],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cabin"
})
const quicksand = Quicksand({ 
  subsets: ['latin'],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand"
})

export const metadata: Metadata = {
  title: 'NB - Instagram',
  description: 'NB Instagram clone. Project made for learning and self-development.',
  applicationName: 'NB Instagram',
  creator: 'NBojan',
  keywords: 'NBojan, instagram, insta, project, learning, clone, insta'
  
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cabin.variable} ${quicksand.variable}`}>
      <body>
        <ContextProvider>
          <Navbar />
          <UploadModal />
          <main className='page py-8'>
            {children}
          </main>
        </ContextProvider>
      </body>
    </html>
  )
}
