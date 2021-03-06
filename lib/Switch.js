'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

var _utils = require('./utils');

var Switch = (function (_React$Component) {
	_inherits(Switch, _React$Component);

	function Switch(props) {
		_classCallCheck(this, Switch);

		_get(Object.getPrototypeOf(Switch.prototype), 'constructor', this).call(this, props);

		this.onSlideEnd = this.onSlideEnd.bind(this);
		this.onSlideStart = this.onSlideStart.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);

		this.isTouchDevice = window['ontouchstart'] !== undefined;

		var activeState = this.activeStateFromProps(this.props);

		this.state = { sliding: false, active: activeState };
	}

	_createClass(Switch, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (!!this.props.locked) {
				return;
			}

			this.addListener();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (!!nextProps.locked != !!this.props.locked) {
				if (!!nextProps.locked) {
					this.removeListener();
				} else {
					this.addListener();
				}
			}
			if (nextProps.active !== this.props.active) {
				var newActiveState = this.activeStateFromProps(nextProps);
				if (newActiveState !== this.state.active) {
					this.state = { active: newActiveState };
				}
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			if (this.state.active != prevState.active) {
				var callback = this.state.active ? this.props.onActive : this.props.onInactive;
				callback && callback();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (!!this.props.locked) {
				return;
			}

			this.removeListener();
		}
	}, {
		key: 'activeStateFromProps',
		value: function activeStateFromProps(props) {
			var activeState = false;
			if (typeof props.active == 'undefined' && typeof props.inactive == 'undefined') {
				activeState = false;
			}

			if (typeof props.active != 'undefined' && props.active) {
				activeState = true;
			}

			if (typeof props.inactive != 'undefined' && props.inactive) {
				activeState = false;
			}
			return activeState;
		}
	}, {
		key: 'addListener',
		value: function addListener() {
			if (this.isTouchDevice) {
				document.addEventListener(_utils.events.touch.start, this.onSlideStart, false);
				document.addEventListener(_utils.events.touch.stop, this.onSlideEnd, false);
			} else {
				document.addEventListener(_utils.events.mouse.start, this.onSlideStart, false);
				document.addEventListener(_utils.events.mouse.stop, this.onSlideEnd, false);
			}
		}
	}, {
		key: 'removeListener',
		value: function removeListener() {
			if (this.isTouchDevice) {
				document.removeEventListener(_utils.events.touch.start, this.onSlideStart, false);
				document.removeEventListener(_utils.events.touch.stop, this.onSlideEnd, false);
			} else {
				document.removeEventListener(_utils.events.mouse.start, this.onSlideStart, false);
				document.removeEventListener(_utils.events.mouse.stop, this.onSlideEnd, false);
			}
		}
	}, {
		key: 'onSlideEnd',
		value: function onSlideEnd() {
			if (this.state.sliding) {
				this.setState({ sliding: false, active: !this.state.active });
				(0, _utils.reEnableScroll)();
			}
		}
	}, {
		key: 'onSlideStart',
		value: function onSlideStart(e) {
			if (e.target == this.refs.circle || e.target == this.refs['switch']) {
				this.setState({ sliding: true });
				(0, _utils.disableScroll)();
			}
		}
	}, {
		key: 'onMouseLeave',
		value: function onMouseLeave(e) {
			this.onSlideEnd(e);
		}
	}, {
		key: 'classes',
		value: function classes() {
			return (0, _classnames2['default'])('switch', { sliding: this.state.sliding }, { active: this.state.active }, { inactive: !this.state.active });
		}
	}, {
		key: 'switchStyles',
		value: function switchStyles() {
			var switchStyles = this.switchStylesProps();
			return (0, _utils.merge)({ borderRadius: switchStyles.width / 2 }, switchStyles);
		}
	}, {
		key: 'translationStyle',
		value: function translationStyle() {
			var circleStyles = this.circleStylesProps();
			var switchStyles = this.switchStyles();

			var offset = switchStyles.width - circleStyles.diameter;
			var translation = this.state.active ? offset : 0;

			if (this.state.sliding && this.state.active) {
				translation -= circleStyles.diameter / 4 + switchStyles.padding / 4;
			}

			return {
				transform: 'translateX(' + translation + 'px)'
			};
		}
	}, {
		key: 'backgroundStyle',
		value: function backgroundStyle() {
			var circleStyles = this.circleStylesProps();
			var backgroundColor = this.state.active ? circleStyles.onColor : circleStyles.offColor;
			return { backgroundColor: backgroundColor };
		}
	}, {
		key: 'circleStylesProps',
		value: function circleStylesProps() {
			return (0, _utils.merge)(defaultCircleStyles, this.props.circleStyles);
		}
	}, {
		key: 'switchStylesProps',
		value: function switchStylesProps() {
			return (0, _utils.merge)(defaultSwitchStyles, this.props.switchStyles);
		}
	}, {
		key: 'circleDimensionsStyle',
		value: function circleDimensionsStyle() {
			var switchStyles = this.switchStyles();
			var circleStyles = this.circleStylesProps();
			var width = this.state.sliding ? circleStyles.diameter + circleStyles.diameter / 4 : circleStyles.diameter;
			return { width: width, height: circleStyles.diameter };
		}
	}, {
		key: 'circleStyles',
		value: function circleStyles() {
			return (0, _utils.merge)(this.circleDimensionsStyle(), this.backgroundStyle(), this.translationStyle(), this.circleStylesProps());
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'span',
				{ style: this.switchStyles(),
					className: this.classes(),
					ref: 'switch',
					onMouseLeave: this.onMouseLeave },
				_react2['default'].createElement(_Label2['default'], { active: this.state.active, labels: this.props.labels, ref: 'label' }),
				_react2['default'].createElement('span', { style: this.circleStyles(), className: 'circle', ref: 'circle' })
			);
		}
	}]);

	return Switch;
})(_react2['default'].Component);

var defaultSwitchStyles = {
	width: 80,
	padding: 4,
	border: '1px solid #CFCFCF',
	display: 'flex',
	position: 'relative',
	backgroundColor: 'white',
	boxSizing: 'content-box'
};

var defaultCircleStyles = {
	diameter: 35,
	borderRadius: 35,
	display: 'block',
	transition: 'transform 200ms, width 200ms, background-color 200ms',
	onColor: '#70D600',
	offColor: '#CFCFCF'
};

Switch.propTypes = {
	active: _react2['default'].PropTypes.bool,

	circleStyles: _react2['default'].PropTypes.shape({
		onColor: _react2['default'].PropTypes.string,
		offColor: _react2['default'].PropTypes.string,
		diameter: _react2['default'].PropTypes.number
	}),

	inactive: _react2['default'].PropTypes.bool,

	labels: _react2['default'].PropTypes.shape({
		on: _react2['default'].PropTypes.string,
		off: _react2['default'].PropTypes.string
	}),

	locked: _react2['default'].PropTypes.bool,

	onActive: _react2['default'].PropTypes.func,
	onInactive: _react2['default'].PropTypes.func,

	switchStyles: _react2['default'].PropTypes.shape({
		width: _react2['default'].PropTypes.number
	})
};

Switch.defaultProps = {
	onInactive: function onInactive() {},
	onActive: function onActive() {},
	circleStyles: defaultCircleStyles,
	switchStyles: defaultSwitchStyles,
	labels: { on: '', off: '' }
};

exports['default'] = Switch;
module.exports = exports['default'];