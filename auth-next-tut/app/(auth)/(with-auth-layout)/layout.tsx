type Props = {children:React.ReactNode}
export default function AuthLayout({
    children,
}: Props ) {
  return (
    <div>
        <h2>Inner layout(with-auth-layout)</h2>
        {children} 
    </div>
  )
}