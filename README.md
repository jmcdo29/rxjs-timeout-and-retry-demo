# RxJS-Timeout-and-Retry

The idea here is to allow the RxJS  stream to get input from  `process.stdin`. On each keystroke, a timeout timer should reset, until either the timeout has been reached, or the input sequence matches a known command.