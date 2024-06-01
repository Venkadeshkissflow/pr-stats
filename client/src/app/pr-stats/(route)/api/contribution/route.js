import { NextResponse } from "next/server";
import { batchUpdate } from "./batchUpdate";

export async function POST(request) {
	let jsonAsString = await new Response(request.body).text();
	let data = JSON.parse(jsonAsString);
	await batchUpdate(data);

	return NextResponse.json({
		message: "Success ping pong",
		data,
	});
}
