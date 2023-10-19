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
  openGraph: {
    title: 'NB - Instagram',
    description: 'NB Instagram clone. Project made for learning and self-development.',
    url: 'https://nb-instagram.vercel.app/',
    siteName: 'NB - Instagram',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/insta-clone-cb289.appspot.com/o/appImages%2Fthumb.png?alt=media&token=7e9e5088-a05d-44f7-b623-33588845e38c',
        width: 1280,
        height: 642,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    title: 'NB - Instagram',
    site: 'NB - Instagram',
    description: 'NB Instagram clone. Project made for learning and self-development.',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/insta-clone-cb289.appspot.com/o/appImages%2Fthumb.png?alt=media&token=7e9e5088-a05d-44f7-b623-33588845e38c',
        width: 1280,
        height: 642,
      },
    ],
    creator: 'NBojan',
    creatorId: 'NBojan',
    card: 'summary'
  }
  
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
