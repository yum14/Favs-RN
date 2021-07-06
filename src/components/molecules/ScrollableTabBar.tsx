import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import {
  ViewPropTypes,
  View,
  Animated,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import { width } from '../../lib/window';

const WINDOW_WIDTH = width;

export interface TabStylesForEachTabLabel {
  tabLabel: string;
  style: ViewStyle;
}

const ScrollableTabBar = createReactClass({
  propTypes: {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    scrollOffset: PropTypes.number,
    style: ViewPropTypes.style,
    tabStyle: ViewPropTypes.style,
    tabsContainerStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style,
    onScroll: PropTypes.func,
  },

  getDefaultProps() {
    return {
      scrollOffset: 52,
      activeTextColor: 'white',
      // inactiveTextColor: 'black',
      inactiveTextColor: 'white',
      backgroundColor: null,
      style: {},
      tabStyle: {},
      tabsContainerStyle: {},
      underlineStyle: {},
    };
  },

  getInitialState() {
    this._tabsMeasurements = [];
    return {
      // _leftTabUnderline: new Animated.Value(0),
      // _widthTabUnderline: new Animated.Value(0),
      _containerWidth: null,
      _tabUnderlineBackgroundColor: 'red',
    };
  },

  componentDidMount() {
    this.props.scrollValue.addListener(this.updateView);
  },

  updateView(offset) {
    const position = Math.floor(offset.value);
    const pageOffset = offset.value % 1;
    const tabCount = this.props.tabs.length;
    const lastTabPosition = tabCount - 1;

    if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
      return;
    }

    if (this.necessarilyMeasurementsCompleted(position, position === lastTabPosition)) {
      this.updateTabPanel(position, pageOffset);
      this.updateTabUnderline(position, pageOffset, tabCount);
    }
  },

  necessarilyMeasurementsCompleted(position, isLastTab) {
    return (
      this._tabsMeasurements[position] &&
      (isLastTab || this._tabsMeasurements[position + 1]) &&
      this._tabContainerMeasurements &&
      this._containerMeasurements
    );
  },

  updateTabPanel(position, pageOffset) {
    const containerWidth = this._containerMeasurements.width;
    const tabWidth = this._tabsMeasurements[position].width;
    const nextTabMeasurements = this._tabsMeasurements[position + 1];
    const nextTabWidth = (nextTabMeasurements && nextTabMeasurements.width) || 0;
    const tabOffset = this._tabsMeasurements[position].left;
    const absolutePageOffset = pageOffset * tabWidth;
    let newScrollX = tabOffset + absolutePageOffset;

    // center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
    newScrollX -= (containerWidth - (1 - pageOffset) * tabWidth - pageOffset * nextTabWidth) / 2;
    newScrollX = newScrollX >= 0 ? newScrollX : 0;

    if (Platform.OS === 'android') {
      this._scrollView.scrollTo({ x: newScrollX, y: 0, animated: false });
    } else {
      const rightBoundScroll = this._tabContainerMeasurements.width - this._containerMeasurements.width;
      newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
      this._scrollView.scrollTo({ x: newScrollX, y: 0, animated: false });
    }
  },

  updateTabUnderline(position, pageOffset, tabCount) {
    // const lineLeft = this._tabsMeasurements[position].left;
    // const lineRight = this._tabsMeasurements[position].right;
    // if (position < tabCount - 1) {
    //   const nextTabLeft = this._tabsMeasurements[position + 1].left;
    //   const nextTabRight = this._tabsMeasurements[position + 1].right;
    //   const newLineLeft = pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft;
    //   const newLineRight = pageOffset * nextTabRight + (1 - pageOffset) * lineRight;
    //   this.state._leftTabUnderline.setValue(newLineLeft);
    //   this.state._widthTabUnderline.setValue(newLineRight - newLineLeft);
    // } else {
    //   this.state._leftTabUnderline.setValue(lineLeft);
    //   this.state._widthTabUnderline.setValue(lineRight - lineLeft);
    // }
    this.setState({
      _tabUnderlineBackgroundColor: this.props.tabStylesForEachTabLabel[position].style.backgroundColor,
    });
  },

  renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
    const { activeTextColor, inactiveTextColor, textStyle, tabStylesForEachTabLabel } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    const defaultTabStyle = isTabActive
      ? {
          ...styles.tab,
          ...styles.activeTab,
        }
      : {
          ...styles.tab,
        };

    const tabStyle = tabStylesForEachTabLabel.find(item => item.tabLabel === name);

    return (
      <TouchableWithoutFeedback
        key={`${name}_${page}`}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}
        onLayout={onLayoutHandler}
      >
        <View style={[defaultTabStyle, this.props.tabStyle, tabStyle ? tabStyle.style : null]}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={[{ color: textColor, fontWeight }, textStyle]}>
            {name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  },

  measureTab(page, event) {
    const { x, width, height } = event.nativeEvent.layout;
    this._tabsMeasurements[page] = { left: x, right: x + width, width, height };
    this.updateView({ value: this.props.scrollValue.__getValue() });
  },

  render() {
    // const tabUnderlineStyle = {
    //   position: 'absolute',
    //   height: 4,
    //   backgroundColor: 'navy',
    //   bottom: 0,
    // };

    // const dynamicTabUnderline = {
    //   left: this.state._leftTabUnderline,
    //   width: this.state._widthTabUnderline,
    // };

    return (
      <View
        style={[styles.container, { backgroundColor: this.props.backgroundColor }, this.props.style]}
        onLayout={this.onContainerLayout}
      >
        <ScrollView
          ref={scrollView => {
            this._scrollView = scrollView;
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled={true}
          bounces={false}
          scrollsToTop={false}
        >
          <View
            style={[styles.tabs, { width: this.state._containerWidth }, this.props.tabsContainerStyle]}
            ref={'tabContainer'}
            onLayout={this.onTabContainerLayout}
          >
            {this.props.tabs.map((name, page) => {
              const isTabActive = this.props.activeTab === page;
              const renderTab = this.props.renderTab || this.renderTab;
              return renderTab(name, page, isTabActive, this.props.goToPage, this.measureTab.bind(this, page));
            })}
            {/* <Animated.View style={[tabUnderlineStyle, dynamicTabUnderline, this.props.underlineStyle]} /> */}
          </View>
        </ScrollView>
        <View style={[styles.tabUnderlineStyle, { backgroundColor: this.state._tabUnderlineBackgroundColor }]} />
      </View>
    );
  },

  componentDidUpdate(prevProps) {
    // If the tabs change, force the width of the tabs container to be recalculated
    if (JSON.stringify(prevProps.tabs) !== JSON.stringify(this.props.tabs) && this.state._containerWidth) {
      this.setState({ _containerWidth: null });
    }
  },

  onTabContainerLayout(e) {
    this._tabContainerMeasurements = e.nativeEvent.layout;
    let width = this._tabContainerMeasurements.width;
    if (width < WINDOW_WIDTH) {
      width = WINDOW_WIDTH;
    }
    this.setState({ _containerWidth: width });
    this.updateView({ value: this.props.scrollValue.__getValue() });
  },

  onContainerLayout(e) {
    this._containerMeasurements = e.nativeEvent.layout;
    this.updateView({ value: this.props.scrollValue.__getValue() });
  },
});

export default ScrollableTabBar;

const styles = StyleSheet.create({
  tab: {
    // flex: 1,
    maxWidth: WINDOW_WIDTH * 0.8,
    // minWidth: WINDOW_WIDTH * 0.3,
    // height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    marginTop: 6,
  },
  activeTab: {
    // height: 40,
    paddingHorizontal: 42,
    marginTop: 0,
  },
  container: {
    height: 46,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
  tabs: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    justifyContent: 'flex-start',
  },
  tabUnderlineStyle: {
    // position: 'absolute',
    height: 6,
    backgroundColor: 'navy',
    bottom: 0,
    width: WINDOW_WIDTH,
  },
});
