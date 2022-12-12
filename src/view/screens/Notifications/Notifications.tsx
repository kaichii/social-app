import React, {useState, useEffect} from 'react'
import {View} from 'react-native'
import {ViewHeader} from '../../com/util/ViewHeader'
import {Feed} from '../../com/notifications/Feed'
import {useStores} from '../../../state'
import {NotificationsViewModel} from '../../../state/models/notifications-view'
import {ScreenParams} from '../../routes'

export default ({navIdx, visible}: ScreenParams) => {
  const store = useStores()

  useEffect(() => {
    if (!visible) {
      return
    }
    console.log('Updating notifications feed')
    store.me.refreshMemberships() // needed for the invite notifications
    store.me.notifications
      .update()
      .catch(e => {
        console.error('Error while updating notifications feed', e)
      })
      .then(() => {
        store.me.notifications.updateReadState()
      })
    store.nav.setTitle(navIdx, 'Notifications')
  }, [visible, store])

  const onPressTryAgain = () => {
    store.me.notifications.refresh()
  }

  return (
    <View style={{flex: 1}}>
      <ViewHeader title="Notifications" />
      <Feed view={store.me.notifications} onPressTryAgain={onPressTryAgain} />
    </View>
  )
}