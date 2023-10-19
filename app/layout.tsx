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
  title: "NB - Instagram",
  description: 'NB Instagram clone. Project made for learning and self-development.',
  keywords: "NB, NBojan, nbojan, instagram, clone, work, project, development, focus, insta",
  openGraph: {
    title: 'NB - Instagram',
    description: 'NB Instagram clone. Project made for learning and self-development.',
    url: 'https://nb-instagram.vercel.app/',
    siteName: 'NB - Instagram',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/insta-clone-cb289.appspot.com/o/appImages%2Fthumb2.png?alt=media&token=a8dd579c-0fda-45af-bf5b-60f5d35f4a54',
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
        url: 'https://firebasestorage.googleapis.com/v0/b/insta-clone-cb289.appspot.com/o/appImages%2Fthumb2.png?alt=media&token=a8dd579c-0fda-45af-bf5b-60f5d35f4a54',
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
