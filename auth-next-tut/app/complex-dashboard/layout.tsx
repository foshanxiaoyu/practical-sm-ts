// import UserAnalytics from '@/components/UserAnalytics' // 用户分析
// import RevenueMetrics from '@/components/RevenueMetrics' // 收入指标
// import Notifications from '@/components/Notifications' //通知
 


type Props = {}

const layoutDashboard = ({
    children,
    users,revenue,Notifications // slots
}: {
    children:React.ReactNode,
    users:React.ReactNode,
    revenue:React.ReactNode,
    Notifications:React.ReactNode,
}) => {
  return (
    <>
    <div>{children}</div>
    {/* <UserAnalytics />
    <RevenueMetrics />
    <Notifications /> */}
    {/* <div className=' flex'> */}
    <div style={{display:"flex"}}>
        <div className=' flex flex-col'>
        {/* <div style={{display:"flex",flexDirection: "column"}}> */}
            <div>{users}</div>
            <div>{revenue}</div>
        </div>
        <div className=' flex flex-1'>
        {/* <div style={{display:'flex',flex: 1 }} > */}
            {Notifications}
        </div>
    </div>
    </>
  )
}

export default layoutDashboard