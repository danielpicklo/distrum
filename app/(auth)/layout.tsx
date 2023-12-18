const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return ( 
    <div className="br-500-red h-full">
      { children }
    </div>
   );
}
 
export default AuthLayout;