import $ from '../node_modules/jquery/dist/jquery';
import Rx from '../node_modules/rxjs/Rx';


/********START - Async Subject*******/
//Async Subject - it will play only one value(last value) similar to behavior subject
// but it only does that after or when subject completes.

//Represents the result of an asynchronous operation.
// The last value before the OnCompleted notification, or the error received through OnError, is sent to all subscribed observers.
//Mainly used to get the final result of large/complex computation

//Async Subjects are somewhat similar to promise because it is also resolve with a value eventually.

var subject = new Rx.AsyncSubject();
var observer1 = {
    next: function (x) {
        console.log('observer1 next: '+x);
    },
    err: function (err) {
        console.log('observer1 err: '+err);
    },
    complete: function () {
        console.log('observer1 Completed');
    }
}

subject.subscribe(observer1)
console.log('Observer 1 Subscribed')

var observer2 = {
    next: function (x) {
        console.log('observer2 next: '+x);
    },
    err: function (err) {
        console.log('observer2 err: '+err);
    },
    complete: function () {
        console.log('observer2 Completed');
    }
}
setTimeout(() => subject.next(1), 100);
setTimeout(() => subject.next(2), 200);
setTimeout(() => subject.next(3), 300);
//ReplaySubject replays the events for late observers even after the subject completed.
setTimeout(() => subject.complete(), 350);

setTimeout(function () {
    //when observer2 subscribes, it will take latest of 3 values
    subject.subscribe(observer2);
    console.log('Observer 2 Subscribed')
}, 400);

/********END - Async Subject*******/

/*var observable = Rx.Observable.interval(1000).take(5);*/
/********START - Replay Subject*******/
/*Replay Subject - Remembering events from the past*/
//Syntax
const  bufferSize = Number.POSITIVE_INFINITY;
// use Number.POSITIVE_INFINITY to remember all the events that happend in past

// var subject = new Rx.ReplaySubject(bufferSize);
//windowSize => It represents how long in time will the replay subject keep event stored in its internal buffer.
/*

const windowSize = 250 // those events which came 2 seconds before will not be considered.
var subject = new Rx.ReplaySubject(bufferSize, windowSize);
var observer1 = {
    next: function (x) {
        console.log('observer1 next: '+x);
    },
    err: function (err) {
        console.log('observer1 err: '+err);
    },
    complete: function () {
        console.log('observer1 Completed');
    }
}

subject.subscribe(observer1)
console.log('Observer 1 Subscribed')

var observer2 = {
    next: function (x) {
        console.log('observer2 next: '+x);
    },
    err: function (err) {
        console.log('observer2 err: '+err);
    },
    complete: function () {
        console.log('observer2 Completed');
    }
}
setTimeout(() => subject.next(1), 100);
setTimeout(() => subject.next(2), 200);
setTimeout(() => subject.next(3), 300);
//ReplaySubject replays the events for late observers even after the subject completed.
setTimeout(() => subject.complete(), 350);

setTimeout(function () {
    //when observer2 subscribes, it will take latest of 3 values
    subject.subscribe(observer2);
    console.log('Observer 2 Subscribed')
}, 400);
*/

/*
--------1----2------3---4

*/


/********END*******/

/********START - Behavior Subject*******/
//Behaviour Subject
/*It is a subject that always has a current value
* So, we need to initialize it with some value since it will always contain a value
* and it has to start with a value.
* And thats how this type of subject remembers what was the last value emitted.
*
* So when late observers arrive, this subject will pass the last remembered value.
* */
/*******CODE********/
/*var subject = new Rx.BehaviorSubject(0);
 var observer1 = {
     next: function (x) {
     console.log('observer1 next: '+x);
     },
     err: function (err) {
     console.log('observer1 err: '+err);
     },
     complete: function () {
     console.log('observer1 Completed');
     }
 }

 subject.subscribe(observer1)
 console.log('Observer 1 Subscribed')

 var observer2 = {
     next: function (x) {
        console.log('observer2 next: '+x);
     },
     err: function (err) {
        console.log('observer2 err: '+err);
     },
     complete: function () {
        console.log('observer2 Completed');
     }
 }
 subject.next(1);
 subject.next(2);
 subject.next(3);
 setTimeout(function () {
    subject.subscribe(observer2);
    console.log('Observer 2 Subscribed')
 }, 2000);*/


/***********END*********/
//A subject is an observer and its an Observable as well
//Can be used as bridge observer
//Using Subject as Event Bus
//***********Start************
/*var subject = new Rx.Subject();
var observerA = {
    next: function (x) {
        console.log('A next: '+x);
    },
    err: function (err) {
        console.log('A err: '+err);
    },
    complete: function () {
        console.log('A Completed');
    }
}

observable.subscribe(subject);
subject.subscribe(observerA)

var observerB = {
    next: function (x) {
        console.log('B next: '+x);
    },
    err: function (err) {
        console.log('B err: '+err);
    },
    complete: function () {
        console.log('B Completed');
    }
}
setTimeout(function () {
    subject.subscribe(observerB);
}, 2000);
*/
/*
var bridgeObserver = {
    next: function (x) {
        this.observers.forEach(o => o.next(x));
    },
    err: function (err) {
        this.observers.forEach(o => o.error(err));
    },
    complete: function () {
        this.observers.forEach(o => o.complete());
    },
    observers: [],
    addObserver: function (observer) {
        this.observers.push(observer);
    }
}
*/
//***********End************

/*const source$ = Rx.Observable.interval(1000).take(5);*/

// const source$ = Rx.Observable.timer(5000, 1000).take(5);

/*const source$ = Rx.Observable.range(20, 100);

source$.subscribe(
    x => console.log(x),
    err => console.log(err),
    completed => {
        console.log('Completed')
    }
);*/

/*
function getUser(username) {
    $.ajax({
        url: 'https://api.github.com/users/'+username,
        dataType: 'jsonp'
    }).promise();
}

Rx.Observable.fromPromise(getUser('avalokkumar'))
    .subscribe(x=>{
        console.log(x);
});
*/

/*var somePromise = new Promise((resolve, reject) => {
 console.log('Creating Promise');
 setTimeout(() => {
 resolve("Hello from Promise");
 }, 3000);
 });*/

/*somePromise.then(x=>{
    console.log(x);
})*/

/*const source$ = Rx.Observable.fromPromise(somePromise);
source$.subscribe(x=>{
    console.log(x);
})*/

/*const source$ = new Rx.Observable( observer => {
    console.log('Creating Observer');
    observer.next("Hello World");
    observer.next("Another Value");
    observer.error(new Error('Error: Something went wrong'));
    setTimeout(() => {
        observer.next("Yet Another Value");
        observer.complete();
    }, 3000);
});

source$
    .catch(err => Rx.Observable.of(err))
    .subscribe(
        x => {
            console.log(x);
        },
        err => {
            console.log(err);
        },
        complete => {
            console.log('Completed');
        }
    );*/


/*
 const map = new Map([[1,2], [3,4], [5,6]]);
const map$ = Rx.Observable.from(map);

map$.subscribe(
    v => {
        console.log(v);
    },
    err => {
        console.log(err)
    },
    complete => {
        console.log('Completed');
    }
)*/


/*const set$ = Rx.Observable.from(set);

set$.subscribe(
    v => {
    console.log(v);
},
err => {
    console.log(err)
},
complete => {
    console.log('Completed');
}
)*/


/*const number = [33,44,55,667,88,99];
const number$ = Rx.Observable.from(number);

number$.subscribe(
    v => {
        console.log(v);
    },
    err => {
        console.log(err)
    },
    complete => {
        console.log('Completed');
    }
)

const posts = [
    {title: 'Post One', body: 'This is the body'},
    {title: 'Post two', body: 'This is the body'},
    {title: 'Post three', body: 'This is the body'},
    {title: 'Post fours', body: 'This is the body'}
];

const posts$ = Rx.Observable.from(posts);

posts$.subscribe(
    post => {
        $('#posts').append('<li><h3>'+ post.title+'</h3><p>'+post.body+'</p></li>')
    },
    err => {
        console.log(err)
    },
    complete => {
        console.log("completed")
    }
)*/



/*
const input = $('#input');
const output = $('#output');

btnStream$.subscribe(
    function (e) {
        console.log(e.target.innerHTML);
    },
    function (err) {
        console.log(err)
    },
    function () {
        console.log('Completed');
});

// const inputStream$ = Rx.Observable.fromEvent(input, 'keyup');
const moveStream$ = Rx.Observable.fromEvent(document, 'mousemove');

moveStream$.subscribe(
    function (e) {
        output.html("<h1>X: "+e.clientX+" Y: "+e.clientY+"</h1>");
    },
    function (err) {
        console.log(err);
    },
    function () {
        console.log('Completed')
    }
);*/
