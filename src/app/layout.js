import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer"; 
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata = {
//   title: "Free table reservation with discounts and offers in Nagpur",
//   description: "Book a table with discounts and exclusive offers in Nagpur.",
//   icons: {
//     icon: "/download.png", 
//   },
// };
export const metadata = {
  title: 'Riteshwari Ganjare',
  description: 'Royal solution for websites and softwares',
  icons: {
        icon: "/download.png", 
      },
  keywords: ['riteshwari', 'seo', 'web development',"ritu"],
  openGraph: {
    title: 'Riteshwari Royal Solution',
    description: 'Providing Royal solution for websites and softwares',
    url: 'https://rite-mpvt-riteshwaris-projects.vercel.app/',
    image: 'https://your-site.com/og-image.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Website Title',
    description: 'Description of your website for SEO',
    image: '/download.png',
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
