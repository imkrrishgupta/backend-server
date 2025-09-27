import {serve} from "bun"

serve({
    fetch(request){  // We are wondering where is the request, but don't worry "bun" gives you the method...In this we have to fetch the URL, otherwise all the time it will respond...We want to respond based on the URL coming in
        const url = new URL(request.url);
        if (url.pathname === '/'){
            return new Response("Hello ice tea", {status: 200})
        }else if (url.pathname === '/ice-tea'){
            return new Response("Ice tea is a good option", {status: 200})
        }else{
            return new Response("404 Not Found", {status: 404})
        }
    },
    port: 3000,
    hostname: "127.0.0.1"
})  // No listening, nothing all that...serve will do all the thing