import { Hono } from 'hono'

const api = new Hono().basePath('/api')

/**
 * route to /api/book
 */
api.get('/book', (c) => {
    return c.text('aaa');
}) // GET /api/book

// async function getData() {
//     const url = "https://example.org/products.json";
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`レスポンスステータス: ${response.status}`);
//       }
  
//       const json = await response.json();
//       console.log(json);
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

export {
    api
}
