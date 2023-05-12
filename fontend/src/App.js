import React from 'react'
import Navbar from './components/Navbar'
import Uploader from './components/Uploader'

const App = () => {
  return (
    <div>
      <Navbar/>
      <div className='heading'>Add candidates to Database</div>
      <Uploader/>
    </div>
  )
}

export default App