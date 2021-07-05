
# System Design Capstone

Desgined and built an API back end system that can support the full data set for an E-commerce site.


## Tech Stack

**Server:** Node, Express

**Database:** MongoDB, Mongoose

**Production Deployment:** 3x AWS EC2 (t2.micro) instances - 20.04 Ubuntu - 8GB SSD

**Development Stress Testing:** artillery.io, New Relic

**Production Stress Testing:** loader.io


## Optimizations

Implemented MongoDB aggregation pipeline condensing multiple collections to a single collection to reduce complexity of query.


Utilized AWS load balancer to increase traffic up to 712 requests per second with less than 1% error rate.

## Test Results

<img width="686" alt="Screen Shot 2021-07-03 at 10 58 42 AM" src="https://user-images.githubusercontent.com/70596098/124513089-9be5cf80-dd9f-11eb-9d2b-0ed4e9270e42.png">


## Authors

- [Sun Kim](https://github.com/sunkim0330)
