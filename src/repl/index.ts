import repl from 'node:repl';


function main() {
    console.log('main function');
}

if (process.argv[1] === __filename) {

    main();
}
