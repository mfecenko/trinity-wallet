import assign from 'lodash/assign';
import noop from 'lodash/noop';
import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import CustomTextInput from 'ui/components/CustomTextInput';

const getProps = (overrides) =>
    assign(
        {},
        {
            onChangeText: noop,
            label: 'foo',
            theme: { body: {}, input: {}, primary: {}, label: {} },
            currencyConversion: true,
            fingerprintAuthentication: true,
        },
        overrides,
    );

describe('Testing CustomTextInput component', () => {
    describe('propTypes', () => {
        it('should require an onChangeText function as a prop', () => {
            expect(CustomTextInput.propTypes.onChangeText).toEqual(PropTypes.func.isRequired);
        });

        it('should require a theme object as a prop', () => {
            expect(CustomTextInput.propTypes.theme).toEqual(PropTypes.object.isRequired);
        });

        it('should require a label string as a prop', () => {
            expect(CustomTextInput.propTypes.label).toEqual(PropTypes.string);
        });

        it('should accept an onFocus function as a prop', () => {
            expect(CustomTextInput.propTypes.onFocus).toEqual(PropTypes.func);
        });

        it('should accept an onBlur function as a prop', () => {
            expect(CustomTextInput.propTypes.onBlur).toEqual(PropTypes.func);
        });

        it('should accept a containerStyle object as a prop', () => {
            expect(CustomTextInput.propTypes.containerStyle).toEqual(PropTypes.object);
        });

        it('should accept a onDenominationPress function as a prop', () => {
            expect(CustomTextInput.propTypes.onDenominationPress).toEqual(PropTypes.func);
        });

        it('should accept a denominationText string as a prop', () => {
            expect(CustomTextInput.propTypes.denominationText).toEqual(PropTypes.string);
        });

        it('should accept a onQRPress function as a prop', () => {
            expect(CustomTextInput.propTypes.onQRPress).toEqual(PropTypes.func);
        });

        it('should accept a fingerprintAuthentication boolean as a prop', () => {
            expect(CustomTextInput.propTypes.fingerprintAuthentication).toEqual(PropTypes.bool);
        });

        it('should accept a onFingerprintPress function as a prop', () => {
            expect(CustomTextInput.propTypes.onFingerprintPress).toEqual(PropTypes.func);
        });

        it('should accept a innerPadding object as a prop', () => {
            expect(CustomTextInput.propTypes.innerPadding).toEqual(PropTypes.object);
        });

        it('should accept a currencyConversion boolean as a prop', () => {
            expect(CustomTextInput.propTypes.currencyConversion).toEqual(PropTypes.bool);
        });

        it('should accept a conversionText string as a prop', () => {
            expect(CustomTextInput.propTypes.conversionText).toEqual(PropTypes.string);
        });

        it('should accept a height number as a prop', () => {
            expect(CustomTextInput.propTypes.height).toEqual(PropTypes.number);
        });

        it('should accept a onRef function as a prop', () => {
            expect(CustomTextInput.propTypes.onRef).toEqual(PropTypes.func);
        });

        it('should accept a testID string as a prop', () => {
            expect(CustomTextInput.propTypes.testID).toEqual(PropTypes.string);
        });
    });

    describe('when renders', () => {
        it('should not explode', () => {
            const props = getProps();

            const wrapper = shallow(<CustomTextInput {...props} />);
            expect(wrapper.name()).toEqual('View');
        });

        it('should return "label" prop (uppercased) as a child to "Text" component', () => {
            const props = getProps();

            const wrapper = shallow(<CustomTextInput {...props} />);
            expect(
                wrapper
                    .find('Text')
                    .children()
                    .text(),
            ).toEqual('FOO');
        });

        it('should return a "TextInput" component', () => {
            const props = getProps();

            const wrapper = shallow(<CustomTextInput {...props} />);
            expect(wrapper.find('TextInput').length).toEqual(1);
        });

        it('should render Text component', () => {
            const props = getProps();

            const wrapper = shallow(<CustomTextInput {...props} />);
            expect(wrapper.find('Text').length).toBe(2);
        });

        describe('and widget is set to denomination', () => {
            it('should call props method "onDenominationPress" on press event', () => {
                const props = getProps({
                    widget: 'denomination',
                    onDenominationPress: jest.fn(),
                });

                const wrapper = shallow(<CustomTextInput {...props} />);
                const touchableOpacity = wrapper.find('TouchableOpacity').first();

                touchableOpacity.props().onPress();

                expect(props.onDenominationPress).toHaveBeenCalledTimes(1);
            });
        });

        describe('and widget is set to qr', () => {
            it('should call props method "onQRPress" on press event', () => {
                const props = getProps({
                    widget: 'qr',
                    onQRPress: jest.fn(),
                });

                const wrapper = shallow(<CustomTextInput {...props} />);
                const touchableOpacity = wrapper.find('TouchableOpacity').first();

                touchableOpacity.props().onPress();

                expect(props.onQRPress).toHaveBeenCalledTimes(1);
            });
        });

        describe('and widget is set to passwordReentry', () => {
            it('should render Icon', () => {
                const props = getProps({
                    widget: 'passwordReentry',
                });

                const wrapper = shallow(<CustomTextInput {...props} />);
                expect(wrapper.find('Icon').length).toBe(2);
            });
        });
    });

    describe('lifecycle methods', () => {
        describe('when called', () => {
            describe('#componentDidMount', () => {
                describe('when prop method "onRef" is defined', () => {
                    it('should call prop method "onRef" with component instance', () => {
                        const props = getProps({
                            onRef: jest.fn(),
                        });

                        const instance = shallow(<CustomTextInput {...props} />).instance();
                        expect(props.onRef).toHaveBeenCalledWith(instance);
                    });
                });
            });

            describe('#componentWillUnmount', () => {
                describe('when prop method "onRef" is defined', () => {
                    it('should call prop method "onRef" with null', () => {
                        const props = getProps({
                            onRef: jest.fn(),
                        });

                        const wrapper = shallow(<CustomTextInput {...props} />);
                        wrapper.unmount();
                        expect(props.onRef).toHaveBeenCalledWith(null);
                    });
                });
            });
        });
    });

    describe('instance methods', () => {
        describe('when called', () => {
            describe('#onFocus', () => {
                it('should set state prop "isFocused" to true', () => {
                    const props = getProps();

                    const wrapper = shallow(<CustomTextInput {...props} />);
                    const instance = wrapper.instance();

                    expect(wrapper.state().isFocused).toEqual(false);
                    instance.onFocus();
                    expect(wrapper.state().isFocused).toEqual(true);
                });
            });

            describe('#onBlur', () => {
                it('should set state prop "isFocused" to false', () => {
                    const props = getProps();

                    const wrapper = shallow(<CustomTextInput {...props} />);
                    wrapper.setState({ isFocused: true });

                    const instance = wrapper.instance();

                    instance.onBlur();
                    expect(wrapper.state().isFocused).toEqual(false);
                });
            });

            describe('#getChecksumStyle', () => {
                it('should return theme with body color', () => {
                    const props = getProps({
                        seed: '9'.repeat(81),
                        theme: {
                            bg: { color: '#000000' },
                            body: { color: '#FFFFFFF' },
                            primary: { color: '#000000' },
                            input: {},
                            label: {},
                        },
                    });

                    const instance = shallow(<CustomTextInput {...props} />).instance();
                    const style = instance.getChecksumStyle();
                    expect(style.color.toString()).toEqual('#000000');
                    expect(style.color.toString()).toEqual('#000000');
                });
            });

            describe('#getChecksumValue', () => {
                describe('when seed length is not zero and seed contains any character other than (A-Z, 9)', () => {
                    it('should return "!"', () => {
                        const props = getProps({ seed: '-!' });

                        const instance = shallow(<CustomTextInput {...props} />).instance();
                        const checksum = instance.getChecksumValue();

                        expect(checksum).toEqual('!');
                    });
                });

                describe('when seed length is not zero and seed length is less than 81', () => {
                    it('should return "< 81"', () => {
                        const props = getProps({ seed: 'A'.repeat(80) });

                        const instance = shallow(<CustomTextInput {...props} />).instance();
                        const checksum = instance.getChecksumValue();

                        expect(checksum).toEqual('< 81');
                    });
                });

                describe('when seed length is 81 and seed contains valid characters (A-Z, 9)', () => {
                    it('should return computed checksum of seed', () => {
                        const props = getProps({ seed: '9'.repeat(81) });

                        const instance = shallow(<CustomTextInput {...props} />).instance();
                        const checksum = instance.getChecksumValue();

                        expect(checksum).toEqual('KZW');
                    });
                });

                describe('when seed length is 0', () => {
                    it('should return "...', () => {
                        const props = getProps({ seed: '' });

                        const instance = shallow(<CustomTextInput {...props} />).instance();
                        const checksum = instance.getChecksumValue();

                        expect(checksum).toEqual('...');
                    });
                });
            });
        });
    });

    describe('when focus event of TextInput is triggered', () => {
        it('should call instance method "onFocus"', () => {
            const props = getProps();

            const wrapper = shallow(<CustomTextInput {...props} />);
            const instance = wrapper.instance();

            jest.spyOn(instance, 'onFocus');

            const textInput = wrapper.find('TextInput');

            expect(wrapper.state().isFocused).toEqual(false);
            textInput.props().onFocus();
            expect(wrapper.state().isFocused).toEqual(true);

            expect(instance.onFocus).toHaveBeenCalledTimes(1);
        });
    });

    describe('when blur event of TextInput is triggered', () => {
        it('should call instance method "onBlur"', () => {
            const props = getProps();

            const wrapper = shallow(<CustomTextInput {...props} />);
            const instance = wrapper.instance();

            jest.spyOn(instance, 'onBlur');

            const textInput = wrapper.find('TextInput');

            wrapper.setState({ isFocused: true });
            textInput.props().onBlur();
            expect(wrapper.state().isFocused).toEqual(false);

            expect(instance.onBlur).toHaveBeenCalledTimes(1);
        });
    });

    describe('when press event of TouchableOpacity is triggered', () => {
        it('should call props method "onFingerprintPress"', () => {
            const props = getProps({
                onFingerprintPress: jest.fn(),
            });

            const wrapper = shallow(<CustomTextInput {...props} />);
            const touchableOpacity = wrapper.find('TouchableOpacity');

            touchableOpacity.props().onPress();

            expect(props.onFingerprintPress).toHaveBeenCalledTimes(1);
        });
    });
});
