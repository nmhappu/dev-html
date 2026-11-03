import satori from "satori";
import sharp from "sharp";
import { ogOptions, siteCardMarkup } from "./og-image/_ogMarkup";

// Default og:image for every page, see src/components/BaseHead.astro
export async function GET() {
	const svg = await satori(siteCardMarkup(), ogOptions);
	const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

	return new Response(new Uint8Array(pngBuffer), {
		headers: {
			"Content-Type": "image/png",
		},
	});
}
