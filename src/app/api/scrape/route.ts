import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Attempt to fetch the actual URL provided by the user
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      next: { revalidate: 0 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch with status: ${res.status}`);
    }

    const html = await res.text();
    
    // Extract Title using Regex
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    let title = titleMatch ? titleMatch[1].trim() : "Unknown Product Name";
    
    // Extract Meta Description using Regex
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i) || 
                      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["'][^>]*>/i);
    let description = descMatch ? descMatch[1].trim() : "Details could not be automatically extracted. Please enter manually.";

    // Extract Image (og:image)
    const imageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i) ||
                       html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i);
    let image = imageMatch ? imageMatch[1].trim() : "";

    // Attempt to extract a price in INR
    const priceMatch = html.match(/(?:Rs\.?|INR|₹)\s*([\d,]+)/i);
    let price = priceMatch ? priceMatch[1].replace(/,/g, '') : "0";

    return NextResponse.json({
      title: title,
      description: description,
      price: price,
      image: image
    });
    
  } catch (error: any) {
    console.error("Scraping error:", error);
    return NextResponse.json({ 
      error: "Failed to scrape the URL. It might be protected by Cloudflare or bot protection.",
      details: error.message
    }, { status: 500 });
  }
}
