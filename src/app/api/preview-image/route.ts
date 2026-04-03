import { NextResponse } from "next/server";

const PREVIEW_META_PATTERNS = [
  /<meta[^>]+property=["']og:image:secure_url["'][^>]+content=["']([^"']+)["'][^>]*>/i,
  /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
  /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
  /<meta[^>]+name=["']twitter:image:src["'][^>]+content=["']([^"']+)["'][^>]*>/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image:secure_url["'][^>]*>/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["'][^>]*>/i,
] as const;

function isBlockedHostname(hostname: string) {
  const host = hostname.toLowerCase();

  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1" ||
    host.endsWith(".local")
  ) {
    return true;
  }

  // Block private IPv4 ranges.
  if (/^10\./.test(host) || /^192\.168\./.test(host) || /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)) {
    return true;
  }

  return false;
}

function toAbsoluteImageUrl(pageUrl: string, imageUrl: string) {
  try {
    const resolved = new URL(imageUrl, pageUrl);

    if (!["http:", "https:"].includes(resolved.protocol)) {
      return null;
    }

    if (isBlockedHostname(resolved.hostname)) {
      return null;
    }

    return resolved.toString();
  } catch {
    return null;
  }
}

function extractPreviewImage(html: string, pageUrl: string) {
  for (const pattern of PREVIEW_META_PATTERNS) {
    const match = html.match(pattern);
    const candidate = match?.[1]?.trim();

    if (!candidate) {
      continue;
    }

    const absolute = toAbsoluteImageUrl(pageUrl, candidate);

    if (absolute) {
      return absolute;
    }
  }

  return null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawUrl = searchParams.get("url");

  if (!rawUrl) {
    return NextResponse.json(
      { error: "Missing 'url' query parameter." },
      { status: 400 },
    );
  }

  let target: URL;

  try {
    target = new URL(rawUrl);
  } catch {
    return NextResponse.json({ error: "Invalid URL." }, { status: 400 });
  }

  if (!["http:", "https:"].includes(target.protocol)) {
    return NextResponse.json(
      { error: "Only http/https URLs are allowed." },
      { status: 400 },
    );
  }

  if (isBlockedHostname(target.hostname)) {
    return NextResponse.json({ error: "Blocked hostname." }, { status: 400 });
  }

  try {
    const response = await fetch(target.toString(), {
      headers: {
        "user-agent": "PortalPreviewBot/1.0 (+https://vincent.bichat.fr)",
        accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(6500),
      redirect: "follow",
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { imageUrl: null, reason: `upstream-${response.status}` },
        { status: 200 },
      );
    }

    const contentType = response.headers.get("content-type") ?? "";

    if (!contentType.includes("text/html")) {
      return NextResponse.json(
        { imageUrl: null, reason: "non-html-response" },
        { status: 200 },
      );
    }

    const html = await response.text();
    const imageUrl = extractPreviewImage(html, response.url || target.toString());

    return NextResponse.json({ imageUrl });
  } catch {
    return NextResponse.json(
      { imageUrl: null, reason: "request-failed" },
      { status: 200 },
    );
  }
}