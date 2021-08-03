import { introspection } from './schema';

export const getVoyagerHtml = (): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/react@16/umd/react.production.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/react-dom@16/umd/react-dom.production.min.js"></script>
        <style>
          body {
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100vh;
            overflow: hidden;
          }
      
          #voyager {
            height: 100%;
            position: relative;
          }
        </style>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/graphql-voyager/dist/voyager.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/graphql-voyager/dist/voyager.min.js"></script>
      </head>
      <body>
        <div id="voyager">Loading...</div>
        <script>
          async function introspectionProvider() {
            return {
              data: ${JSON.stringify(introspection)}
            };
          }
    
          // Render <Voyager />
          GraphQLVoyager.init(document.getElementById('voyager'), {
            introspection: introspectionProvider,
          });
        </script>
      </body>
    </html>
  `;
};
