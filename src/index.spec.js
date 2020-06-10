const pubsub = require('./index.js')
const {subscribe, publish, reset} = pubsub

describe('Test pubSub methods', () => {

    afterEach(() => {
        reset()
    })

    describe('subscribe method', () => {
        it('returns unsubscribe function', () => {
            const unsubscribe = subscribe('topic', () => {})
            expect(unsubscribe).toBeDefined()
        })

        it('throws error for undefined "topic" param', () => {
            expect(() => subscribe()).toThrow('Invalid parameters')
        })

        it('throws error for undefined "callback" param', () => {
            expect(() => subscribe('topic')).toThrow(Error)
        })
    })

    describe('publish method', () => {
        it('should not throw an error if publishing topic with no subscribers', () => {
            const topic = 'publish non existing cb topic'
            expect(() => publish(topic)).not.toThrow(Error)
        })

        it('should trigger subscribed cb method for exact topic only once', () => {
            const topic = 'publish exact topic'
            const cb = jest.fn()
            const unsubscribe = subscribe(topic, cb)
            publish(topic)
            expect(cb.mock.calls.length).toEqual(1)

            unsubscribe() // clean up
        })

        it('should trigger subscribed cb method for exact topic only once and other topics not', () => {
            const topic = 'publish exact topic 1'
            const topic2 = 'publish exact topic 2'
            const cb = jest.fn()
            const cb2 = jest.fn()
            const unsubscribe = subscribe(topic, cb)
            const unsubscribe2 = subscribe(topic2, cb2)
            publish(topic)
            expect(cb.mock.calls.length).toEqual(1)
            expect(cb2.mock.calls.length).toEqual(0)

            unsubscribe() // clean up
            unsubscribe2() // clean up
        })

        it('should stop triggering callback after unsubscribe is called', () => {
            const cb = jest.fn()
            const topic = 'unsubscribe trigger callback test'
            const unsubscribe = subscribe(topic, cb)
            unsubscribe()
            publish(topic)
            expect(cb.mock.calls.length).toEqual(0)
        })

        it('should trigger subscribed cb method for exact topic with proper data', () => {
            const topic = 'publish exact topic with data'
            const data = {test: 'data'}
            const cb = jest.fn()
            const unsubscribe = subscribe(topic, cb)
            publish(topic, data)
            expect(cb.mock.calls.length).toEqual(1)
            expect(cb.mock.calls[0][0]).toEqual(data)

            unsubscribe() // clean up
        })

        it('should trigger subscribed all cb methods for exact topic with proper data', () => {
            const topic = 'publish exact topic with data'
            const data = {test: 'data'}
            const cb = jest.fn()
            const cb2 = jest.fn()
            const unsubscribe = subscribe(topic, cb)
            const unsubscribe2 = subscribe(topic, cb2)
            publish(topic, data)
            expect(cb.mock.calls.length).toEqual(1)
            expect(cb2.mock.calls.length).toEqual(1)
            expect(cb.mock.calls[0][0]).toEqual(data)
            expect(cb2.mock.calls[0][0]).toEqual(data)

            unsubscribe() // clean up
            unsubscribe2() // clean up
        })
    })

    describe('reset method', () => {
        it('should makes all callbacks not triggering after publish and all unsubscribes throwing error', () => {
            const topic = 'reset cbs ans unsubscribes'
            const cb = jest.fn()
            const unsubscribe = subscribe(topic, cb)
            reset()
            publish(topic)
            expect(cb.mock.calls.length).toEqual(0)
            expect(() => unsubscribe()).toThrow(Error)
        })
    })

    describe('unsubscribe method', () => {
        it('should throw an error if called more than once', () => {
            const unsubscribe = subscribe('unsubscribe test more than once', () => {})
            unsubscribe()
            expect(() => unsubscribe()).toThrow(Error)
        })
    })
})
