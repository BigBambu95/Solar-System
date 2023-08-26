import { useEffect, useRef } from 'react'
import { MainController } from '../controllers'

const App = () => {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(container.current) {
      MainController.instance.init(container.current)
    }
  }, [])

  return(
    <div>
      <div ref={container} id="canvas" />
    </div>
  )
}


export default App