import * as React from 'react'
import { StateConsumer } from '@jpreecedev/multi-react-global'

import styles from './styles.module.scss'

function Header() {
  return (
    <StateConsumer>
      {({ updateState, globalState }) => (
        <React.Fragment>
          <input
            className={styles.input}
            type="text"
            value={globalState.name}
            onChange={evt => updateState({ name: evt.target.value })}
          />
          <p>{globalState.name}</p>
        </React.Fragment>
      )}
    </StateConsumer>
  )
}

export default Header
