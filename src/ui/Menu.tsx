import { styled } from "styled-components"
import { IStore } from "../types"
import pausedAudioIcon from '../icons/pausedAudio.png'
import playedAudioIcon from '../icons/playedAudio.png'

export interface MenuProps extends Pick<IStore, 'isAudioPaused'> {
  onToggleSound?: (e: React.MouseEvent) => void;
}

const Menu = ({ isAudioPaused, onToggleSound }: MenuProps) => {

  return(
    <MenuInner>
      <MenuItem onClick={onToggleSound}>
        {isAudioPaused ? <img src={pausedAudioIcon} /> : <img src={playedAudioIcon} />}
      </MenuItem>
    </MenuInner>
  )
}

const MenuInner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  background: #2c3e50;
`

const MenuItem = styled.div`
  color: #fff;
  cursor: pointer;
`

export default Menu