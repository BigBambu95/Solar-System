import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { MainController } from '../controllers'
import Menu from './Menu'
import store from '../store'


const App = observer(() => {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(container.current) {
      MainController.instance.init(container.current)
    }
  }, [])

  return(
    <div>
      <Menu isAudioPaused={store.isAudioPaused} onToggleSound={store.toggleSound} />
      <div ref={container} id="canvas" />
    </div>
  )
})


export default App