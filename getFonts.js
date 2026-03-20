async function getFonts() {
  const res = await fetch('https://www.vectrix.ai/');
  const html = await res.text();
  const fontLinks = html.match(/href=["'][^"']*fonts[^"']*["']/g) || [];
  console.log("Links:");
  console.log(fontLinks);

  const fontFamilies = html.match(/font-family[^;"}]*/g) || [];
  console.log("Font Families:");
  console.log([...new Set(fontFamilies)]);
  
  // also look for local fonts or typekit/etc
  const typekit = html.match(/use.typekit.net/g) || [];
  if (typekit.length) console.log("Typekit used");
}

getFonts();