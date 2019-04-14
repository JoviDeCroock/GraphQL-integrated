const query = `
  query {
    publicMaps {
      items{
        id
      }
    }
  }
`;

async function init() {
  const res = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  console.log(await res.json());
}

setTimeout(() => init(), 2500);
