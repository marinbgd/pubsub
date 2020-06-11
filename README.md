# PubSub
Simple JS pubsub

## Usage
````
const handleSomeTopic = function (topicData) {
    // do something with new data
    console.log(topicData)
}
const unsubscribe = subscribe('someTopic', handleSomeTopic)

// to unsubscribe, just invoke the returned unsubscribe function
unsubscribe()
````

## Test
Can run unit tests with `npm run test`
