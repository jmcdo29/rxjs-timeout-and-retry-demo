const { fromEvent, of, race, timer } = require('rxjs');
const { filter, tap, map, timeoutWith, scan, switchMap } = require('rxjs/operators');
const knownCommands = {
  c: () => console.log('Called c'),
  rs: () => console.log('Called rs'),
  q: () => console.log('Called q'),
};
const getInput = () => {
  return fromEvent(process.stdin, 'data').pipe(
    map((val) => val.toString().toLowerCase()),
    filter((val) => /[a-z]/.test(val)),
    scan((all, current) => all + current, ''),
  );
};
const input$ = getInput().pipe(
  tap((data) => {
    console.log('from process.stdin');
    console.log(data);
  }),
  switchMap(() => race(input$, timer(500, 0).pipe(switchMap(() => getInput())))),
  map((foundInput) => {
    console.log('found  input');
    console.log(foundInput);
    if (knownCommands[foundInput]) {
      knownCommands[foundInput]();
    }
  }),
);
console.log('subscribing');
input$.subscribe();
