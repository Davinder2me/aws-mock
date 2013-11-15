var AWS, ec2;

AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId : 'foo',
    secretAccessKey : 'bar',
    region : 'baz'
});

ec2 = new AWS.EC2({
    endpoint : new AWS.Endpoint('http://localhost:9090/')
});

// stop running instances by given IDs passed from command line as arguments
ec2.stopInstances({
    InstanceIds : process.argv
}, function(err, resp) {

    if (err) {
        console.log("Could not stop instances", err);
    } else {

        if (resp.StoppingInstances.length > 0) {
            console.log("Instance state changes:")

            resp.StoppingInstances.forEach(function(inst) {
                console.log(inst.InstanceId, inst.PreviousState.Name, '->', inst.CurrentState.Name);
            });
        } else {
            console.log('Nothing happened! Make sure you input the right instance IDs.');
            console.log('usage: node StopInstancesExample.js <instanceID-1> [instanceID-2] [instanceID-3] ...');
        }

    }
});
