import React from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import {Text} from '../util/text/Text'
import {usePalette} from 'lib/hooks/usePalette'
import {s} from 'lib/styles'
import {UserAvatar} from '../util/UserAvatar'
import {Button} from '../util/forms/Button'
import {observer} from 'mobx-react-lite'
import {AlgoItemModel} from 'state/models/feeds/algo/algo-item'

const AlgoItem = observer(
  ({item, style}: {item: AlgoItemModel; style?: StyleProp<ViewStyle>}) => {
    const pal = usePalette('default')

    return (
      <View style={[styles.container, style]} key={item.data.uri}>
        <View style={[styles.headerContainer]}>
          <View style={[s.mr10]}>
            <UserAvatar size={36} avatar={item.data.avatar} />
          </View>
          <View style={[styles.headerTextContainer]}>
            <Text style={[pal.text, s.bold]}>
              {item.data.displayName ? item.data.displayName : 'Feed name'}
            </Text>
            <Text style={[pal.textLight, styles.description]}>
              {item.data.description ??
                'THIS IS A FEED DESCRIPTION, IT WILL TELL YOU WHAT THE FEED IS ABOUT. THIS IS A COOL FEED ABOUT COOL PEOPLE.'}
            </Text>
          </View>
        </View>

        {/* TODO: this feed is like by *3* people UserAvatars and others */}
        <View style={styles.bottomContainer}>
          <View style={styles.likedByContainer}>
            <View style={styles.likedByAvatars}>
              <UserAvatar size={24} avatar={item.data.avatar} />
              <UserAvatar size={24} avatar={item.data.avatar} />
              <UserAvatar size={24} avatar={item.data.avatar} />
            </View>

            <Text style={[pal.text, pal.textLight]}>Liked by 3 others</Text>
          </View>
          <View>
            <Button
              type="inverted"
              onPress={() => {
                if (item.data.viewer?.saved) {
                  item.unsave()
                } else {
                  item.save()
                }
              }}
              label={item.data.viewer?.saved ? 'Unsave' : 'Save'}
            />
          </View>
        </View>
      </View>
    )
  },
)
export default AlgoItem

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 20,
    flexDirection: 'column',
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    gap: 18,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  headerTextContainer: {
    flexDirection: 'column',
    columnGap: 4,
    flex: 1,
  },
  description: {
    flex: 1,
    flexWrap: 'wrap',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likedByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  likedByAvatars: {
    flexDirection: 'row',
    gap: -12,
  },
})