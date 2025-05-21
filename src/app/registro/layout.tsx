import "@/styles/pagRegistro.css"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( 
        <>
            {children}
        </>     
    )
}