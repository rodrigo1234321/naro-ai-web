async function test() { 
  const res = await fetch('https://news.google.com/rss/articles/CBMilwFBVV95cUxOejkxMHJ6eDUwTlVkbURBR0hqUUNUcllGUzdQS0x5al9YWUdFUU9hSFJJeU85bVJUbU9vbnRsOWl4cGlFcXhhbjJNa01lSFVyRWc2bmIzdHFMTkxIbkdNbXBoZDRMSjRyLUxpX2pMdXljZnJmaVFYWkdOREZpRXItQnpKSzB5UXpIUnZITkV3ZmM1TlhQcHkw?oc=5'); 
  const text = await res.text(); 
  const matches = text.match(/<a[^>]+href=["']([^"']+)["']/gi); 
  console.log(matches ? matches.slice(0, 10) : 'No links'); 
  console.log('Target URL inside data?:', text.match(/data-n-a-id=["']([^"']+)["']/i));
} 
test();
