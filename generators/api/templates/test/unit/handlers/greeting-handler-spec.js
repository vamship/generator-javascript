'use strict';

const _chai = require('chai');
const _chaiAsPromised = require('chai-as-promised');
const _rewire = require('rewire');
const _sinonChai = require('sinon-chai');

_chai.use(_chaiAsPromised);
_chai.use(_sinonChai);
const expect = _chai.expect;

const { testValues: _testValues } = require('@vamship/test-utils');

const _greetingHandler = _rewire('../../../src/handlers/greeting-handler');

describe('greetingHandler()', () => {
    it('should return an object when invoked', () => {
        const ret = _greetingHandler({});

        expect(ret).to.be.an('object');
        expect(ret.message).to.be.a('string').and.to.not.be.empty;
    });

    it('should return a message for the default language if the language is not recognized', () => {
        const inputs = ['es', 'it'];
        inputs.forEach((language) => {
            const name = _testValues.getString('name');
            const ret = _greetingHandler({
                name,
                language
            });

            expect(ret).to.deep.equal({
                message: `Hello, ${name}`
            });
        });
    });

    it('should return a message based on the language if the language is recognized', () => {
        const inputs = [
            {
                language: 'fr',
                greeting: 'Bonjour'
            },
            {
                language: 'en',
                greeting: 'Hello'
            }
        ];

        inputs.forEach(({ language, greeting }) => {
            const name = _testValues.getString('name');
            const ret = _greetingHandler({
                name,
                language
            });

            expect(ret).to.deep.equal({
                message: `${greeting}, ${name}`
            });
        });
    });

    it('should default the name to "there" if no name is specified', () => {
        const inputs = _testValues.allButString('');
        inputs.forEach((name) => {
            const ret = _greetingHandler({
                name,
                language: 'en'
            });

            expect(ret).to.deep.equal({
                message: `Hello, there`
            });
        });
    });
});
