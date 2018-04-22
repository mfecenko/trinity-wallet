import { expect } from 'chai';
import { getMostCommon } from '../../../libs/iota/quorum';

// random objects for testing

const a = {
    testobj: 1,
    test: [
        {
            'nested objects and arrays': 'xyz',
        },
        {
            a: 0.01,
            b: 1,
            c: true,
            d: [false],
        },
    ],
};

const b = {
    w: 1,
    test: [
        {
            'nested objects and arrays': 'xyz',
        },
        {
            a: 0.01,
            b: 1,
            c: true,
            d: [true],
        },
    ],
};

const c = {
    w: 1,
    test: [
        {
            'nested objects and arrays': 'xyz',
        },
        {
            a: 0.01,
            b: 1,
            c: false,
            d: [false],
        },
    ],
};

const d = {
    w: 1,
    test: [
        {
            'nested objects and arrays': 'xyz',
        },
        {
            a: 0.0099,
            b: 1,
            c: false,
            d: [false],
        },
    ],
};

const e = {
    w: 1,
    test: [
        {
            a: 0.0099,
            b: 1,
            c: false,
            d: [false],
        },
        {
            'nested objects and arrays': 'xyz',
        },
    ],
};

describe('libs: iota/quorum', () => {
    describe('#getMostCommon', () => {
        describe('when input is empty', () => {
            it('should return null', () => {
                const data = [];
                expect(getMostCommon(data)).to.equal(null);
            });
        });

        describe('when input has no duplicates', () => {
            it('should return any element', () => {
                const data = [a, b, c, d, e];
                expect(getMostCommon(data)).to.be.oneOf(data);
            });
        });

        describe('when input has multiple duplicates of same', () => {
            it('should return of of most common', () => {
                const data = [a, b, c, d, b, e, a];
                expect(getMostCommon(data)).to.be.oneOf([a, b]);
            });
        });

        describe('when input has only one most common', () => {
            it('should return most common', () => {
                const data = [a, b, c, d, e, b, a, e, d, d, d, a, e, d];
                expect(getMostCommon(data)).to.equal(d);
            });
        });

        describe('when unorderedArrays is set', () => {
            it('should ignore array order', () => {
                const data = [a, a, a, b, b, b, c, c, c, d, d, e, e];
                expect(getMostCommon(data, true)).to.be.oneOf([d, e]);
            });
        });
    });
});
