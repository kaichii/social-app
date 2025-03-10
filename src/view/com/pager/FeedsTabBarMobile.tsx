import React from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {observer} from 'mobx-react-lite'
import {TabBar} from 'view/com/pager/TabBar'
import {RenderTabBarFnProps} from 'view/com/pager/Pager'
import {useStores} from 'state/index'
import {useHomeTabs} from 'lib/hooks/useHomeTabs'
import {usePalette} from 'lib/hooks/usePalette'
import {useColorSchemeStyle} from 'lib/hooks/useColorSchemeStyle'
import {Link} from '../util/Link'
import {Text} from '../util/text/Text'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {FontAwesomeIconStyle} from '@fortawesome/react-native-fontawesome'
import {s} from 'lib/styles'
import {HITSLOP_10} from 'lib/constants'
import {useMinimalShellMode} from 'lib/hooks/useMinimalShellMode'
import Animated from 'react-native-reanimated'

export const FeedsTabBar = observer(function FeedsTabBarImpl(
  props: RenderTabBarFnProps & {testID?: string; onPressSelected: () => void},
) {
  const pal = usePalette('default')
  const store = useStores()
  const items = useHomeTabs(store.preferences.pinnedFeeds)
  const brandBlue = useColorSchemeStyle(s.brandBlue, s.blue3)
  const {headerMinimalShellTransform} = useMinimalShellMode()

  const onPressAvi = React.useCallback(() => {
    store.shell.openDrawer()
  }, [store])

  return (
    <Animated.View
      style={[
        pal.view,
        pal.border,
        styles.tabBar,
        headerMinimalShellTransform,
        store.shell.minimalShellMode && styles.disabled,
      ]}>
      <View style={[pal.view, styles.topBar]}>
        <View style={[pal.view]}>
          <TouchableOpacity
            testID="viewHeaderDrawerBtn"
            onPress={onPressAvi}
            accessibilityRole="button"
            accessibilityLabel="Open navigation"
            accessibilityHint="Access profile and other navigation links"
            hitSlop={HITSLOP_10}>
            <FontAwesomeIcon
              icon="bars"
              size={18}
              color={pal.colors.textLight}
            />
          </TouchableOpacity>
        </View>
        <Text style={[brandBlue, s.bold, styles.title]}>
          {store.session.isSandbox ? 'SANDBOX' : 'Bluesky'}
        </Text>
        <View style={[pal.view]}>
          <Link
            testID="viewHeaderHomeFeedPrefsBtn"
            href="/settings/home-feed"
            hitSlop={HITSLOP_10}
            accessibilityRole="button"
            accessibilityLabel="Home Feed Preferences"
            accessibilityHint="">
            <FontAwesomeIcon
              icon="sliders"
              style={pal.textLight as FontAwesomeIconStyle}
            />
          </Link>
        </View>
      </View>
      <TabBar
        key={items.join(',')}
        onPressSelected={props.onPressSelected}
        selectedPage={props.selectedPage}
        onSelect={props.onSelect}
        testID={props.testID}
        items={items}
        indicatorColor={pal.colors.link}
      />
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 2,
    width: '100%',
  },
  title: {
    fontSize: 21,
  },
  disabled: {
    pointerEvents: 'none',
  },
})
