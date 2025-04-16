import Test from './components/Test'
// import AVL from './components/AVL'
import AVL2 from './components/Balanced'
import ViteBack from './components/ViteBack'


const App =()=> {

  return (
    <>
    {/* <Router>
      <Routes>
        <Route path='/' element= {<Home />} /> 
        <Route path='/about' element= {<About />} /> 
        <Route path='/posts' element= {<Posts />} >
          <Route  path='new' elment={<NewPost />} />  
        <Route/> 
      </Routes>
    </Router> */}

     <ViteBack />
      <Test/>
      <AVL2/>
    </>
  )
}

export default App
