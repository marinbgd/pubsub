let topics = {}

const reset = () => {
    topics = {}
}

const subscribe = (topic, callback) => {
    if (!topic || typeof callback !== 'function') { // check if params are valid
        throw new Error('Invalid parameters')
    }

    if (!Array.isArray(topics[topic])) {
        topics[topic] = []
    }

    let indexInTopics = topics[topic].length
    topics[topic].push(callback)

    const unsubscribe = () => {
        if (typeof indexInTopics === 'number') {
            topics[topic].splice(indexInTopics, 1)
            indexInTopics = null
        } else {
            throw new Error('Trying to unsubscribe more than once - ' + topic)
        }
    }

    return unsubscribe
}

const publish = (topic, data) => {
    const foundTopic = topics[topic]
    if (!foundTopic) {
        return
    }

    for (let i = 0; i < foundTopic.length; i++) {
        if (typeof foundTopic[i] === 'function') {
            foundTopic[i](data)
        }
    }
}

module.exports = {
    reset,
    subscribe,
    publish,
}
